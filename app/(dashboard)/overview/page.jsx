"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import getProducts from "@/hook/getProducts";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import RecentOrders from "./RecentOrders";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getProducts("api/products");
    },
  });

  const { data: MyOrder } = useQuery({
    queryKey: ["myorders"],
    queryFn: () => {
      return getProducts("api/buyproduct");
    },
  });

  const [statusMap, setStatusMap] = useState({});
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (MyOrder) setOrders(MyOrder);
  }, [MyOrder]);
  console.log(MyOrder);
  console.log(orders);

  if (status === "loading") {
    return <h2>loading</h2>;
  }

  // if (!session || session.user.role !== "admin") {
  //   return <h2>Unauthorized</h2>;
  // }

  const handleStatus = async (newStatus, orderId) => {
    axios
      .patch(`/api/buyproduct/${orderId}`, {
        status: newStatus,
      })
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          setOrders((prv) =>
            prv.map((order) =>
              order._id === orderId ? { ...order, status: newStatus } : order
            )
          );
          toast.success("Order status updated successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen  grid grid-cols-12">
      <Sidebar />
      <main className="container md:col-span-9 col-span-12 mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <Button className="gap-2">
            <Plus size={16} />
            Add Product
          </Button>
        </div>
        {/* stats card overview  */}
        <StatsCards products={products} MyOrder={MyOrder} />
        {/* order list  */}
        <RecentOrders
          orders={orders}
          handleStatus={handleStatus}
          setStatusMap={setStatusMap}
          statusMap={statusMap}
        />
      </main>
    </div>
  );
};

export default Dashboard;
