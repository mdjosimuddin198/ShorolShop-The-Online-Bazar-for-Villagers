"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="  flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full"
      >
        <Card className="shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-10 space-y-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-bold  "
            >
              ShorolShop
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-black leading-relaxed"
            >
              Your trusted partner for{" "}
              <span className=" font-semibold">premium electronics</span>
              and <span className=" font-semibold">lifestyle products</span>. We
              believe in <span className="">excellence</span> — from quality and
              service to continuous{" "}
              <span className="text-secondary">innovation</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-4"
            >
              <Link href="/products">
                <Button className="text-white" variant="secondary">
                  Explore Products
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
