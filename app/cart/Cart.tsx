"use client";
import { useStore } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";

import CheckoutButton from "@/app/components/Cart/CheckoutButton";

// CartItem
const CartItem = ({
  item,
  onRemove,
}: {
  item: ProductType;
  onRemove: (id: number) => void;
}) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6 last:border-0">
    <div className="flex gap-4 flex-1">
      <div className="relative w-24 h-32 bg-gray-50 rounded-sm shrink-0 border border-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2"
        />
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="font-medium text-gray-900 text-sm md:text-base leading-tight">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs  tracking-widest">
          Price: ${item.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600 font-light">
            Quantity: {item.quantity}
          </span>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end justify-between self-stretch">
      <span className="text-lg  text-gray-900">
        ${(item.price * (item.quantity ?? 0)).toFixed(2)}
      </span>
      <button
        onClick={() => onRemove(item.id)}
        className="text-[10px] uppercase tracking-widest font-bold text-red-500 hover:text-red-700 cursor-pointer transition-colors"
      >
        Remove
      </button>
    </div>
  </div>
);

function Cart() {
  const cartItems = useStore((state: any) => state.cartItems);
  const removeFromCart = useStore((state: any) => state.removeFromCart);
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (acc: number, item: ProductType) => acc + item.price * (item.quantity ?? 0),
    0,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* product list */}
      <div className="lg:col-span-8">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tighter uppercase">
            SHOPPING CART
          </h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <span className="text-6xl mb-6 block">🛒</span>
            <p className="text-gray-400 uppercase tracking-widest text-sm mb-6">
              Your cart is currently empty
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-primary text-white px-8 rounded-none uppercase text-xs font-bold tracking-widest cursor-pointer"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="cart-list">
            {cartItems.map((item: ProductType) => (
              <CartItem key={item.id} item={item} onRemove={removeFromCart} />
            ))}
          </div>
        )}
      </div>

      {/* SUMMARY */}
      {cartItems.length > 0 && (
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="p-8 border border-gray-100">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">
              Order Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600 font-medium uppercase text-[10px] tracking-widest">
                  Calculated at checkout
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-base font-bold uppercase tracking-widest">
                  Estimated Total
                </span>
                <span className="text-2xl font-medium">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <CheckoutButton className="w-full bg-black text-white hover:bg-white hover:text-black border border-black py-5 text-xs font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer" />

            <p className="mt-4 text-[10px] text-gray-400 text-center uppercase tracking-tight">
              Taxes and shipping calculated at next step
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
