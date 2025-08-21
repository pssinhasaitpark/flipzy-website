// // src/layouts/LayoutWrapper.jsx
// import React from "react";
// import { Outlet } from "react-router-dom";
// import { Header, Footer, FooterBottom, DownloadQR } from "../components/index.js";

// const LayoutWrapper = () => {
//   return (
//     <>
//       <Header />
//       <Outlet />
//       <DownloadQR />
//       <Footer />
//       <FooterBottom />
//     </>
//   );
// };

// export default LayoutWrapper;
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer, FooterBottom, DownloadQR } from "../components/index.js";

const LayoutWrapper = () => {
  const location = useLocation();
  
  // Define routes where header should be hidden
  const hideHeaderRoutes = [
    '/seeall',
    '/cartDetails'
  ];
  
  // Check if current path starts with any of the hideHeaderRoutes
  const shouldHideHeader = hideHeaderRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Outlet />
      <DownloadQR />
      <Footer />
      <FooterBottom />
    </>
  );
};

export default LayoutWrapper;