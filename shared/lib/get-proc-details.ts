import { AddServices, ProductItem } from "@prisma/client";
import { mapProcType, ProcType } from "../constants/proc";
import { calcTotalProcPrice } from "./calc-proc-prices";

export const getProcDetails = (
  type: ProcType,
  items: ProductItem[],
  addservices: AddServices[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalProcPrice(
    type,
    items,
    addservices,
    selectedIngredients
  );
  const textDetaills = ` ${mapProcType[type]} процессор`;

  return { totalPrice, textDetaills };
};
