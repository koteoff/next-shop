import type { Metadata } from "next";

import { Header } from "@/shared/components/shared/header";

export const metadata: Metadata = {
  title: "Next-Shop-PC Main title",
  description:
    "Кто прочитал тот умрет:) А так тут пишут в основном для чего был создан данный проект",
  //Господи, помоги мне в работе с HTML и CSS.
  //Укрепи мой код, чтобы он не сломался и отображался правильно.
  //Дай мне терпение и вдохновение в этом деле. Аминь
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  );
}
