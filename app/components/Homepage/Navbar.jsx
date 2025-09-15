"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FaBox,
  FaEnvelope,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";
import { IoCart, IoMenu } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const navlink = (
    <>
      <Link href="/" className="flex items-center gap-2">
        <FaHome />
        Home
      </Link>
      <Link href="/products" className="flex items-center gap-2">
        <FaBox /> Products
      </Link>
      <Link href="/about" className="flex items-center gap-2">
        <FaInfoCircle /> About
      </Link>
      <Link href="/signup" className="flex items-center gap-2">
        <FaEnvelope /> Sign Up
      </Link>
    </>
  );
  return (
    <header className=" top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          NovaCart
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6">{navlink}</nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search (desktop) */}
          <div className="relative hidden md:block">
            <Input
              placeholder="What are you looking for?"
              className="w-64 pr-10"
            />
            <f className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>

          <Button variant="secondary" size="icon" aria-label="Wishlist">
            <FaHeart className="h-8 w-8" />
          </Button>
          <Button variant="secondary" size="icon" aria-label="Cart">
            <IoCart className="h-8 w-8" />
          </Button>

          {/* Mobile menu */}
          <Sheet>
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
              <SheetTitle className="font-bold">SwifMart</SheetTitle>
              <nav className="grid gap-4">
                {navlink}
                <div className="mt-4">
                  <div className="relative">
                    <Input placeholder="Search…" className="pr-10" />
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
