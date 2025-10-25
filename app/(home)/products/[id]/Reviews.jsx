import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

const Reviews = ({ product }) => {
  const { reviews } = product;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="reviews"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-center text-3xl font-semibold mb-8">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1  gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={review.useimage}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <h3 className="font-medium text-lg">{review.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{review.review_message}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Reviews;
