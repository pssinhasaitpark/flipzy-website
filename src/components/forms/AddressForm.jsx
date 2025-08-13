import React from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logo } from "../../assets/index";

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
  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFullName">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  required
                  className="rounded-0  border-start-0 border-end-0"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Enter Phone Number *</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="+91"
                  required
                  className="rounded-0  border-start-0 border-end-0"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email ID *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email ID"
              required
              className="rounded-0  border-start-0 border-end-0"
            />
          </Form.Group>
          <h4>Your Address</h4>
          <Form.Group className="mb-3" controlId="formFlatHouseNo">
            <Form.Label>Flat/House No. *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Flat/House No."
              required
              className="rounded-0  border-start-0 border-end-0"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formApartment">
            <Form.Label>Apartment, Area, Locality *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apartment, Area, Locality"
              required
              className="rounded-0  border-start-0 border-end-0"
            />
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formLandmark">
                <Form.Label>Landmark / How to reach</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Landmark / How to reach"
                  className="rounded-0  border-start-0 border-end-0"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPincode">
                <Form.Label>Pincode *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pincode"
                  required
                  className="rounded-0  border-start-0 border-end-0"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formCity">
                <Form.Label>City *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  required
                  className="rounded-0  border-start-0 border-end-0"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formState">
                <Form.Label>State *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  required
                  className="rounded-0  border-start-0 border-end-0"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-grid gap-2">
            <Button
              //   variant="warning"
              size="lg"
              type="submit"
              className="rounded-0 py-2 btn btn-success"
              style={{
                width: "100%",
              }}
            >
              Next
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddressForm;
