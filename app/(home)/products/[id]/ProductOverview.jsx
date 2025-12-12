import ProductCard from "@/app/components/productCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import getProducts from "@/hook/getProducts";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const ProductOverview = ({ product }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getProducts("api/products", 4);
    },
  });

  const uniqueProducts = products?.filter((item) => item._id !== product._id);

  return (
    <AnimatePresence>
      <motion.div
        key="product_overview"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <section className="w-11/12 mx-auto mb-10">
          <h3 className="text-xl font-bold mb-3 border-b pb-2">
            Product Overview
          </h3>
          <p className="text-gray-700 leading-relaxed">
            This product is designed for modern users who value quality,
            durability, and smart design. It offers advanced functionality,
            long-lasting materials, and a sleek appearance that complements any
            lifestyle.
          </p>
        </section>

        {/* ===== Product Specifications Section ===== */}
        <section className="w-11/12 mx-auto mb-10">
          <h3 className="text-xl font-bold mb-3 border-b pb-2">
            Specifications
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Material: Premium Alloy Body</li>
            <li>Battery Life: Up to 7 days</li>
            <li>Connectivity: Bluetooth 5.0</li>
            <li>Compatibility: Android / iOS</li>
            <li>Warranty: 1 Year Replacement</li>
          </ul>
        </section>

        {/* ===== Related Products Section ===== */}
        <section className="w-11/12 mx-auto mb-10">
          <h3 className="text-xl font-bold mb-3 border-b pb-2">
            Related Products
          </h3>
          <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-6">
            {uniqueProducts?.map((product) => (
              <Card
                key={product._id}
                className=" rounded-2xl shadow-md hover:shadow-lg transition px-3 py-4"
              >
                <CardContent className="flex flex-col ">
                  <div className="w-full h-40 relative rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={product.images?.[1]}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                      className=" shadow-lg hover:scale-125 hover:shadow-2xl transition duration-300 ease-in-out"
                    />
                  </div>

                  {/* <h3 className="text-md font-semibold  mt-3 text-left">{title}</h3> */}
                  <CardTitle className="mt-3">{product.title}</CardTitle>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-black">
                      Price: {product.newPrice}
                    </span>
                    <span className="text-gray-400 line-through  text-sm">
                      ${product.oldPrice}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-4  items-center">
                  <Button
                    className="cursor-pointer hover:scale-105"
                    variant="ghost"
                  >
                    Add to Cart
                  </Button>
                  <Link
                    href={`${product._id}`}
                    className="cursor-pointer hover:scale-105"
                  >
                    <Button className="cursor-pointer" variant="secondary">
                      View More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductOverview;
