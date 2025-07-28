import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./layouts/index";
import "./App.css";
import SeeAllPage from "./views/pages/SeeAllPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/seeall/:module_action" element={<SeeAllPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
