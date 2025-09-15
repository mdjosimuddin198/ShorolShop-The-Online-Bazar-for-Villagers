import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductsLoading = () => {
  return (
    <Card className="rounded-2xl shadow-md p-2">
      <CardContent className="flex flex-col">
        {/* Image skeleton */}
        <Skeleton className="w-full h-40 rounded-xl bg-gray-200" />

        {/* Title skeleton */}
        <Skeleton className="h-4 w-3/4 mt-3 rounded-md bg-gray-200" />

        {/* Price skeleton */}
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-4 w-20 rounded-md bg-gray-200" />
          <Skeleton className="h-4 w-12 rounded-md bg-gray-200" />
        </div>

        {/* Review skeleton */}
        <Skeleton className="h-3 w-10 mt-2 rounded-md bg-gray-200" />
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Skeleton className="h-8 w-20 rounded-md bg-gray-200" />
        <Skeleton className="h-8 w-20 rounded-md bg-gray-200" />
      </CardFooter>
    </Card>
  );
};

export default ProductsLoading;
