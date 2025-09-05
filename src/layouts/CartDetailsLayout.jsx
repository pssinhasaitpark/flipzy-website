import React from "react";
import {
  HeaderSeeAll,
  Footer,
  FooterBottom,
  DownloadQR,
} from "./../components/index";
import { CartDetails } from "./../views/pages/index";
const CartDetailsLayout = () => {
  return (
    <div>
      <HeaderSeeAll />
      <CartDetails />
      {/* <DownloadQR />
      <Footer />
      <FooterBottom /> */}
    </div>
  );
};

export default CartDetailsLayout;
