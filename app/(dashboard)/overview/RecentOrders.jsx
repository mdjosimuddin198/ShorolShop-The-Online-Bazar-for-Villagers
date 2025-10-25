import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
const RecentOrders = ({ orders, setStatusMap, statusMap, handleStatus }) => {
  return (
    <div className="grid grid-cols-1  gap-6">
      {/* Recent Orders */}
      <Card className="">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proudct ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    {order.productId}
                  </TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.totalPrice}$</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell className="flex gap-3 ">
                    <Button variant="ghost" size="icon">
                      <Eye size={16} />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>update status</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          <p>
                            <strong>Customer:</strong> {order.name}
                          </p>
                          <p>
                            <strong>Current Status:</strong> {order.status}
                          </p>

                          <select
                            value={statusMap[order._id] || order.status}
                            onChange={(e) =>
                              setStatusMap({
                                ...statusMap,
                                [order._id]: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={() =>
                                handleStatus(
                                  statusMap[order._id] || order.status,
                                  order._id
                                )
                              }
                              variant="ghost"
                            >
                              Update Status
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentOrders;
