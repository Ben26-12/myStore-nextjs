"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProductType } from "@/types/product";
import { useStore } from "../store/store";

function AddToCart({
  product,
  quantity = 1,
}: {
  product: ProductType;
  quantity: number;
}) {
  const addToCart = useStore((state: any) => state.addToCart);
  const handleAdd = () => {
    addToCart(product, quantity);
    toast.success("Successfully", {
      description: `Added ${product.title} to cart, you can check it in the cart now`,
      position: "top-left",
    });
  };
  return (
    <Button
      size="lg"
      className="w-full  hover:bg-white hover:text-current border transition duration-300 rounded-sm text-white my-4 cursor-pointer"
      onClick={handleAdd}
    >
      ADD TO CART
    </Button>
  );
}

export default AddToCart;
