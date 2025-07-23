import React from "react";
import {
  Header,
  HeaderTop,
  Footer,
  FooterBottom,
  Slider,
  PopularBrands,
  LowestPrice,
  Cards,
  ReviewSlider,
} from "../components/index.js";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeaderTop />
      {/* <Cards /> */}
      <LowestPrice />
      {/* <PopularBrands /> */}
      <ReviewSlider />
      <Slider heading="Recently sold items" />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default LandingPage;
