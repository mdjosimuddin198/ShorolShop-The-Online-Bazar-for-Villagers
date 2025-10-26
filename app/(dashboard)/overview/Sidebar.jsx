"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Plus,
  Edit,
  ShoppingBag,
  Users,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

const menuItems = [
  { label: "Add New Product", icon: Plus, href: "/addproducts" },
  { label: "Manage Products", icon: Edit, href: "/manageproducts" },
  { label: "View All Orders", icon: ShoppingBag, href: "/orders" },
  { label: "Manage Customers", icon: Users, href: "/customers" },
  { label: "View Analytics", icon: TrendingUp, href: "/analytics" },
];

const navLinks = menuItems.map((item, index) => (
  <Link className="flex items-center  gap-3" key={index} href={item.href}>
    <Button className="flex w-full  cursor-pointer hover:scale-105 items-center  gap-3">
      <item.icon size={16} />
      {item.label}
    </Button>
  </Link>
));

const Sidebar = () => {
  const logout = () => {
    signOut({ callbackUrl: "/" });
    toast.success("See you soon! You’ve logged out");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 flex items-center justify-between text-white">
        <Sheet>
          <div className="flex items-center justify-between gap-3 bg-secondary rounded-2xl px-8 py-3 fixed  top-0 my-2">
            <h2 className="text-2xl text-black mr-5">ShorolShop</h2>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent side="left" className="bg-sidebar px-4 py-6">
            <nav className="flex flex-col justify-between h-full text-primary">
              <div>
                <SheetTitle>
                  <Link
                    href="/"
                    className="text-xl font-bold text-black  block mb-6"
                  >
                    ShorolShop
                  </Link>
                </SheetTitle>

                <div className="space-y-3 gap-4">{navLinks}</div>
              </div>

              <Button
                onClick={logout}
                variant="outline"
                className="w-full text-black justify-center"
              >
                <LogOut size={16} />
                Log Out
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden w-[300px] md:sticky md:top-0 md:z-10 md:block  h-screen bg-sidebar p-4">
        <nav className="flex flex-col justify-between h-full text-white">
          <div>
            <Link href="/" className="text-xl font-bold text-black block mb-6">
              ShorolShop
            </Link>

            <div className="space-y-3">{navLinks}</div>
          </div>

          <Button
            onClick={logout}
            variant="outline"
            className="w-full text-black justify-center"
          >
            <LogOut size={16} />
            Log Out
          </Button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
