"use client";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard/ProductCard";
import getProducts from "../hook/getProducts";
import ProductsLoading from "../components/Loading/ProductsLoading";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";
const Products = () => {
  const [searchItem, setSerchItem] = useState("");
  const [fillterdByCatagory, SetFillterdByCatagory] = useState("");
  const pathname = usePathname();

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

  let filterProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchItem.toLowerCase())
  );
  if (fillterdByCatagory) {
    filterProducts = products.filter(
      (product) => product.category === fillterdByCatagory
    );
  }
  const catagories = [...new Set(products.map((p) => p.category))];
  console.log(catagories);

  return (
    <div className="pb-5">
      {pathname === "/products" && (
        <div className="flex items-center justify-end gap-4">
          <Input
            onChange={(e) => setSerchItem(e.target.value)}
            placeholder="What are you looking for?"
            className="w-64  pr-10 my-5"
          />
          <select
            name="select"
            className="outline px-3 py-1 rounded-md h-9 "
            onChange={(e) => SetFillterdByCatagory(e.target.value)}
            id="filter"
          >
            <option value="">--Select Catagory--</option>
            {catagories.map((product, i) => (
              <option key={i}>{product}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
        {filterProducts.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}

        {filterProducts.length === 0 && (
          <div className="col-span-4 mt-4  flex flex-col items-center justify-center">
            <FaMagnifyingGlass size={100} />
            <h2>Product Not found </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
