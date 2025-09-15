import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const {
    id,
    category,
    reviews,
    image,
    newPrice,
    title,
    weight,
    oldPrice,
    model,
  } = product;
  return (
    <Card className=" rounded-2xl shadow-md hover:shadow-lg transition p-2">
      <CardContent className="flex flex-col ">
        <div className="w-full h-40 relative rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
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

        <div className="flex items-center gap-1 mt-2">
          <FaStar size={14} className="text-yellow-400" />
          <span className="text-xs text-gray-600">{reviews}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Button className="cursor-pointer" variant="ghost">
          Add to Cart
        </Button>
        <Link
          href={`products/${id}`}
          className="cursor-pointer"
          variant="secondary"
        >
          View More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
