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
                src={product.image}
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

          <form className="flex flex-col gap-4">
            <Input
              placeholder="Enter Your Name"
              value={session.user.name}
              className="w-full h-8 cursor-not-allowed "
              readOnly
            />
            <Input
              placeholder="Enter Your email"
              value={session.user.email}
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
            />
            <Input
              placeholder="Enter Your Number "
              className="w-full h-8  "
              type="number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Badge variant="primary">
              Only Cashon Delevery Are Available Now
            </Badge>
          </form>

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
