"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { ProductWithRelations } from "@/@types/prisma";
import { ChooseProductForm } from "../choose-product-form";
import { ChooseProcForm } from "../choose-proc-form";
import { Dialog } from "../../ui";
import { DialogContent } from "../../ui/dialog";
import { useCartStore } from "@/shared/store/cart";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isProcForm = Boolean(firstItem.BoxType);

  const addCartItem = useCartStore((state) => state.addCartItem);

  const onAddProduct = useCallback(() => {
    addCartItem({ productItemId: firstItem.id });
  }, [addCartItem, firstItem.id]);

  const onAddProc = useCallback(
    (productItemId: number, addservices: number[]) => {
      addCartItem({ productItemId, addservices });
    },
    [addCartItem]
  );

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isProcForm ? (
          <ChooseProcForm
            imageUrl={product.imageUrl}
            name={product.name}
            addservice={product.addservice}
            items={product.items}
            onSubmit={onAddProc}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            onSubmit={onAddProduct}
            price={firstItem.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
