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
        // console.log("product data save ", data.message);
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
      unitPrice: product.newPrice,
      totalPrice,
      phone,
      address,
      paymentMethod: "cash on delivery",
      deleveriStatus: "pending",
    };
    mutation.mutate(MyOrderProduct);
  };

  const handlePayment = async () => {
    if (!phone || !address) {
      toast.error("Phone & Address is required");
      return;
    }
    const sslPayload = {
      name: session.user.name,
      email: session.user.email,
      productId: product._id,
      quantity,
      unitPrice: product.newPrice,
      totalPrice,
      phone,
      address,
      paymentMethod: "ssl",
      PaymentStatus: "pending",
      deleveriStatus: "pending",
    };
    // console.log("payment info ", sslPayload);
    const response = await axios.post("/api/ssl-payment", sslPayload);
    console.log(response.data?.gatPaymentUrl);
    if (response.data?.gatPaymentUrl) {
      window.location.replace(response?.data?.gatPaymentUrl);
    }
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

          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePay(tab.id)}
                className={`w-full py-2 rounded-md text-sm font-medium border
        ${
          activePay === tab.id
            ? "bg-secondary text-white border-secondary"
            : "border-gray-300 text-gray-600"
        }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!phone || !address) {
                toast.error("Phone & Address is required");
                return;
              }
              handleBuyProduct();
            }}
            className="flex flex-col gap-4"
          >
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
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {activePay === "cash-on" && (
              <Badge className="bg-gradient-to-l from-primary to-secondary text-white">
                Cash On Delivery Selected
              </Badge>
            )}

            {activePay === "ssl" && (
              <Badge className="bg-gradient-to-l from-primary to-secondary text-white">
                Pay Securely with SSLCommerz
              </Badge>
            )}

            {/* <DialogFooter>
              <Button
                variant="secondary"
                // onClick={handleBuyProduct}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Placing Order..." : "Confirm Order"}
              </Button>
            </DialogFooter> */}

            <DialogFooter>
              {activePay === "cash-on" ? (
                <Button
                  variant="secondary"
                  disabled={mutation.isPending}
                  type="submit"
                >
                  {mutation.isPending ? "Placing Order..." : "Confirm Order"}
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    // axios.post("/api/ssl-payment", sslPayload).then((res) => {
                    //   window.location.href = res.data.GatewayPageURL;
                    // });
                    handlePayment();
                  }}
                >
                  Pay with SSLCommerz
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyNowModal;
