import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { logo } from "../../assets/index";
import { DownloadQR, Footer, FooterBottom } from "..";

const CustomNavbar = () => {
  return (
    <div className="border border-bottom mb-4">
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
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className="d-flex align-items-center">
              <h4 className="text-bolder mt-4">Secure Checkout</h4>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

const AddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    flatHouseNo: "",
    apartment: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      name: formData.fullName,
      mobile: formData.phoneNumber,
      email: formData.email,
      address: `${formData.flatHouseNo}, ${formData.apartment}`,
      landmark: formData.landmark,
      pincode: formData.pincode,
      city: formData.city,
      state: formData.state,
    };
    dispatch(fetchModuleData({ module_action: "addAddresses", params })).then(
      () => {
        navigate("/shipping-address");
      }
    );
  };

  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  required
                  className="rounded-0 border-start-0 border-end-0"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Enter Phone Number *</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="+91"
                  required
                  className="rounded-0 border-start-0 border-end-0"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email ID *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email ID"
              required
              className="rounded-0 border-start-0 border-end-0"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <h4>Your Address</h4>
          <Form.Group className="mb-3" controlId="flatHouseNo">
            <Form.Label>Flat/House No. *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Flat/House No."
              required
              className="rounded-0 border-start-0 border-end-0"
              value={formData.flatHouseNo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="apartment">
            <Form.Label>Apartment, Area, Locality *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apartment, Area, Locality"
              required
              className="rounded-0 border-start-0 border-end-0"
              value={formData.apartment}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="landmark">
                <Form.Label>Landmark / How to reach</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Landmark / How to reach"
                  className="rounded-0 border-start-0 border-end-0"
                  value={formData.landmark}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="pincode">
                <Form.Label>Pincode *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pincode"
                  required
                  className="rounded-0 border-start-0 border-end-0"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="city">
                <Form.Label>City *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  required
                  className="rounded-0 border-start-0 border-end-0"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="state">
                <Form.Label>State *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  required
                  className="rounded-0 border-start-0 border-end-0"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-grid gap-2">
            <Button
              size="lg"
              type="submit"
              className="rounded-0 py-2 btn btn-success"
              style={{ width: "100%" }}
            >
              Next
            </Button>
          </div>
        </Form>
      </Container>
      <DownloadQR />
            <Footer />
            <FooterBottom />
    </>
  );
};

export default AddressForm;
