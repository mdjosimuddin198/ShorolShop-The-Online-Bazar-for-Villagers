"use client";
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
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <p className="text-gray-600 mb-10">
          We provide the best services to make your shopping experience smooth
          and enjoyable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
