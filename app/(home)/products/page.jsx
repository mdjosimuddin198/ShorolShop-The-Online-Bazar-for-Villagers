"use client";
import { useQuery } from "@tanstack/react-query";
// import ProductCard from "../components/productCard/ProductCard";
// import ProductsLoading from "../components/Loading/ProductsLoading";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ProductsLoading from "../../components/Loading/ProductsLoading";
import ProductCard from "../../components/productCard/ProductCard";
import getProducts from "@/hook/getProducts";
import { motion } from "motion/react";
const Products = () => {
  const router = useRouter();
  const [searchItem, setSerchItem] = useState("");
  const [fillterdByCatagory, SetFillterdByCatagory] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const pathname = usePathname();

  // get all products
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      if (pathname === "/") {
        return getProducts("api/products", 8);
      } else {
        return getProducts("api/products");
      }
    },
  });

  // show loading spiner when data is loading
  if (isLoading) {
    return (
      <div className="grid py-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductsLoading key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p>error found... {error}</p>;
  }

  // serch products by title
  let filterProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchItem?.toLowerCase())
  );

  if (fillterdByCatagory) {
    filterProducts = products.filter(
      (product) => product.category === fillterdByCatagory
    );
  }
  const catagories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="pb-5">
      {pathname === "/products" && (
        <div className="flex items-center justify-end gap-4">
          <Input
            onChange={(e) => setSerchItem(e.target.value)}
            placeholder="What are you looking for?"
            className="w-64  pr-10 my-5"
          />
        </div>
      )}

      <motion.h2
        initial={{ scale: [0, 0, 0] }}
        whileInView={{ scale: [0.5, 0.75, 1] }}
        viewport={{ amount: 0.6 }}
        transition={{
          duration: 2,
          // repeat: Infinity,
          repeatType: "loop",
          ease: "easeIn",
        }}
        className="text-4xl text-center text-secondary font-semibold py-10"
      >
        Explore Our Products
      </motion.h2>

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7  py-4  gap-3 ">
        <button
          onClick={() => {
            SetFillterdByCatagory("");
            setActiveCategory("");
          }}
          className={`border rounded-full py-2 px-4 hover:bg-secondary transition ease-in cursor-pointer text-center"
             ${activeCategory === "" ? "bg-secondary" : "hover:bg-secondary"}`}
        >
          All
        </button>
        {catagories.map((product, i) => (
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 1, ease: "easeIn" }}
            key={i}
            onClick={() => {
              SetFillterdByCatagory(product);
              setActiveCategory(product);
            }}
            className={`border rounded-full py-2 px-4 hover:bg-secondary transition ease-in cursor-pointer text-center"
             ${
               activeCategory === product
                 ? "bg-secondary"
                 : "hover:bg-secondary"
             }`}
          >
            {product}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
        {filterProducts.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
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
