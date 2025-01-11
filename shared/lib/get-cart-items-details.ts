import { AddServices } from "@prisma/client";
import { mapProcType, ProcType } from "../constants/proc";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetailsToText = (
  addservices: CartStateItem["addservices"],
  procType: ProcType
): string => {
  const details = [];

  if (procType) {
    const typeName = mapProcType[procType];
    details.push(`${typeName}`);
  }

  if (addservices) {
    details.push(...addservices.map((addservice) => addservice.name));
  }
  return details.join(", ");
};
