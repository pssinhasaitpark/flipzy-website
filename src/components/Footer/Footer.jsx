import React from "react";
import logo from "../../assets/images/flipzy_online_store.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-light py-5" style={{ backgroundColor: "#212121" }}>
      <div className="container">
        <div className="row">
          {/* Logo Column */}
          <div className="col-md-3 mb-4">
            <div className="d-flex align-items-center mb-3">
              <div
                className="text-dark fw-bold text-center"
                style={{ fontSize: "20px" }}
              >
                <img src={logo} alt="image" className="img-fluid w-50" />
              </div>
            </div>
          </div>

          {/* Shop Categories Column */}
          <div className="col-md-2 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Shop Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Beauty
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Books
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Electronics
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Gadgets
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Health and Wellness
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Home & Living
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Kids
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Men's Fashion
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Sports and Outdoors
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Women's Fashion
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-md-2 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-md-2 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Community Guidelines
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Cancellation, Refunds & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="col-md-1 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Policies</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/terms-n-condition" className="text-light text-decoration-none">
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy-policy" className="text-light text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
      </div>
    </footer>
  );
};

export default Footer;
