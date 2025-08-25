// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { LandingPage,CartDetailsLayout,SeeAllPageLayout,AboutUsLayout,ProfileLayout,ShippingAddressLayout } from "./layouts/index";
// import "./App.css";
// import { PrivacyPolicy, TermsNCondition } from "./views/pages";
// import { AddressForm, UpdateWarehouse } from "./components";
// import {PaymentMethod,ViewInfo} from "./components/index";
// // import SeeAllPage from "./views/pages/SeeAllPage";
// // import { CartDetails } from "./views/pages";
// import { OrderHistory } from "./components";
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/aboutus" element={<AboutUsLayout />} />
//             <Route path="/order-history" element={<OrderHistory />} />
//         <Route path="/checkout" element={<AddressForm />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/terms-and-condition" element={<TermsNCondition />} />
//         <Route path="/cartDetails/:name/:id" element={<CartDetailsLayout />} />
//         <Route path="/seeall/:module_action" element={<SeeAllPageLayout />} />
// <Route path="/profile" element={<ProfileLayout />} />
// <Route path="/shipping" element={<ShippingAddressLayout />} />
// <Route path="/payment-method" element={<PaymentMethod />} />
// <Route path="/update-warehouse" element={<UpdateWarehouse />} />
// <Route path="/view-info" element={<ViewInfo />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutWrapper from "./layouts/LayoutWrapper";
import {
  OrderHistory,
  PaymentMethod,
  ViewInfo,
  UpdateWarehouse,
  ShippingAddress,
  AddressForm,
  Checkout,
} from "./components";
import { PrivacyPolicy, TermsNCondition } from "./views/pages";

import {
  LandingPage,
  AboutUsLayout,
  ProfileLayout,
  CartDetailsLayout,
  SeeAllPageLayout,
} from "./layouts/index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutus" element={<AboutUsLayout />} />
          <Route path="/profile" element={<ProfileLayout />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/update-warehouse" element={<UpdateWarehouse />} />
          <Route path="/view-info" element={<ViewInfo />} />
          <Route path="/shipping" element={<ShippingAddress />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-condition" element={<TermsNCondition />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/cartDetails/:name/:id"
            element={<CartDetailsLayout />}
          />
          <Route path="/seeall/:module_action" element={<SeeAllPageLayout />} />
        </Route>
          <Route path="/addressform" element={<AddressForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
