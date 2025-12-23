"use client";
import { Button } from "@/components/ui/button";
import { Plus, Package, ShoppingBag, DollarSign, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import getProducts from "@/hook/getProducts";
import { signOut, useSession } from "next-auth/react";
import StatsCards from "./StatsCards";
import RecentOrders from "./RecentOrders";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OverViewLoading from "./OverViewLoading";
import Link from "next/link";
import UserDashboard from "./UserDashboard";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push(
        "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fregister"
      );
    }
  }, [session, status, router]);
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
        deleveriStatus: newStatus,
      })
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          setOrders((prv) =>
            prv.map((order) =>
              order._id === orderId
                ? { ...order, deleveriStatus: newStatus }
                : order
            )
          );
          toast.success("Order status updated successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signOutuser = () => {
    signOut({ callbackUrl: "/" });
    toast.success("See you soon! You’ve logged out");
  };

  const totalRevenue = MyOrder?.reduce(
    (sum, product) => sum + product?.unitPrice * product?.quantity,
    0
  );
  console.log(MyOrder);
  const userOrders = MyOrder?.filter(
    (orders) => orders.email === session.user.email
  );

  const userCost = userOrders?.reduce(
    (sum, product) => sum + product.unitPrice * product?.quantity,
    0
  );

  const totalOrders = MyOrder?.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totlaMyOrders = userOrders?.reduce(
    (sum, product) => sum + product.quantity,
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
            value: totalOrders,
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
            value: totlaMyOrders,
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
    return <UserDashboard signOutuser={signOutuser} stats={stats} />;
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
