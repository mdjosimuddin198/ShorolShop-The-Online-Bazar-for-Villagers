"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const Hero = () => {
  const slides = [
    {
      title: "Unleash the Best Deals",
      desc: "Discover top-quality electronics and accessories at prices you’ll love. Upgrade your lifestyle today with VisionMart.",
      img: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
    },
    {
      title: "Tech You Can’t Miss",
      desc: "Stay ahead with the latest gadgets and exclusive offers only at VisionMart. Innovation meets style and affordability.",
      img: "https://i.pinimg.com/1200x/3a/8e/ae/3a8eae15d2f1f53a0a5e97698a7651c1.jpg",
    },
    {
      title: "Smart Shopping, Better Living",
      desc: "Enjoy unbeatable deals on electronics, fashion, and accessories. Shop smart, live better, and elevate your everyday experiences.",
      img: "https://i.pinimg.com/1200x/f9/7a/29/f97a29c7c39f9c03e8f5af3087bd94c9.jpg",
    },
  ];

  return (
    <motion.section
      animate={{}}
      className="bg-transparent text-center text-white  "
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="rounded-2xl"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            {/* Background Image with Overlay */}
            <div className="relative flex items-center justify-center h-[400px]">
              <Image
                src={slide.img}
                alt="Hero Background"
                fill
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-[#242121be] rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 max-w-3xl px-4">
                <motion.h1
                  initial={{ x: 90, opacity: 0.2 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-extrabold leading-tight"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mt-4 text-lg md:text-xl text-gray-100"
                >
                  {slide.desc}
                </motion.p>

                {/* Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Button
                    className="cursor-pointer hover:scale-105"
                    variant="ghost"
                  >
                    Shop Now
                  </Button>
                  <Button
                    className="cursor-pointer hover:scale-105"
                    variant="secondary"
                  >
                    View Offer
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default Hero;
