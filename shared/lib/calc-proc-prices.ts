import { AddServices, ProductItem } from "@prisma/client";
import { ProcType } from "../constants/proc";
/**
 * Функция для подсчета общей стоимости
 *
 * @param type - тип теста выбранного процессора
 * @param items - список вариаций
 * @param addservices - список доп услуг
 * @param selectedAddServices - выбранные доп услуги
 *
 * @returns number общую стоимость
 */
export const calcTotalProcPrice = (
  type: ProcType,
  items: ProductItem[],
  addservices: AddServices[],
  selectedAddServices: Set<number>
) => {
  const procPrice = items.find((item) => item.BoxType === type)!.price;
  const totalAddServicesPrice = addservices
    .filter((addservice) => selectedAddServices.has(addservice.id))
    .reduce((acc, addservice) => acc + addservice.price, 0);
  return procPrice + totalAddServicesPrice;
};
