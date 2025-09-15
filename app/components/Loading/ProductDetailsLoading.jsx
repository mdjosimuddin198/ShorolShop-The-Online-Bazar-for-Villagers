import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsLoading = () => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow-lg rounded-2xl mb-6">
      {/* Left: Image Skeleton */}
      <Skeleton className="relative w-full h-[400px] rounded-xl bg-gray-200" />

      {/* Right: Info Skeleton */}
      <div className="flex flex-col">
        {/* Title */}
        <Skeleton className="h-6 w-2/3 rounded-md bg-gray-200" />
        {/* Rating */}
        <Skeleton className="h-4 w-32 mt-2 rounded-md bg-gray-200" />

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
          <Skeleton className="h-5 w-20 rounded-md bg-gray-200" />
          <Skeleton className="h-6 w-24 rounded-md bg-gray-200" />
        </div>

        {/* Description */}
        <Skeleton className="h-4 w-full mt-4 rounded-md bg-gray-200" />
        <Skeleton className="h-4 w-5/6 mt-2 rounded-md bg-gray-200" />
        <Skeleton className="h-4 w-3/4 mt-2 rounded-md bg-gray-200" />

        {/* Type & Model */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-32 rounded-md bg-gray-200" />
          <Skeleton className="h-4 w-28 rounded-md bg-gray-200" />
        </div>

        {/* Band Colors */}
        <div className="mt-4">
          <Skeleton className="h-4 w-24 rounded-md bg-gray-200" />
          <div className="flex gap-3 mt-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-8 h-8 rounded-full bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-4">
          <Skeleton className="h-4 w-24 rounded-md bg-gray-200" />
          <div className="flex gap-3 mt-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-8 w-14 rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Quantity + Button */}
        <div className="mt-6 flex items-center gap-4">
          <Skeleton className="h-10 w-28 rounded-lg bg-gray-200" />
          <Skeleton className="h-10 w-32 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoading;
