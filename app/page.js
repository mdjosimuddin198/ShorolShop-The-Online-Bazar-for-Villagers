import React from "react";
import Hero from "./components/Homepage/Hero";
import Products from "./products/page";
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
