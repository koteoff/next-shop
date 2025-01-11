import { Prisma } from "@prisma/client";
import { addservices, categories, product } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  BoxType,
  firmId,
}: {
  productId: number;
  BoxType?: 1 | 2;
  firmId: number;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    BoxType,
    firmId,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  // Создание пользователей
  await prisma.user.createMany({
    data: [
      {
        fullName: "User",
        email: "user@text.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin",
        email: "admin@text.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  // Создание категорий
  await prisma.category.createMany({
    data: categories,
  });

  // Создание услуг
  await prisma.addServices.createMany({
    data: addservices,
  });

  // Создание фирм
  const firms = await prisma.firm.createMany({
    data: [
      { name: "MSI" },
      { name: "ASUS" },
      { name: "Palit" },
      { name: "ASrock" },
      { name: "Acer" },
      { name: "Ardor" },
      { name: "ADATA" },
      { name: "GIGABYTE" },
      { name: "KINGSTON" },
      { name: "Intel" },
      { name: "AMD" },
    ],
  });

  // Получите все существующие firmId
  const existingFirms = await prisma.firm.findMany({
    select: { id: true },
  });

  // Создание продуктов
  await prisma.product.createMany({
    data: product
      .map((item) => ({
        name: item.name,
        imageUrl: item.imageUrl,
        categoryId: item.categoryId,
        firmId: item.firmId, // firmId должен существовать
      }))
      .filter((item) => existingFirms.some((firm) => firm.id === item.firmId)), // Убедитесь, что firmId существует
  });

  // Создание конкретных продуктов с привязкой к услугам
  const proc1 = await prisma.product.create({
    data: {
      name: "Intel Core i5-12400F",
      imageUrl:
        "https://nixdn.ru/image/cache/catalog/Processor_Intel_Core_i5-12400_Tray-1200x800.png",
      categoryId: 1,
      firmId: 10,
      addservices: {
        connect: addservices.slice(0, 3),
      },
    },
  });

  const proc2 = await prisma.product.create({
    data: {
      name: "AMD Ryzen 5 7500F",
      imageUrl: "https://cdn1.ozone.ru/s3/multimedia-1-c/7081319640.jpg",
      categoryId: 1,
      firmId: 11,
      addservices: {
        connect: addservices.slice(0, 3),
      },
    },
  });

  const proc3 = await prisma.product.create({
    data: {
      name: "Intel Core i7-14700KF",
      imageUrl: "https://cdn1.ozone.ru/s3/multimedia-4/6836016028.jpg",
      categoryId: 1,
      firmId: 10,
      addservices: {
        connect: addservices.slice(0, 3),
      },
    },
  });

  // Создание элементов продуктов
  await prisma.productItem.createMany({
    data: [
      //Процессоры
      generateProductItem({ productId: proc1.id, BoxType: 1, firmId: 10 }),
      generateProductItem({ productId: proc1.id, BoxType: 2, firmId: 10 }),
      generateProductItem({ productId: proc2.id, BoxType: 1, firmId: 11 }),
      generateProductItem({ productId: proc2.id, BoxType: 2, firmId: 11 }),
      generateProductItem({ productId: proc3.id, BoxType: 1, firmId: 10 }),
      generateProductItem({ productId: proc3.id, BoxType: 2, firmId: 10 }),
      generateProductItem({ productId: 1, firmId: 1 }),
      generateProductItem({ productId: 2, firmId: 8 }),
      generateProductItem({ productId: 3, firmId: 2 }),
      generateProductItem({ productId: 4, firmId: 4 }),
      generateProductItem({ productId: 5, firmId: 7 }),
      generateProductItem({ productId: 6, firmId: 5 }),
      generateProductItem({ productId: 7, firmId: 9 }),
      generateProductItem({ productId: 8, firmId: 1 }),
      generateProductItem({ productId: 9, firmId: 8 }),
      generateProductItem({ productId: 10, firmId: 4 }),
      generateProductItem({ productId: 11, firmId: 9 }),
      generateProductItem({ productId: 12, firmId: 7 }),
      generateProductItem({ productId: 13, firmId: 9 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      addservices: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  // Очистка таблиц с сбросом идентификаторов
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "AddServices" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Firm" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
