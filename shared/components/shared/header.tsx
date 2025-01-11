import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import {
  ArrowRight,
  Link as LucideLink,
  ShoppingCart,
  User,
} from "lucide-react";
import { SearchInput } from "./search-input";
import Link from "next/link";
import { CartButton } from "./cart-button";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b border-gray-100", className)}>
      <Container className="flex item-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/" className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <div>
            <h1 className="text-2xl uppercase font-black">PC Shop</h1>
            <p className="text-sm text-gray-400 leading-3">Лучше уже не куда</p>
          </div>
        </Link>

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-1">
          <Button variant="outline" className="flex items-center gap-3">
            <User size={16} />
            Войти
          </Button>

          <CartButton />
        </div>
      </Container>
    </header>
  );
};
