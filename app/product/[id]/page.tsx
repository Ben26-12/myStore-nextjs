import Image from "next/image";
import AddToCart from "@/app/components/AddToCart";
import CartActions from "./CartActions";
const fetchProductById = async (id: number) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return res.json();
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductById(Number(id));

  return (
    <div className="max-w-inner-width w-full mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Bên trái: Hình ảnh sản phẩm */}
        <div className="flex justify-center items-start bg-gray-50 p-8 rounded-2xl">
          <div className="relative w-full aspect-square md:aspect-[3/4]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain hover:scale-105 transition-transform duration-500 cursor-zoom-in"
            />
          </div>
        </div>

        {/* Bên phải: Thông tin sản phẩm */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <nav className="text-sm text-gray-500">Home / Product / {id}</nav>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              {product.title}
            </h1>
            <p className="text-3xl font-semibold text-primary">
              ${product.price}
            </p>
          </div>

          <div className="border-t border-b py-8">
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <CartActions product={product} />

          <div className="grid grid-cols-2 gap-4 mt-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                🚚
              </div>
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                🛡️
              </div>
              <span>2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
