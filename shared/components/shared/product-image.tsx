import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string;
}

export const ProductImage: React.FC<Props> = ({ imageUrl, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify--center felx-1 relative w-full",
        className
      )}
    >
      <img
        src={imageUrl}
        alt="Logo"
        className={cn("relative left-2 top-2 transition-all z-10 duration-300")}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 - translate-y-1/2 border-dotted border-2 rounded-full vorder-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 - translate-y-1/2 border-dotted border-2 rounded-full vorder-gray-100 w-[370px] h-[370px]" />
    </div>
  );
};
