import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const OurMission = () => {
  return (
    <div className="container ">
      {/* Mission Section */}
      <Row className="justify-content-center mb-5">
        <Col lg={8} md={10}>
          <Card className="border-0 ">
            <Card.Body className="text-center py-5">
              <div className="mb-4">
                <h2 className="display-6 mb-3 text-black">Our Vision</h2>
                <div
                  className=" mx-auto  "
                  style={{
                    width: "60px",
                    height: "3px",
                    backgroundColor: "#00c853",
                  }}
                ></div>
              </div>
              <h3
                className="h2 lh-lg mb-0 fw-bold"
                style={{
                  color: "#2c3e50",
                }}
              >
                To empower individuals to give a second life to their unused
                products and contribute to a circular economy. We believe in
                making reuse easy, accessible, and rewarding for everyone.
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Existing About Content */}
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <p className="fs-5 mb-4">
            We empower people to unlock value from their unused belongings, save money, and promote an eco-friendly way of living by reducing waste and extending the lifecycle of products.
          </p>
          <p className="fs-6">
            We are dedicated to providing the best service and products to our
            customers. Our team is passionate about what we do and strives to
            make a positive impact in the community.
          </p>
          <img
            className="img-fluid mx-auto my-4 d-block"
            src="https://imgcdn.freeup.app/zorro/1e4bc1b4e2d84a88253b34250417e6c2.png"
            alt=""
          />
        </Col>
      </Row>
      <div
        className=" d-flex justify-content-center  mb-5 bg-warning p-4 "
        style={{
          background:
            "linear-gradient(135deg, #A8E6CF 0%, #7FCDCD 50%, #81C784 100%)",

          borderRadius: "20px",
        }}
      >
        <div className="text-left">
          Our mission is simple: make second-hand your first choice
        </div>
      </div>
    </div>
  );
};

export default OurMission;