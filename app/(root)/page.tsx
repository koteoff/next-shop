import {
  Categories,
  Container,
  SortPopup,
  Title,
  TopBar,
  Filters,
} from "@/shared/components/shared";
import { ProductCard } from "@/shared/components/shared/product-card";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          firm: true,
          items: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-8">
        <Title text="Все комплектующие" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* Фильрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
