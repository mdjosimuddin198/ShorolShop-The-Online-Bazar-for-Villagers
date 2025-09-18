import React from "react";
import Products from "./products/page";
import Hero from "./components/Homepage/Hero";

const Home = () => {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <Products />
      </section>
    </>
  );
};

export default Home;
