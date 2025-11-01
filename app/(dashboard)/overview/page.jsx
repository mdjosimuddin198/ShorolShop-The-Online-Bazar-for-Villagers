"use client";
import { Button } from "@/components/ui/button";
import { Plus, Package, ShoppingBag, DollarSign, Users } from "lucide-react";
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
import UserDashboard from "./UserDashboard";

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
    return <OverViewLoading orders={orders} />;
  }

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

  const totalRevenue = MyOrder?.reduce(
    (sum, product) => sum + product?.totalPrice,
    0
  );

  const userOrders = MyOrder?.filter(
    (orders) => orders.email === session.user.email
  );

  const userCost = userOrders?.reduce(
    (sum, product) => sum + product.totalPrice,
    0
  );

  let stats;
  {
    session.user.role === "admin"
      ? (stats = [
          {
            title: "Total Products",
            value: products?.length,
            change: "+12%",
            icon: Package,
            trend: "up",
          },
          {
            title: "Total Orders",
            value: MyOrder?.length,
            change: "+8%",
            icon: ShoppingBag,
            trend: "up",
          },
          {
            title: "Revenue",
            value: `${totalRevenue} $`,
            change: "+23%",
            icon: DollarSign,
            trend: "up",
          },
          {
            title: "Customers",
            value: users?.length,
            change: "+5%",
            icon: Users,
            trend: "up",
          },
        ])
      : (stats = [
          {
            title: "Total Products",
            value: products?.length,
            change: "+12%",
            icon: Package,
            trend: "up",
          },
          {
            title: "My Orders",
            value: userOrders?.length,
            change: "+8%",
            icon: ShoppingBag,
            trend: "up",
          },
          {
            title: "My Cost",
            value: `${userCost} $`,
            change: "+23%",
            icon: DollarSign,
            trend: "up",
          },
        ]);
  }

  if (!session || session.user.role !== "admin") {
    return <UserDashboard stats={stats} />;
  }

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
      <StatsCards stats={stats} />
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
