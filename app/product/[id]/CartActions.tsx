"use client";
import { useState } from "react";
import AddToCart from "@/app/components/AddToCart";
import { ProductType } from "@/types/product";

export default function CartActions({ product }: { product: ProductType }) {
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrease = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <span className="font-bold text-gray-700 uppercase">Quantity:</span>
        <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={handleDecrease}
            className="px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <input
            readOnly
            name="quantity"
            id="quantity"
            type="number"
            value={quantity}
            className="w-16 text-center focus:outline-none font-semibold"
          />
          <button
            onClick={handleIncrease}
            className="px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full md:w-80">
        <AddToCart quantity={quantity} product={product} />
      </div>
    </div>
  );
}
