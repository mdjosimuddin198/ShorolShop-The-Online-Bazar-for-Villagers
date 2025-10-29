"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import getProducts from "@/hook/getProducts";
import { useSession } from "next-auth/react";
import StatsCards from "./StatsCards";
import RecentOrders from "./RecentOrders";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import OverViewLoading from "./OverViewLoading";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // all products
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
  // my orders products
  const { data: MyOrder } = useQuery({
    queryKey: ["myorders"],
    queryFn: () => {
      return getProducts("api/buyproduct");
    },
  });

  // all users

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getProducts("api/auth/user");
    },
  });

  const [statusMap, setStatusMap] = useState({});
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (MyOrder) setOrders(MyOrder);
  }, [MyOrder]);

  if (status === "loading") {
    return <OverViewLoading />;
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
    <main className="container px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <Link href="/addproducts">
          <Button className="gap-2 cursor-pointer">
            <Plus size={16} />
            Add Product
          </Button>
        </Link>
      </div>
      {/* stats card overview  */}
      <StatsCards products={products} users={users} MyOrder={MyOrder} />
      {/* order list  */}
      <RecentOrders
        orders={orders}
        handleStatus={handleStatus}
        setStatusMap={setStatusMap}
        statusMap={statusMap}
      />
    </main>
  );
};

export default Dashboard;
