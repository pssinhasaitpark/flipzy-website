// import React, { useState, useEffect, useRef } from "react";
// import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
// import { logo, logo2 } from "../../assets/index";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Header.css";
// import { FaSearch } from "react-icons/fa";
// const CustomNavbar = () => {
//   const [activeTab, setActiveTab] = useState("home");
//   const homeRef = useRef(null);
//   const aboutRef = useRef(null);
//   const loginRef = useRef(null);
//   const [underlineStyle, setUnderlineStyle] = useState({
//     width: "0px",
//     left: "0px",
//   });

//   useEffect(() => {
//     const updateUnderline = () => {
//       let width = "0px";
//       let left = "0px";

//       if (activeTab === "home" && homeRef.current) {
//         width = `${homeRef.current.offsetWidth}px`;
//         left = `${homeRef.current.offsetLeft}px`;
//       } else if (activeTab === "about" && aboutRef.current) {
//         width = `${aboutRef.current.offsetWidth}px`;
//         left = `${aboutRef.current.offsetLeft}px`;
//       } else if (activeTab === "login" && loginRef.current) {
//         width = `${loginRef.current.offsetWidth}px`;
//         left = `${loginRef.current.offsetLeft}px`;
//       }

//       setUnderlineStyle({ width, left });
//     };

//     updateUnderline();
//     window.addEventListener("resize", updateUnderline);

//     return () => {
//       window.removeEventListener("resize", updateUnderline);
//     };
//   }, [activeTab]);

//   return (
//     <div className="container mt-2">
//       <Navbar
//         expand="lg"
//         className="justify-content-between align-items-center"
//       >
//         <Navbar.Brand href="#home" className="d-flex align-items-center">
//           <img
//             src={logo}
//             width="30"
//             height="30"
//             className="d-inline-block align-top"
//             alt="Logo"
//           />
//           <span className="ms-2 mx-3">FreeUp</span>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Form className="flex-grow-1 mx-3 position-relative">
//             <FormControl
//               type="text"
//               placeholder="Search for anything"
//               className="w-100 rounded-pill border-warning"
//             />
//             <span
//               className="position-absolute"
//               style={{
//                 right: "100px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//               }}
//             >
//               <FaSearch />
//             </span>
//           </Form>
//           <Nav className="d-flex align-items-center position-relative">
//             <Nav.Link
//               ref={homeRef}
//               href="#home"
//               className={`me-5 mx-3 ${activeTab === "home" ? "active" : ""}`}
//               onClick={() => setActiveTab("home")}
//             >
//               Home
//             </Nav.Link>
//             <Nav.Link
//               ref={aboutRef}
//               href="#about"
//               className={`me-3 mx-3 ${activeTab === "about" ? "active" : ""}`}
//               onClick={() => setActiveTab("about")}
//             >
//               About Us
//             </Nav.Link>
//             <Nav.Link
//               ref={loginRef}
//               href="#login"
//               className={`me-3 mx-3 ${activeTab === "login" ? "active" : ""}`}
//               onClick={() => setActiveTab("login")}
//             >
//               Login
//             </Nav.Link>
//             <Button variant="warning" className="rounded-pill px-4 fw-bolder">
//               Sell
//             </Button>
//             <div className="underline fw-bolder" style={underlineStyle}></div>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// };

// export default CustomNavbar;
import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { logo } from "../../assets/index";
import "./Header.css";
import { FaSearch } from "react-icons/fa";

const CustomNavbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const loginRef = useRef(null);

  const [underlineStyle, setUnderlineStyle] = useState({
    width: "0px",
    left: "0px",
  });

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

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => {
      window.removeEventListener("resize", updateUnderline);
    };
  }, [activeTab]);

  return (
    <div className="container mt-2">
      <Navbar
        expand="lg"
        className="justify-content-between align-items-center"
      >
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <span className="ms-2 mx-3">FreeUp</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="flex-grow-1 mx-3 position-relative">
            <FormControl
              type="text"
              placeholder="Search for anything"
              className="w-100 rounded-pill border-warning"
            />
            <span className="position-absolute  search-bar">
              <FaSearch />
            </span>
          </Form>
          <Nav className="d-flex align-items-center position-relative">
            <Nav.Link
              ref={homeRef}
              href="#home"
              className={`me-5 mx-3 ${
                activeTab === "home" ? "active fw-bold" : ""
              }`}
              onClick={() => setActiveTab("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              ref={aboutRef}
              href="#about"
              className={`me-3 mx-3 ${
                activeTab === "about" ? "active fw-bold" : ""
              }`}
              onClick={() => setActiveTab("about")}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              ref={loginRef}
              href="#login"
              className={`me-3 mx-3 ${
                activeTab === "login" ? "active fw-bold" : ""
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </Nav.Link>
            <Button className="  primary-color-bg rounded-pill  text-dark px-4 fw-bold">
              Sell
            </Button>
            <div
              className="underline fw-bold position-absolute bottom-0"
              style={underlineStyle}
            ></div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
