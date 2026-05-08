"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useStore } from "@/app/store/store";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface CheckoutButtonProps {
  className?: string;
}

export default function CheckoutButton({ className }: CheckoutButtonProps) {
  const router = useRouter();
  const setIsCartOpen = useStore((state: any) => state.setIsCartOpen);

  const handleCheckout = async () => {
    setIsCartOpen(false);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }
    router.push("/checkout");
  };

  return (
    <Button
      onClick={handleCheckout}
      className={cn(
        `cursor-pointer hover:bg-white hover:text-primary transition-all duration-300`,
        { [className || ""]: !!className },
      )}
    >
      Proceed to Checkout
    </Button>
  );
}
