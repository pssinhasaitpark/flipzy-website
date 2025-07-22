import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
// import "./Footer.css";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-3" style={{ backgroundColor: "#000000" }}>
      <div className="container">
        <hr className="text-secondary mb-3" />
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <small className="text-light d-block">
              © {currentYear} by Seva Bharti Malwa
            </small>
          </div>
          <div>
            <small className="text-light">
              Address: #225, Himmatgange, 2nd Floor, 12th Cross Road, 2nd Stage,
              Indiranagar, Bengaluru - 560038
            </small>
          </div>
          <div className="d-flex">
            <a href="#" className="text-light me-3 text-decoration-none">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-light me-3 text-decoration-none">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-light text-decoration-none">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
