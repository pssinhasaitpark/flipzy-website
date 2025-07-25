import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../redux/slices/apiSlice";
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
  HeroSection,
} from "../components/index.js";

const LandingPage = () => {
  const exclusiveProducts = "exclusiveProducts";
  const manufacturerProducts = "manufacturerProducts";
  const products = "products";
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.api);

  const exclusiveProductData = data[exclusiveProducts]?.product || [];
  const manufacturerProductData = data[manufacturerProducts]?.product || [];
  const freshDealsData = data[products]?.product || [];

  useEffect(() => {
    dispatch(fetchModuleData({ module_action: exclusiveProducts }));
    dispatch(fetchModuleData({ module_action: manufacturerProducts }));
    dispatch(fetchModuleData({ module_action: products }));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <HeaderTop />
      <HeroSection />
      <Cards />
      <LowestPrice />
      {/* <PopularBrands /> */}
      <div style={{ backgroundColor: "#f6fef6" }}>
        <Slider heading="Flipzy Exclusive Item" items={exclusiveProductData} />
        <Slider
          heading="Manufacturer's Market"
          items={manufacturerProductData}
        />
        <Slider heading="Fresh Deals & Giveaways" items={freshDealsData} />
      </div>
      {/* <ReviewSlider /> */}
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default LandingPage;
