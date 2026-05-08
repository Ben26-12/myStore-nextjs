import React from "react";
import ProductCard from "@/app/collection/ProductCard";
import { ProductType } from "@/types/product";
async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Không thể lấy dữ liệu");
  return res.json();
}
export default async function ProductList() {
  const products = await getProducts();
  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
        {products.map((product: ProductType) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
