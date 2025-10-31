"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const ForbiddenPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-zinc-800/80 border-zinc-700 shadow-2xl max-w-md text-center p-6 rounded-2xl">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <ShieldAlert className="text-red-500 w-16 h-16" />
              <h1 className="text-3xl font-bold">403 - Forbidden</h1>
              <p className="text-zinc-400">
                You don’t have permission to access this page. Please contact
                your administrator or go back to home.
              </p>
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => router.push("/")}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  Go Home
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-zinc-600 text-zinc-300 hover:bg-zinc-700 rounded-xl"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
export default ForbiddenPage;
