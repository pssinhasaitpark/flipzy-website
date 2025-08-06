import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage,CartDetailsLayout,SeeAllPageLayout,AboutUsLayout } from "./layouts/index";
import "./App.css";
// import SeeAllPage from "./views/pages/SeeAllPage";
// import { CartDetails } from "./views/pages";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUsLayout />} />
        <Route path="/cartDetails/:name/:id" element={<CartDetailsLayout />} />
        <Route path="/seeall/:module_action" element={<SeeAllPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
