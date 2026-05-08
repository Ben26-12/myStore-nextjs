// import { Suspense } from "react";
import ProductList from "@/app/collection/ProductList";
// import LoadingSpinner from "@/app/loading";

async function Collection() {
  return (
    <div className="max-w-inner-width w-full mx-auto">
      <h1 className="text-2xl text-center my-5 font-semibold text-primary">
        Featured Collection
      </h1>
      {/* <Suspense fallback={<LoadingSpinner />}> */}
      <ProductList />
      {/* </Suspense> */}
    </div>
  );
}

export default Collection;
