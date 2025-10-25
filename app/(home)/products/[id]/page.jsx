"use client";
import BuyNowModal from "@/app/components/buyNowModal/BuyNowModal";
import ProductDetailsLoading from "@/app/components/Loading/ProductDetailsLoading";
import { Button } from "@/components/ui/button";
import getProduct from "@/hook/getProduct";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductOverview from "./ProductOverview";
import Reviews from "./Reviews";

const tabs = [
  { id: "product_overview", label: "Product Overview" },
  { id: "reviews", label: "Reviews" },
];

const ProductDetails = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("product_overview");
  // Query product details
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const [wristSize, setWristSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const increasePrice = () => setQuantity((prev) => prev + 1);
  const decreasePrice = () => setQuantity((prev) => Math.max(1, prev - 1));

  const totalPrice = product ? quantity * product.newPrice : 0;

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push(
        "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fregister"
      );
    }
  }, [session, status, router]);

  useEffect(() => {
    if (product?.images?.[0]) {
      setMainImage(product?.images?.[0]);
    }
  }, [product]);

  if (isLoading || status === "loading") return <ProductDetailsLoading />;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">Product not found...</p>
    );

  return (
    <div className="py-10">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-6 bg-white shadow-lg rounded-2xl mb-10 p-4">
        {/* ===== Left: Image Gallery ===== */}
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex  md:flex-col ">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`w-24 h-24 relative m-3 rounded-lg cursor-pointer overflow-hidden border transition ${
                  mainImage === img
                    ? "border-secondary ring-2 ring-secondary"
                    : "border-gray-300 hover:border-secondary"
                }`}
              >
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden hover:scale-105 transition duration-300 ease-in-out">
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition duration-300 ${
                  zoom ? "scale-125" : "scale-100"
                }`}
                priority
              />
            )}
          </div>
        </div>

        {/* ===== Right: Product Info ===== */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">{product.title}</h2>

          {/* Price */}
          <div className="flex items-center gap-3 mt-3">
            <span className="line-through text-gray-400 text-lg">
              ${product.oldPrice}
            </span>
            <span className="text-3xl font-bold text-secondary">
              ${product.newPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-3 leading-relaxed text-sm">
            {product.description}
          </p>

          {/* Type & Model */}
          <div className="mt-4 text-sm">
            <p>
              <span className="font-medium">Type:</span> {product.type}
            </p>
            <p>
              <span className="font-medium">Model:</span> {product.model}
            </p>
          </div>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-5">
              <h4 className="font-medium mb-2">Available Sizes</h4>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setWristSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm transition ${
                      wristSize === size
                        ? "bg-purple-100 border-secondary"
                        : "border-gray-300 hover:border-secondary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Total Price */}
          <div className="mt-5 text-lg font-semibold">
            Total Price: <span className="text-secondary">${totalPrice}</span>
          </div>

          {/* Quantity + Buy Now */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <Button variant="secondary" onClick={decreasePrice}>
                -
              </Button>
              <span className="px-4">{quantity}</span>
              <Button variant="secondary" onClick={increasePrice}>
                +
              </Button>
            </div>

            <BuyNowModal
              totalPrice={totalPrice}
              quantity={quantity}
              product={product}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 mb-8 border-b border-gray-700 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative p text-xl font-semibold cursor-pointer transition-colors ${
              activeTab === tab.id ? "text-secondary" : "text-black "
            }`}
          >
            {tab.label}

            {/* Glowing underline */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_#22d3ee]"
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ===== Product Overview Section ===== */}
      {activeTab === "product_overview" && (
        <ProductOverview product={product} />
      )}
      {/* ===== Product Reviews Section ===== */}
      {activeTab === "reviews" && <Reviews product={product} />}
    </div>
  );
};

export default ProductDetails;
