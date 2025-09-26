import React from "react";
import Products from "./products/page";
import Hero from "./components/Homepage/Hero";
import WhyChooseUs from "./components/Homepage/WhyChooseUs";
import CustomarReview from "./components/Homepage/CustomarReview";
import BrandPartners from "./components/Homepage/BrandPartners";

const Home = () => {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <Products />
      </section>
      <section>
        <WhyChooseUs />
      </section>
      <section>
        <CustomarReview />
      </section>
      <section>
        <BrandPartners />
      </section>
    </>
  );
};

export default Home;
