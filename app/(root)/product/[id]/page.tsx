"use client";

import { ProductImage, Title } from "@/shared/components/shared";
import { Container } from "@/shared/components/shared/container";
import { GroupVariants } from "@/shared/components/shared/group-variants";

import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} className="" />
        <div className="w-[490px] bg-[#F7F6F3] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400"></p>
        </div>
      </div>
    </Container>
  );
}
