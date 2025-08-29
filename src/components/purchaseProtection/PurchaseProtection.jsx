import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./PurchaseProtection.css";

const PurchaseProtection = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="p-4 border-0 shadow-sm">
            {/* Illustration Section */}
            <div className="text-center mb-4 position-relative">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundImage: "url('https://imgcdn.freeup.app/zorro/a7b1cece722d4a1afbc41feb1507e4f8.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                  padding: "20px",
                  height: "200px",
                  width: "100%",
                }}
              >
                {/* Buyer Illustration - Positioned absolutely */}
               
                {/* Shield Illustration - Positioned absolutely */}
               

                {/* Seller Illustration - Positioned absolutely */}
            
              </div>
            </div>

            {/* Guarantee Text */}
            <div className="text-center mb-4">
              <p className="fs-5">
                We guarantee full refund if the item was not accurately described by the seller, or is damaged in transit.
              </p>
            </div>

            {/* Options List */}
            <div className="text-start">
              <p className="fs-6">
                If you simply don’t like the item or fit, you can:
              </p>
              <ul className="fs-6">
                <li>
                  Resell it to other FreeUp members with a few clicks. It’s like you get a full refund once the item sells!
                </li>
                <li>
                  Return the item to seller by paying the standard shipping fee. Item’s full value will be refunded once it’s returned in the original condition.
                </li>
              </ul>
              <p className="fs-6 fw-bold">
                Any refund or return request should be raised within 2 days from order delivery.
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PurchaseProtection;
