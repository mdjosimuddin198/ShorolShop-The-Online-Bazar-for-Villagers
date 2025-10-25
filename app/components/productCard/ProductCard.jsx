import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { _id, category, images, newPrice, title, weight, oldPrice, model } =
    product;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{
        duration: 0.6,
        ease: "easeIn",
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
    >
      <Card className=" rounded-2xl shadow-md hover:shadow-lg transition px-3 py-4">
        <CardContent className="flex flex-col ">
          <div className="w-full h-40 relative rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={images?.[1]}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              className=" shadow-lg 
            hover:scale-125 hover:shadow-2xl 
            transition duration-300 ease-in-out"
            />
          </div>

          {/* <h3 className="text-md font-semibold  mt-3 text-left">{title}</h3> */}
          <CardTitle className="mt-3">{title}</CardTitle>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-black">
              Price: {newPrice}
            </span>
            <span className="text-gray-400 line-through  text-sm">
              ${oldPrice}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-4  items-center">
          <Button className="cursor-pointer hover:scale-105" variant="ghost">
            Add to Cart
          </Button>
          <Link
            href={`products/${_id}`}
            className="cursor-pointer hover:scale-105"
          >
            <Button className="cursor-pointer" variant="secondary">
              View More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
