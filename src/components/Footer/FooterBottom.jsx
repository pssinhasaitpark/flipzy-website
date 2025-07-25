import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
// import "./Footer.css";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-3" style={{ backgroundColor: "#000000" }}>
      <div className="container">
        <hr className="text-secondary mb-1" />
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <small className="text-light d-block">
              © Flipzy {currentYear} 
            </small>
          </div>
          <div>
            <small className="text-light">
             Terms of Use | Privacy Policy

            </small>
          </div>
          <div className="d-flex">
            <a href="#" className="text-light me-3 mx-2 text-decoration-none">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-light me-3 mx-2  text-decoration-none">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-light  mx-2 text-decoration-none">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
