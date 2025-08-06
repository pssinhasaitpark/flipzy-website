import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const OurMission = () => {
  return (
    <div>
      {/* Mission Section */}
      <Row className="justify-content-center mb-5">
        <Col lg={8} md={10}>
          <Card className="border-0 ">
            <Card.Body className="text-center py-5">
              <div className="mb-4">
                <h2 className="display-6 mb-3 text-black">Our Mission</h2>
                <div
                  className=" mx-auto  "
                  style={{
                    width: "60px",
                    height: "3px",
                    backgroundColor: "#ffd700",
                  }}
                ></div>
              </div>
              <h3
                className="h2 lh-lg mb-0 fw-bold"
                style={{
                  color: "#2c3e50",
                }}
              >
                We are building a sustainable future of commerce that's
                affordable, trendy & rewarding!
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Existing About Content */}
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <p className="fs-5 mb-4">
            Welcome to our About Us page! Here you can learn more about our
            mission, values, and the team behind our company.
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
      <div className=" d-flex justify-content-center  mb-5 bg-warning p-4 rounded">
        <div className="text-left">
          Adoption of a circular economy in India will result in yearly benefits
          of $624 billion by 2050<br></br> and a 44% reduction in greenhouse gas
          emissions.
        </div>
      </div>
    </div>
  );
};

export default OurMission;
