import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage,CartDetailsLayout,SeeAllPageLayout,AboutUsLayout } from "./layouts/index";
import "./App.css";
import { PrivacyPolicy, TermsNCondition } from "./views/pages";
import { AddressForm } from "./components";
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

      </Routes>
    </BrowserRouter>
  );
};

export default App;
