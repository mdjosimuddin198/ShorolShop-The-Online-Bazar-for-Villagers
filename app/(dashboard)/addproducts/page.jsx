"use client";
import { motion } from "motion/react";

const addproducts = () => {
  return (
    <div>
      <motion.h2
        initial={{ scale: [0, 0, 0] }}
        whileInView={{ scale: [0.5, 0.75, 1] }}
        viewport={{ amount: 0.6 }}
        transition={{
          duration: 2,
          repeatType: "loop",
          ease: "easeIn",
        }}
        className="text-4xl text-center text-secondary font-semibold py-10"
      >
        Add Prouducts
      </motion.h2>
    </div>
  );
};

export default addproducts;
