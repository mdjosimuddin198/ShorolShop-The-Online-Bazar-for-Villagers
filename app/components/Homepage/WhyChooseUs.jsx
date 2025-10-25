"use client";
import { motion } from "motion/react";
import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders over $50.",
      icon: "🚚",
    },
    {
      title: "Cash on Delivery",
      description: "Pay conveniently when your order arrives at your doorstep.",
      icon: "💵",
    },
    {
      title: "24/7 Support",
      description: "We are here to help you anytime, anywhere.",
      icon: "📞",
    },
    {
      title: "Easy Returns",
      description: "Hassle-free returns within 30 days.",
      icon: "↩️",
    },
  ];

  return (
    <section className="py-10 ">
      <div className=" text-center">
        <motion.h2
          initial={{ scale: [0, 0, 0] }}
          whileInView={{ scale: [0.5, 0.75, 1] }}
          viewport={{ amount: 0.6 }}
          transition={{
            duration: 2,
            // repeat: Infinity,
            repeatType: "loop",
            ease: "easeIn",
          }}
          className="text-3xl text-secondary font-bold mb-6"
        >
          Why Choose Us
        </motion.h2>
        <p className="text-gray-600 mb-10">
          We provide the best services to make your shopping experience smooth
          and enjoyable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6, margin: "-50px" }}
              transition={{
                duration: 0.6,
                ease: "easeIn",
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
