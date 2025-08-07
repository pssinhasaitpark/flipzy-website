// import React from "react";
// import { mobile, qrCode } from "../../assets";

// const MobileAppPromo = () => {
//   return (
//     <div
//       className="w-100"
//       style={{ backgroundColor: "#F4D03F", padding: "60px 0" }}
//     >
//       <div className="container">
//         <div className="row align-items-center">
//           {/* Left Section - Mobile Phones */}
//           <div
//             className="col-xl-5 col-lg-5 col-md-6"
//             style={{ height: "25vh", overflow: "hidden" }}
//           >
//             <img
//               src={mobile}
//               alt="App Screenshot 1"
//               style={{ height: "450px", width: "650px" }}
//             />
//           </div>

//           {/* Middle Section - Text & Buttons */}
//           <div className="col-xl-4 col-lg-4 col-md-6 text-center text-md-start mb-4 mb-xl-0">
//             <h1
//               className="fw-bold mb-3"
//               style={{ fontSize: "2.5rem", color: "#2C3E50" }}
//             >
//               Get the app
//             </h1>
//             <p
//               className="mb-4"
//               style={{ fontSize: "1.1rem", color: "#34495E" }}
//             >
//               India's #1 Online Resale Platform
//             </p>

//             <div className="d-grid ">
//               <a href="#" className="text-decoration-none me-2">
//                 <img
//                   src="https://www.freeup.app/img/googleplay.png"
//                   alt="Get it on Google Play"
//                   className="img-fluid"
//                   style={{ maxWidth: "160px" }}
//                 />
//               </a>
//               <a href="#" className="text-decoration-none">
//                 <img
//                   src="https://www.freeup.app/img/appstore.png"
//                   alt="Download on the App Store"
//                   className="img-fluid"
//                   style={{ maxWidth: "160px" }}
//                 />
//               </a>
//             </div>
//           </div>

//           {/* Right Section - QR Code */}
//           <div className="col-xl-3 col-lg-3 col-md-12 text-center">
//             <div className="text-center">
//               <h5 className="fw-bold mb-3" style={{ color: "#2C3E50" }}>
//                 Scan QR Code
//               </h5>
//               <div className="d-inline-block p-3 bg-white rounded-3 shadow-sm">
//                 <img
//                   src={qrCode}
//                   alt="QR Code"
//                   className="img-fluid"
//                   style={{ width: "140px", height: "140px" }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileAppPromo;
import React from "react";
import { mobile, qrCode } from "../../assets";
// import "./DownloadQR.css";

const MobileAppPromo = () => {
  return (
    <div className="w-100" style={{ backgroundColor: "#66e48c" }}>
      <div className="container">
        <div className="row align-items-center gap-4">
          {/* Left Section - Mobile Phones */}
          <div
            className="col-xl-5 col-lg-5 col-md-6 col-sm-12"
            style={{
              height: "38vh",
              overflow: "hidden",
              minHeight: "300px", // Ensure minimum height on smaller screens
            }}
          >
            <img
              src={mobile}
              alt="App Screenshot 1"
              className="img-fluid"
              style={{
                height: "500px",
                width: "500px",
                maxWidth: "100%",
                // height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Middle Section - Text & Buttons */}
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center text-md-start mb-4 mb-xl-0">
            <h1
              className="fw-bold mb-3"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)", // Responsive font size
                color: "#2C3E50",
              }}
            >
              Get the app
            </h1>
            <p
              className="mb-4"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.1rem)", // Responsive font size
                color: "#34495E",
              }}
            >
              India's #1 Online Resale Platform
            </p>
            <div className="d-grid gap-3 d-sm-flex d-md-grid justify-content-sm-center justify-content-md-start">
              <a href="#" className="text-decoration-none">
                <img
                  src="https://www.freeup.app/img/googleplay.png"
                  alt="Get it on Google Play"
                  className="img-fluid mb-2 "
                  style={{
                    maxWidth: "160px",
                    paddingRight: "5px",
                    width: "100%",
                    minWidth: "120px",
                  }}
                />
              </a>
              <a href="#" className="text-decoration-none">
                <img
                  src="https://www.freeup.app/img/appstore.png"
                  alt="Download on the App Store"
                  className="img-fluid"
                  style={{
                    maxWidth: "160px",
                    width: "100%",
                    minWidth: "120px",
                  }}
                />
              </a>
            </div>
          </div>

          {/* Right Section - QR Code */}
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 text-center">
            <div className="text-center">
              <h5
                className="fw-bold mb-3"
                style={{
                  color: "#2C3E50",
                  fontSize: "clamp(1rem, 3vw, 1.25rem)", // Responsive font size
                }}
              >
                Scan QR Code
              </h5>
              <div className="d-inline-block p-3 bg-white rounded-3 shadow-sm mb-lg-0 mb-5">
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="img-fluid"
                  style={{
                    width: "140px",
                    height: "140px",
                    maxWidth: "100%",
                    minWidth: "100px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppPromo;
