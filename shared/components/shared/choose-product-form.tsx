import { AddServices, ProductItem } from "@prisma/client";
import React from "react";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";

interface Props {
  imageUrl: string;
  name: string;
  items: ProductItem[]; // Замените any[] на конкретный тип или интерфейс
  price: number;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  items,
  onSubmit,
  price,
  className,
}) => {
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

        <Button
          onClick={() => onSubmit && onSubmit()} // Проверка перед вызовом
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
