"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

const CustomarReview = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "Amazing products and super fast delivery! Highly recommended.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Jane Smith",
      feedback: "Great customer support and very easy return process.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Alice Johnson",
      feedback: "High quality products at affordable prices. Love it!",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Bob Martin",
      feedback: "Fast shipping and excellent customer service!",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
    },
    {
      name: "Emma Wilson",
      feedback: "Products arrived in perfect condition. Very satisfied!",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      name: "Michael Brown",
      feedback: "I love the variety and quality of products.",
      image: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
      name: "Olivia Davis",
      feedback: "Excellent shopping experience, will buy again.",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    {
      name: "James Taylor",
      feedback: "Customer service is top-notch. Highly recommend!",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
  ];

  return (
    <section className="py-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-secondary mb-6">
          Customer Testimonials
        </h2>
        <p className="text-gray-600 mb-10">
          Hear what our happy customers have to say about us.
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className="  shadow-lg 
            hover:scale-105 hover:shadow-2xl 
            transition duration-300 ease-in-out  rounded-xl p-6  flex flex-col items-center text-center  h-60 "
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <p className="text-gray-600 mb-3">"{testimonial.feedback}"</p>
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomarReview;
