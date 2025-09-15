"use client";
import ProductDetailsLoading from "@/app/components/Loading/ProductDetailsLoading";
import getProduct from "@/app/hook/getProduct";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return getProduct(id);
    },
  });

  const [bandColor, setBandColor] = useState(null);
  const [wristSize, setWristSize] = useState(null);

  useEffect(() => {
    if (product) {
      setBandColor(product.colors[0]);
      setWristSize(product.sizes[0]);
    }
  }, [product]);

  const increasePrice = () => {
    setQuantity(quantity + 1);
  };

  const decreasePrice = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const totalPrice = quantity * product?.newPrice;

  if (error) {
    return <p>Products not Found...</p>;
  }
  if (isLoading) {
    return <ProductDetailsLoading />;
  }

  return (
    <div className="py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white shadow-lg rounded-2xl mb-6">
        {/* Left: Product Image */}
        <div className="relative w-full h-[400px] bg-gray-100 ">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Right: Product Info */}
        <div>
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="text-yellow-500">
            ⭐⭐⭐⭐☆ ({product.reviews} Reviews)
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mt-2">
            <span className="line-through text-gray-400">
              ${product.oldPrice}
            </span>
            <span className="text-2xl font-bold text-purple-600">
              ${product.newPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Type & Model */}
          <div className="mt-4">
            <p>
              <span className="font-medium">Type:</span> {product.type}
            </p>
            <p>
              <span className="font-medium">Model:</span> {product.model}
            </p>
          </div>

          {/* Band Color */}
          <div className="mt-4">
            <h4 className="font-medium">Band Color</h4>
            <div className="flex gap-3 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    bandColor === color
                      ? "border-purple-600"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBandColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Wrist Size */}
          <div className="mt-4">
            <h4 className="font-medium">Wrist Size</h4>
            <div className="flex gap-3 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-lg border ${
                    wristSize === size
                      ? "border-purple-600 bg-purple-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setWristSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button className="px-3 py-1" onClick={decreasePrice}>
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button className="px-3 py-1" onClick={increasePrice}>
                +
              </button>
            </div>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Add to Cart
            </button>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              {totalPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
