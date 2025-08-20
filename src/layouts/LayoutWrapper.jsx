// src/layouts/LayoutWrapper.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, FooterBottom, DownloadQR } from "../components/index.js";

const LayoutWrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
      <DownloadQR />
      <Footer />
      <FooterBottom />
    </>
  );
};

export default LayoutWrapper;
