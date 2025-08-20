import React from "react";
import { Header, Footer, FooterBottom } from "../components/index.js";
import { ShippingAddress } from "../components/index.js";
const ShippingAddressLayout = () => {
  return (
    <div>
      <Header />
      <ShippingAddress />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default ShippingAddressLayout;
