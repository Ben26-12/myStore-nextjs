import AddToCart from "@/app/components/AddToCart";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/product";

function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className=" p-4 rounded-lg shadow-md hover:shadow-xl transition">
      <Link href={`/product/${product.id}`}>
        <div className="relative holder aspect-9/11 overflow-hidden cursor-pointer">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain hover:scale-120 duration-400 transition-all"
          />
        </div>
        <h2 className="mt-2 font-semibold text-lg line-clamp-1 cursor-pointer">
          {product.title}
        </h2>
        <p className="text-gray-600 cursor-pointer">${product.price}</p>
      </Link>
      <AddToCart product={product} quantity={1} />
    </div>
  );
}

export default ProductCard;
