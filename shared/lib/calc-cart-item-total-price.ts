import { addservices } from "@/prisma/constants";
import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO) => {
  const addservicesPrice = item.addservices.reduce(
    (acc, addservice) => acc + addservice.price,
    0
  );
  return (addservicesPrice + item.productItem.price) * item.quantity;
};
