"use client";

import { useStore } from "@/app/store/store";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);

  const setIsCartOpen = useStore((state: any) => state.setIsCartOpen);
  const cartItems = useStore((state: any) => state.cartItems);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = (cartItems || []).reduce((acc: number, item: any) => {
    return acc + (item.quantity || 0);
  }, 0);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="hover:opacity-50 transition duration-300 cursor-pointer px-2 py-2 rounded-full text-sm font-semibold relative"
      onClick={() => setIsCartOpen()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      {cartCount > 0 && (
        <span className="count rounded-full absolute top-0 -right-1 text-white font-light bg-primary px-2 text-[10px] min-w-[18px] h-[18px] flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </div>
  );
}
