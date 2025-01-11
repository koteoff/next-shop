import { Cart } from "@prisma/client";
import { CartDTO } from "../services/dto/cart.dto";
import { addservices } from "@/prisma/constants";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  BoxType?: number | null;
  addservices: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    BoxType: item.productItem.BoxType,
    addservices: item.addservices.map((addservice) => ({
      name: addservice.name,
      price: addservice.price,
    })),
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
