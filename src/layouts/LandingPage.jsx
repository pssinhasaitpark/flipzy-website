// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchModuleData } from "../redux/slices/apiSlice";
// import {
//   Header,
//   HeaderTop,
//   Footer,
//   FooterBottom,
//   Slider,
//   PopularBrands,
//   LowestPrice,
//   Cards,
//   ReviewSlider,
//   HeroSection,
//   DownloadQR,
// } from "../components/index.js";

// const LandingPage = () => {
//   const exclusiveProducts = "exclusiveProducts";
//   const manufacturerProducts = "manufacturerProducts";
//   const products = "products";
//   const dispatch = useDispatch();
//   const { data } = useSelector((state) => state.api);

//   const exclusiveProductData = data[exclusiveProducts]?.product || [];
//   const manufacturerProductData = data[manufacturerProducts]?.product || [];
//   const freshDealsData = data[products]?.product || [];

//   useEffect(() => {
//     dispatch(
//       fetchModuleData({
//         module_action: exclusiveProducts,
//         params: { limit: 10 },
//       })
//     );
//     dispatch(
//       fetchModuleData({
//         module_action: manufacturerProducts,
//         params: { limit: 10 },
//       })
//     );
//     dispatch(
//       fetchModuleData({ module_action: products, params: { limit: 10 } })
//     );
//   }, [dispatch]);

//   console.log("deals are here", freshDealsData);
//   return (
//     <div>
//       <Header />
//       <HeaderTop />
//       <HeroSection />
//       <Cards />
//       <LowestPrice />
//       {/* <PopularBrands /> */}
//       {/* <div style={{ backgroundColor: "#f6fef6" }}> */}
//       <Slider
//         heading="Flipzy Exclusive Item"
//         items={exclusiveProductData}
//         seeDetails="exclusiveProducts"
//       />
//       <Slider
//         heading="Manufacturer's Market"
//         items={manufacturerProductData}
//         seeDetails="manufacturerProducts"
//       />
//       <Slider
//         heading="Fresh Deals & Giveaways"
//         items={freshDealsData}
//         seeDetails="products"
//       />
//       {/* </div> */}
//       {/* <ReviewSlider /> */}
//       <DownloadQR />
//       <Footer />
//       <FooterBottom />
//     </div>
//   );
// };

// export default LandingPage;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../redux/slices/apiSlice";
import {
  HeaderTop,
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
    dispatch(
      fetchModuleData({
        module_action: exclusiveProducts,
        params: { limit: 10 },
      })
    );
    dispatch(
      fetchModuleData({
        module_action: manufacturerProducts,
        params: { limit: 10 },
      })
    );
    dispatch(
      fetchModuleData({ module_action: products, params: { limit: 10 } })
    );
  }, [dispatch]);

  return (
    <div>
      <HeaderTop />
      <HeroSection />
      <Cards />
      <LowestPrice />
      <Slider
        heading="Flipzy Exclusive Item"
        items={exclusiveProductData}
        seeDetails="exclusiveProducts"
      />
      <Slider
        heading="Manufacturer's Market"
        items={manufacturerProductData}
        seeDetails="manufacturerProducts"
      />
      <Slider
        heading="Fresh Deals & Giveaways"
        items={freshDealsData}
        seeDetails="products"
      />
    </div>
  );
};

export default LandingPage;
