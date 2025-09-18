"use client";
import ProductDetailsLoading from "@/app/components/Loading/ProductDetailsLoading";
// import getProduct from "@/hook/getProduct";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import getProduct from "@/hook/getProduct";
import { DialogTitle } from "@radix-ui/react-dialog";
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
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-4 bg-white shadow-lg rounded-2xl mb-6">
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
            <span className="text-2xl font-bold text-secondary">
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
                    bandColor === color ? "border-secondary" : "border-gray-300"
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
                      ? "border-secondary bg-purple-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setWristSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl">
              Total Price :
              <span className="text-secondary font-semibold">
                ${totalPrice}
              </span>
            </h2>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border gap-2 rounded-lg">
              <Button variant="secondary" onClick={decreasePrice}>
                -
              </Button>
              <span className="px-4">{quantity}</span>
              <Button variant="secondary" onClick={increasePrice}>
                +
              </Button>
            </div>
            <div className="">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Order Now</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-secondary font-semibold text-xl text-center">
                      Please Fill Out This From
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center gap-3  justify-evenly">
                    <div className="w-20 relative h-20">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        priority
                        className="rounded-md "
                        // sizes="(max-width: 768px) 100vw , 48vw"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-semibold">{product.title}</h2>
                      <h2 className=" ">
                        Product Price :
                        <span className="text-secondary font-semibold">
                          {" "}
                          {product.newPrice}
                        </span>
                      </h2>
                      <p>
                        Quantity:
                        <span className="text-secondary font-semibold">
                          {" "}
                          {quantity}
                        </span>
                      </p>
                      <p>
                        Total Price:
                        <span className="text-secondary font-semibold">
                          {" "}
                          {totalPrice}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder="Enter Your Name"
                      className="w-full h-8  "
                    />
                    <Input value="32" className="w-full h-8  " readOnly />
                    <Textarea
                      placeholder="Enter Your Address"
                      className="w-full h-8  "
                    />
                    <Input
                      placeholder="Enter Your Number "
                      className="w-full h-8  "
                      type="number"
                    />
                  </div>

                  <DialogFooter>
                    <Button variant="secondary" className="cursor-pointer">
                      Confrim Process
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
