"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getProducts from "@/hook/getProducts";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import ForbiddenPage from "@/app/components/ForbiddenPage/ForbiddenPage";

const ManageCustomers = () => {
  const { data: session, status } = useSession();

  if (!session || session.user.role !== "admin") {
    return <ForbiddenPage />;
  }

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getProducts("api/auth/user");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Mange Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Image </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Avatar>
                    <AvatarImage src={user.image} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-white">
                  <Badge variant="secondary">
                    {user.role ? user.role : "user"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ManageCustomers;
