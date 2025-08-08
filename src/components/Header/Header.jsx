import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { logo } from "../../assets/index";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import LoginPopup from "../loginPopUp/LoginPopUp";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const loginRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [underlineStyle, setUnderlineStyle] = useState({
    width: "0px",
    left: "0px",
  });

  // Update active tab based on current route
  useEffect(() => {
    if (location.pathname === "/aboutus") {
      setActiveTab("about");
    } else if (location.pathname === "/") {
      setActiveTab("home");
    }
    // Close login popup when route changes
    setIsLoginPopupOpen(false);
  }, [location.pathname]);

  // Update underline position and width
  useEffect(() => {
    const updateUnderline = () => {
      let width = "0px";
      let left = "0px";
      if (activeTab === "home" && homeRef.current) {
        width = `${homeRef.current.offsetWidth}px`;
        left = `${homeRef.current.offsetLeft}px`;
      } else if (activeTab === "about" && aboutRef.current) {
        width = `${aboutRef.current.offsetWidth}px`;
        left = `${aboutRef.current.offsetLeft}px`;
      } else if (activeTab === "login" && loginRef.current) {
        width = `${loginRef.current.offsetWidth}px`;
        left = `${loginRef.current.offsetLeft}px`;
      }
      setUnderlineStyle({ width, left });
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(updateUnderline, 10);
    window.addEventListener("resize", updateUnderline);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateUnderline);
    };
  }, [activeTab]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setActiveTab("login");
    setIsLoginPopupOpen(true);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== "login") {
      setIsLoginPopupOpen(false);
    }
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
    // Reset active tab to current route when closing login popup
    if (location.pathname === "/aboutus") {
      setActiveTab("about");
    } else if (location.pathname === "/") {
      setActiveTab("home");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to SeeAllPage with 'products' module_action and search query
      // You can change 'products' to any default module_action you want for search
      navigate(
        `/seeall/products?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <>
      <div className="border border-bottom mb-4">
        <div className="container mt-2 mb-3">
          <Navbar
            expand="lg"
            className="justify-content-between align-items-center"
          >
            <Navbar.Brand
              as={Link}
              to="/"
              className="d-flex align-items-center"
            >
              <img
                src={logo}
                height="45"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Form
                className="flex-grow-1 mx-3 mt-2 position-relative"
                onSubmit={handleSearchSubmit}
              >
                <FormControl
                  type="text"
                  placeholder="Search for anything"
                  className="w-100 rounded border-warning"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                />
                <button
                  type="submit"
                  className="position-absolute search-bar border-0 bg-transparent"
                  style={{ cursor: "pointer" }}
                >
                  <FaSearch />
                </button>
              </Form>
              <Nav className="d-flex align-items-center position-relative">
                <Nav.Link
                  ref={homeRef}
                  as={Link}
                  to="/"
                  className={`me-5 mx-3 ${
                    activeTab === "home" ? "active fw-bold" : ""
                  }`}
                  onClick={() => handleTabClick("home")}
                  style={{ fontWeight: "600" }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  ref={aboutRef}
                  as={Link}
                  to="/aboutus"
                  className={`me-3 mx-3 ${
                    activeTab === "about" ? "active fw-bold" : ""
                  }`}
                  onClick={() => handleTabClick("about")}
                  style={{ fontWeight: "600" }}
                >
                  About Us
                </Nav.Link>
                <Nav.Link
                  ref={loginRef}
                  as={Link}
                  to="#login"
                  className={`me-3 mx-3 ${
                    activeTab === "login" ? "active fw-bold" : ""
                  }`}
                  onClick={handleLoginClick}
                  style={{ fontWeight: "600" }}
                >
                  Login
                </Nav.Link>
                <Button
                  className="primary-color-bg rounded-pill text-light border-0 px-4 fw-bolder"
                  style={{ fontWeight: "600" }}
                >
                  Sell
                </Button>
                <div
                  className="underline fw-bold position-absolute bottom-0"
                  style={{
                    ...underlineStyle,
                    transition: "all 0.3s ease-in-out",
                    height: "2px",
                    backgroundColor: "var(--primary-color, #00c853)",
                  }}
                ></div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
      <LoginPopup isOpen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
    </>
  );
};

export default CustomNavbar;