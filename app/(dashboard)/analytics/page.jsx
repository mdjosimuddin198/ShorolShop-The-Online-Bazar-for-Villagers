"use client";

import { Button } from "@/components/ui/button";
import { Home, Mail } from "lucide-react";
import Link from "next/link";
const Analytics = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9fb] text-center px-4">
      <div className="text-4xl mb-4">👍</div>
      <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
        We’re still
      </p>

      <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 mt-2">
        Cooking This Feature.
      </h1>

      <p className="text-gray-500 mt-3 max-w-md">
        I am going to launch My website very soon.
        <br />
        Stay tuned.
      </p>

      <Link href="/">
        <Button className="my-4" variant="secondary">
          <Home className="mr-2 h-5 w-5" /> Go Home
        </Button>
      </Link>
    </div>
  );
};

export default Analytics;
