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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const loginRef = useRef(null);
  const orderHistoryRef = useRef(null);
  const userRef = useRef(null);
  const logoutRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [underlineStyle, setUnderlineStyle] = useState({
    width: "0px",
    left: "0px",
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("device_token");
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/aboutus") {
      setActiveTab("about");
    } else if (location.pathname === "/order-history") {
      setActiveTab("orderHistory");
    } else if (location.pathname === "/profile") {
      setActiveTab("userProfile");
    } else {
      setActiveTab("home");
    }

    setIsLoginPopupOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateUnderline = () => {
      let width = "0px";
      let left = "0px";

      const refMap = {
        home: homeRef,
        about: aboutRef,
        login: loginRef,
        orderHistory: orderHistoryRef,
        userProfile: userRef,
        logout: logoutRef,
      };

      const currentRef = refMap[activeTab];
      if (currentRef && currentRef.current) {
        width = `${currentRef.current.offsetWidth}px`;
        left = `${currentRef.current.offsetLeft}px`;
      }

      setUnderlineStyle({ width, left });
    };

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

  const handleLogout = (e) => {
    e.preventDefault();
    setActiveTab("logout");
    localStorage.removeItem("device_token");
    setIsLoggedIn(false);
    navigate("/");
    setActiveTab("home");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== "login") {
      setIsLoginPopupOpen(false);
    }
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
    if (location.pathname === "/aboutus") {
      setActiveTab("about");
    } else if (location.pathname === "/order-history") {
      setActiveTab("orderHistory");
    } else if (location.pathname === "/profile") {
      setActiveTab("userProfile");
    } else {
      setActiveTab("home");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginPopupOpen(false);
    setActiveTab("home");
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <>
      <div className="border border-bottom ">
        <div className="container mt-2 mb-3">
          <Navbar
            expand="lg"
            className="justify-content-between align-items-center"
          >
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
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

                {!isLoggedIn ? (
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
                ) : (
                  <>
                    <Nav.Link
                      ref={orderHistoryRef}
                      as={Link}
                      to="/order-history"
                      className={`me-3 mx-3 ${
                        activeTab === "orderHistory" ? "active fw-bold" : ""
                      }`}
                      onClick={() => handleTabClick("orderHistory")}
                      style={{ fontWeight: "600" }}
                    >
                      Order History
                    </Nav.Link>
                    <Nav.Link
                      ref={userRef}
                      as={Link}
                      to="/profile"
                      className={`me-3 mx-3 ${
                        activeTab === "userProfile" ? "active fw-bold" : ""
                      }`}
                      onClick={() => handleTabClick("userProfile")}
                      style={{ fontWeight: "600" }}
                    >
                      Profile
                    </Nav.Link>
                    <Nav.Link
                      ref={logoutRef}
                      as={Link}
                      to="#logout"
                      className={`me-3 mx-3 ${
                        activeTab === "logout" ? "active fw-bold" : ""
                      }`}
                      onClick={handleLogout}
                      style={{ fontWeight: "600" }}
                    >
                      Logout
                    </Nav.Link>
                  </>
                )}

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

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default CustomNavbar;
