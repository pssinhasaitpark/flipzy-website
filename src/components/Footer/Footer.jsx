import React from "react";
import { logo } from "../../assets/index";
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
                <img src={logo} alt="image" className="img-fluid w-25" />
              </div>
            </div>
          </div>

          {/* Shop Categories Column */}
          <div className="col-md-2 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Shop Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Women
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Men
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Baby & Kids
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Beauty & Care
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Books
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Home & Kitchen
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Gadgets
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Sports & Leisure
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Tickets & Vouchers
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Brands Column */}
          <div className="col-md-2 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Popular Brands</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Zara
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Mamaearth
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Shein
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Biba
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Avaasa
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Babyhug
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  H&M
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Forever 21
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Max
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Urbanic
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Zudio
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  MyGlamm
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
                <a href="#" className="text-light text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
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
