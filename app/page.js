import React from "react";
import Products from "./products/page";
import Hero from "./components/Homepage/Hero";
import WhyChooseUs from "./components/Homepage/WhyChooseUs";

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
    </>
  );
};

export default Home;
