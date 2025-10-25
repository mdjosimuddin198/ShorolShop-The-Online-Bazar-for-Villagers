import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users, TrendingUp, Plus, Edit } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

const Sidebar = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    toast.success("See you soon! You’ve logged out");
  };
  return (
    <aside className="md:col-span-3 hidden md:block h-screen  p-4">
      {/* Quick Actions */}
      <Card className="bg-secondary h-screen">
        <CardHeader>
          <CardTitle>
            <Link href="/" className="text-xl text-white font-bold">
              ShorolShop
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start gap-2" variant="outline">
            <Plus size={16} />
            <Link href="/addproducts">Add New Product</Link>
          </Button>
          <Button className="w-full justify-start gap-2" variant="outline">
            <Edit size={16} />
            <Link href="/manageproducts">Manage Products</Link>
          </Button>
          <Button className="w-full justify-start gap-2" variant="outline">
            <ShoppingBag size={16} />
            <Link href="/orders">View All Orders</Link>
          </Button>
          <Button className="w-full justify-start gap-2" variant="outline">
            <Users size={16} />
            <Link href="/customers">Manage Customers</Link>
          </Button>
          <Button className="w-full justify-start gap-2" variant="outline">
            <TrendingUp size={16} />
            <Link href="/analytics">View Analytics</Link>
          </Button>
          <Button
            onClick={() => {
              handleLogout();
            }}
            className="cursor-pointer absolute bottom-30 w-[200px] left-25"
            variant="ghost"
          >
            Log Out
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;
