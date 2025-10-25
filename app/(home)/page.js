import React from "react";

import WhyChooseUs from "../components/Homepage/WhyChooseUs";
import Products from "./products/page";
import CustomarReview from "../components/Homepage/CustomarReview";
import BrandPartners from "../components/Homepage/BrandPartners";
import Hero from "../components/Homepage/Hero";

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
