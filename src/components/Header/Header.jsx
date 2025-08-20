import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap";
import { logo, logo2, onlyLogo } from "../../assets/index";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import LoginPopup from "../loginPopUp/LoginPopUp";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
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
    // Check if the current route is a profile-related route
    const profileRoutes = [
      "/profile",
      "/payment-method",
      "/update-warehouse",
      "/view-info",
      "/shipping",
    ];
    if (profileRoutes.some((route) => location.pathname.startsWith(route))) {
      setActiveTab("userProfile");
    } else if (location.pathname === "/aboutus") {
      setActiveTab("about");
    } else if (location.pathname === "/order-history") {
      setActiveTab("orderHistory");
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

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setActiveTab("logout");
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("device_token");
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
    navigate("/");
    setActiveTab("home");
    window.dispatchEvent(new Event("authChange"));
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
    // Reset the active tab to the current page
    const profileRoutes = [
      "/profile",
      "/payment-method",
      "/update-warehouse",
      "/view-info",
      "/shipping",
    ];
    if (profileRoutes.some((route) => location.pathname.startsWith(route))) {
      setActiveTab("userProfile");
    } else if (location.pathname === "/aboutus") {
      setActiveTab("about");
    } else if (location.pathname === "/order-history") {
      setActiveTab("orderHistory");
    } else {
      setActiveTab("home");
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== "login") {
      setIsLoginPopupOpen(false);
    }
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
    const profileRoutes = [
      "/profile",
      "/payment-method",
      "/update-warehouse",
      "/view-info",
      "/shipping",
    ];
    if (profileRoutes.some((route) => location.pathname.startsWith(route))) {
      setActiveTab("userProfile");
    } else if (location.pathname === "/aboutus") {
      setActiveTab("about");
    } else if (location.pathname === "/order-history") {
      setActiveTab("orderHistory");
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
      <div className="border border-bottom">
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
                  className="w-100 rounded border-success"
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
                      onClick={handleLogoutClick}
                      style={{ fontWeight: "600" }}
                    >
                      Logout
                    </Nav.Link>
                  </>
                )}
                <Button
                  className="bg-success rounded-pill text-light border-0 px-4 fw-bolder"
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

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutConfirm} onHide={handleCancelLogout} centered>
        <Modal.Header>
          <div className="d-flex align-items-center">
            <img
              className="img-fluid"
              src={onlyLogo}
              alt=""
              style={{ width: "40px" }}
            />
            <Modal.Title className="pt-2 pl-2">Confirm Logout</Modal.Title>
          </div>
          <button
            type="button"
            className="btn-close border-0  mt-1 bg-transparent "
            onClick={handleCancelLogout}
            style={{
              fontSize: "1.5rem",
              outline: "none",
              boxShadow: "none",
            }}
          >
            <IoClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to logout? You will need to login again to
            access your account.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCancelLogout}
            className="px-4"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmLogout}
            className="px-4"
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default CustomNavbar;
