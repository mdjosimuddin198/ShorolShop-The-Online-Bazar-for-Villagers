"use client";
import getProducts from "@/hook/getProducts";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ManagProductsLoading from "./manageProductsLoading";
import axios from "axios";
import { toast } from "react-toastify";
import ForbiddenPage from "@/app/components/ForbiddenPage/ForbiddenPage";

const ManageProducts = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getProducts("api/products");
    },
  });

  const handleDelete = (productId) => {
    console.log("btn click");
    axios
      .delete(`/api/products/${productId}`)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
        refetch();
      })
      .catch((err) => {
        toast.error("faild to delete", err);
      });
  };

  if (isLoading || status === "loading") {
    return <ManagProductsLoading />;
  }

  if (!session || session.user.role !== "admin") {
    return <ForbiddenPage />;
  }

  const handleView = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="py-2">
      <motion.h2
        initial={{ scale: [0, 0, 0] }}
        whileInView={{ scale: [0.5, 0.75, 1] }}
        viewport={{ amount: 0.6 }}
        transition={{
          duration: 2,
          repeatType: "loop",
          ease: "easeIn",
        }}
        className="text-4xl text-center text-secondary font-semibold py-10"
      >
        My Order List
      </motion.h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Num</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, idx) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="w-16 h-16 relative">
                <Image
                  src={
                    product?.images && product?.images.length > 0
                      ? product.images[1] || product.images[0]
                      : null
                  }
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.newPrice} $</TableCell>
              <TableCell className="flex items-center gap-3">
                <Button
                  className="cursor-pointer hover:scale-105"
                  onClick={() => {
                    handleView(product._id);
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <Eye size={16} />
                </Button>
                {/* <Button
                  className="cursor-pointer hover:scale-105"
                  onClick={() => {
                    handleView(product._id);
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <Edit size={16} />
                </Button> */}
                <Button
                  className="cursor-pointer hover:scale-105"
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <Trash size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageProducts;
