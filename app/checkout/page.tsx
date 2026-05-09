"use client";

import { useStore } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

export default function CheckoutPage() {
  const cartItems = useStore((state) => state.cartItems);
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  //effect check xem zustand đã đọc được storage chưa
  useEffect(() => {
    setHasHydrated(useStore.persist.hasHydrated());
    useStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
  });
  //effect 2: chỉ khi đọc được storage rồi thì mới check items trong cart
  useEffect(() => {
    if (hasHydrated) {
      if (cartItems.length === 0) {
        router.replace("/");
      } else {
        setIsReady(true);
      }
    }
  }, [hasHydrated]);

  if (!isReady || cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse uppercase tracking-widest text-sm text-gray-400">
          Redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-inner-width mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl uppercase tracking-tighter mb-2">Checkout</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs">
          Secure your order below
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
