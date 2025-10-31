"use client";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { FaBox, FaHeart, FaHome, FaInfoCircle } from "react-icons/fa";
import { IoCart, IoMenu } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginBtn from "../actions/LoginBtn";
import RegisterBtn from "../actions/RegisterBtn";
import Image from "next/image";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleSignOut = () => {
    signOut();
    toast.success("See you soon! You’ve logged out");
  };
  const isActive = (href) =>
    path === href ? "text-secondary font-semibold" : "";

  const navItems = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/products", label: "Products", icon: <FaBox /> },
    { href: "/about", label: "About", icon: <FaInfoCircle /> },
  ];

  const navLinks = navItems.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={`flex items-center gap-2 hover:text-secondary ${isActive(
        item.href
      )}`}
    >
      {item.icon}
      {item.label}
    </Link>
  ));

  return (
    <header className="w-11/12 mx-auto top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          ShorolShop
        </Link>

        {/* Desktop view */}
        <nav className="hidden md:flex items-center gap-6">{navLinks}</nav>

        {/* Right side */}
        <div className="flex  items-center gap-2">
          {session ? (
            <>
              <p className="hidden md:block">{session.user.name}</p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative w-10 h-10 "
              >
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  onClick={handleSignOut}
                  fill
                  className="object-cover  rounded-full"
                  priority
                  sizes="(max-width: 768px) 100vw , 48vw"
                />
              </motion.div>
              <MdDashboard
                onClick={() => {
                  router.push("/overview");
                }}
                className="w-8 h-8 cursor-pointer"
              />
            </>
          ) : (
            <>
              <LoginBtn />
              <RegisterBtn />
            </>
          )}

          {/* Mobile menu */}
          <Sheet className="bg-red-700">
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <IoMenu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="top" className="w-full px-6 py-6 ">
              <SheetTitle className="font-bold">ShorolShop</SheetTitle>
              {/* navItems  */}
              <nav className="grid gap-4">
                {navLinks}
                {/* if user exits   */}
                {!session && (
                  <>
                    <LoginBtn />
                    <RegisterBtn />
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
