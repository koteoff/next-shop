import { AddServices, ProductItem } from "@prisma/client";
import React from "react";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";
import { GroupVariants } from "./group-variants";
import { mapProcType, ProcType, procType } from "@/shared/constants/proc";
import { addservices } from "@/prisma/constants";
import { AddServicesItem } from "./addservice-item";
import { useSet } from "react-use";

interface Props {
  imageUrl: string;
  name: string;
  currentItemId?: number;
  addservice: AddServices[];
  items: ProductItem[];
  onSubmit: (itemId: number, addservices: number[]) => void;
  className?: string;
}

export const ChooseProcForm: React.FC<Props> = ({
  imageUrl,
  name,
  addservice,
  items,
  onSubmit,
  className,
}) => {
  const [type, setType] = React.useState<ProcType>(1);
  const [selectedAddServices, { toggle: addAddServices }] = useSet(
    new Set<number>([])
  );
  const currentItemId = items.find((item) => item.BoxType === type)?.id;

  const procPrice = items.find((item) => item.BoxType === type)?.price || 0;
  const totalAddServicesPrice = addservices
    .filter((addservice) => selectedAddServices.has(addservice.id))
    .reduce((acc, addservice) => acc + addservice.price, 0);
  const totalPrice = procPrice + totalAddServicesPrice;
  const textDetaills = `Процессор ${mapProcType[type]}`;

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedAddServices));
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={procType}
            value={String(type)}
            onClick={(value) => setType(Number(value) as ProcType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {addservices.map((addservice) => (
              <AddServicesItem
                key={addservice.id}
                name={addservice.name}
                price={addservice.price}
                imageUrl={addservice.imageUrl}
                active={selectedAddServices.has(addservice.id)}
                onClick={() => addAddServices(addservice.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
