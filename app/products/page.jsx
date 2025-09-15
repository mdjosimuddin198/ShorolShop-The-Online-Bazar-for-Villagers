"use client";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard/ProductCard";
// import products from "@/public/DammyData.json";
import getProducts from "../hook/getProducts";
import ProductsLoading from "../components/Loading/ProductsLoading";

const Products = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getProducts("api/products", 5);
    },
  });
  console.log(products);
  if (isLoading) {
    return (
      <div className="grid py-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductsLoading key={i} />
        ))}
      </div>
    );
  }
  if (error) {
    return <p>error found...</p>;
  }

  return (
    <div className="grid py-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default Products;
