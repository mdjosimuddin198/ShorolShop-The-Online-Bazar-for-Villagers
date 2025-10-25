"use client";
import getProducts from "@/hook/getProducts";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MyOrder = () => {
  const {
    data: MyOrder,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myorders"],
    queryFn: () => {
      return getProducts("api/buyproduct");
    },
  });
  console.log(MyOrder);

  if (isLoading) {
    return <p>loading....</p>;
  }

  return <div>my order {JSON.stringify(MyOrder)}</div>;
};

export default MyOrder;
