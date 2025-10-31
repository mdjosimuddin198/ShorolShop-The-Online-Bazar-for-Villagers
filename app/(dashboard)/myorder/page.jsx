"use client";
import getProducts from "@/hook/getProducts";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const MyOrder = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    data: orderProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myorders"],
    queryFn: () => {
      return getProducts("api/buyproduct");
    },
  });

  if (isLoading || status === "loading") {
    return <p>loading....</p>;
  }

  const myorders = orderProducts?.filter(
    (order) => order.email === session?.user?.email
  );

  const handleMyPorductView = (productId) => {
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
          // repeat: Infinity,
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
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>quantity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myorders.map((myorder) => (
            <TableRow key={myorder._id}>
              <TableCell className="font-medium">{myorder.name}</TableCell>
              <TableCell className="font-medium">{myorder.email}</TableCell>
              <TableCell>
                <Badge className="text-white" variant="secondary">
                  {myorder.status}
                </Badge>
              </TableCell>
              <TableCell>{myorder.quantity}</TableCell>
              <TableCell>{myorder.totalPrice} $</TableCell>
              <TableCell>
                <Button
                  className="cursor-pointer hover:scale-105"
                  onClick={() => {
                    handleMyPorductView(myorder.productId);
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <Eye size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyOrder;
