"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const MyOrder = async (orderProduct) => {
  const res = await axios.post("/api/buyproduct", orderProduct);
  return res.data;
};

const BuyNowModal = ({ product, quantity, totalPrice }) => {
  const { data: session } = useSession();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [activePay, setActivePay] = useState("cash_on");

  const tabs = [
    { id: "cash-on", label: "Cash On Delivery" },
    { id: "ssl", label: "SSL" },
  ];

  const mutation = useMutation({
    mutationFn: MyOrder,
    onSuccess: (data) => {
      if (data.status === 400) {
        toast.error(data.message);
      } else {
        console.log("product data save ", data.message);
        toast.success(data.message);
      }
    },
    onError: (err) => {
      console.log("error found ", err);
    },
  });

  const handleBuyProduct = () => {
    const MyOrderProduct = {
      name: session.user.name,
      email: session.user.email,
      productId: product._id,
      quantity,
      totalPrice,
      phone,
      address,
      status: "pending",
    };
    mutation.mutate(MyOrderProduct);
  };

  return (
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
                src={product.images?.[1]}
                alt={product.title}
                fill
                priority
                className="rounded-md "
                sizes="(max-width: 768px) 100vw , 48vw"
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

          <div className="flex items-center justify-evenly">
            {tabs.map((tab) => (
              <Button
                variant="secondary"
                className={`relative text-xl font-semibold cursor-pointer transition-colors ${
                  activePay === tab.id ? "text-white" : "text-black "
                }`}
                onClick={() => setActivePay(tab.id)}
                key={tab.id}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {activePay === "cash-on" && (
            <form className="flex flex-col gap-4">
              <Input
                placeholder="Enter Your Name"
                value={session?.user?.name}
                className="w-full h-8 cursor-not-allowed "
                readOnly
              />
              <Input
                placeholder="Enter Your email"
                value={session?.user?.email}
                className="w-full h-8 cursor-not-allowed "
                readOnly
              />
              <Input
                value={product._id}
                className="w-full h-8  cursor-not-allowed"
                readOnly
              />
              <Textarea
                placeholder="Enter Your Address"
                className="w-full h-8  "
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <Input
                placeholder="Enter Your Number "
                className="w-full h-8  "
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Badge
                variant="primary"
                className="bg-gradient-to-l from-primary to-secondary text-white"
              >
                Only Cashon Delivery Are Available Now
              </Badge>
            </form>
          )}

          {activePay === "ssl" && (
            <div className="flex flex-col items-center justify-center  text-center px-4">
              <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
                We’re still
              </p>

              <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 mt-2">
                Cooking This Feature.
              </h1>

              <p className="text-gray-500 mt-3 max-w-md">
                I am going to launch My website very soon.
                <br />
                Stay tuned.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={handleBuyProduct}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Placing Order..." : "Confirm Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyNowModal;
