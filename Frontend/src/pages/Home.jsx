import React from "react";

import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
//import PricingSection from "../components/PricingSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />

      {/* <PricingSection /> */}
    </div>
  );
};

export default Home;
