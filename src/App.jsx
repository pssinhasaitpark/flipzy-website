import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage,CartDetailsLayout,SeeAllPageLayout,AboutUsLayout,ProfileLayout,ShippingAddressLayout } from "./layouts/index";
import "./App.css";
import { PrivacyPolicy, TermsNCondition } from "./views/pages";
import { AddressForm, UpdateWarehouse } from "./components";
import {PaymentMethod,ViewInfo} from "./components/index";
// import SeeAllPage from "./views/pages/SeeAllPage";
// import { CartDetails } from "./views/pages";
import { OrderHistory } from "./components";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUsLayout />} />
            <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/checkout" element={<AddressForm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-condition" element={<TermsNCondition />} />
        <Route path="/cartDetails/:name/:id" element={<CartDetailsLayout />} />
        <Route path="/seeall/:module_action" element={<SeeAllPageLayout />} />
<Route path="/profile" element={<ProfileLayout />} />
<Route path="/shipping" element={<ShippingAddressLayout />} />
<Route path="/payment-method" element={<PaymentMethod />} />
<Route path="/update-warehouse" element={<UpdateWarehouse />} />
<Route path="/view-info" element={<ViewInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
