"use client";
import { useStore } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import CheckoutButton from "../Cart/CheckoutButton";
import Link from "next/link";

export default function CartSlider() {
  const isCartOpen = useStore((state: any) => state.isCartOpen);
  const setIsCartOpen = useStore((state: any) => state.setIsCartOpen);
  const cartItems = useStore((state: any) => state.cartItems);
  const removeFromCart = useStore((state: any) => state.removeFromCart);
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (acc: number, item: ProductType) => acc + item.price * (item.quantity ?? 0),
    0,
  );

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ease-in-out",
        isCartOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      <div
        className="overlay absolute inset-0"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div
        className={cn(
          "slider fixed top-0 right-0 w-80 md:w-[400px] h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out z-60 flex flex-col",
          isCartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* HEADER */}
        <div className="p-6 border-b border-border-light flex justify-between items-center bg-white">
          <h2 className="text-xl font-medium tracking-widest">SHOPPING CART</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-black transition-colors p-2 text-2xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <span className="text-6xl">🛒</span>
              <p className="text-lg tracking-widest uppercase text-center">
                Your cart is empty
              </p>
              <Button
                variant="outline"
                onClick={() => setIsCartOpen(false)}
                className="mt-4 border-black text-black hover:bg-black hover:text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item: ProductType) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 border-b border-gray-50 pb-6 last:border-0"
                >
                  <div className="flex gap-4 flex-1">
                    <div className="relative w-20 h-24 bg-gray-50 rounded flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-tight mb-1 uppercase">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Unit: ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-sm font-semibold">
                        {item.quantity}{" "}
                        <span className="text-xs font-normal text-gray-400">
                          x
                        </span>{" "}
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer text-gray-300 hover:text-red-500 transition-colors p-1 text-lg"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-border-light bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium tracking-wider text-sm">
                SUBTOTAL
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-tighter text-center">
              Shipping & taxes calculated at checkout
            </p>
            <div className="flex flex-col gap-2">
              <CheckoutButton className="w-full bg-black text-white py-5 cursor-pointer hover:bg-white hover:text-black border border-black transition-all uppercase tracking-widest text-xs font-bold rounded-none" />
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-xs uppercase tracking-widest font-bold py-2 hover:underline cursor-pointer text-center"
              >
                <Link href={"/cart"}>View full cart</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
