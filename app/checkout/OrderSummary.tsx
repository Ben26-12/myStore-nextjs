"use client";

import { useStore } from "@/app/store/store";
import Image from "next/image";

export default function OrderSummary() {
  const { cartItems } = useStore();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 0),
    0,
  );

  const shipping = 10.0; // Phí ship cố định hoặc tính toán tùy ý
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 p-8 border border-gray-100 h-fit">
      <h3 className="text-lg font-bold uppercase tracking-widest mb-8 border-b border-gray-200 pb-4">
        Your Order
      </h3>

      <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 pt-2">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-20 bg-white border border-gray-100 rounded-sm shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-1"
              />
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="text-xs font-medium text-gray-900 line-clamp-2 uppercase leading-tight">
                {item.title}
              </h4>
              <p className="text-gray-500 text-xs mt-1">
                ${(item.price * (item.quantity ?? 0)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 uppercase tracking-tighter">
            Subtotal
          </span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 uppercase tracking-tighter">
            Shipping
          </span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-baseline pt-4 border-t border-gray-200">
          <span className="text-base  uppercase tracking-widest">Total</span>
          <span className="text-2xl ">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 p-4 bg-white border border-gray-100 rounded-sm">
        <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-tight">
          By placing your order, you agree to our Terms of Service and Privacy
          Policy. Shipping times may vary based on location.
        </p>
      </div>
    </div>
  );
}
