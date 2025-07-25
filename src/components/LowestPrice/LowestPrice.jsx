import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LowestPrice = () => {
  return (
    <Container className="my-5 pt-3">
      <div className="text-center mb-5">
        <h1 className="display-5 text-black mb-0">
          Buy Like-New Items at Lowest Prices
        </h1>
      </div>

      <Row>
        <Col lg={4} md={6} sm={12} className="mb-4">
          <Card className="border-0">
            <Card.Img
              className="p-4"
              variant="top"
              src="https://imgs.justfreeup.com/zorro/51ea11011a70e54628553d660a9657d1.png"
            />
            {/* <Card.Body>
              <Card.Title>Card Title 1</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title.
              </Card.Text>
            </Card.Body> */}
          </Card>
        </Col>

        <Col lg={4} md={6} sm={12} className="mb-4">
          <Card className="border-0">
            <Card.Img
              className="p-4"
              variant="top"
              src="https://imgs.justfreeup.com/zorro/aa46796f588150fc43212b9d5101ff62.png"
            />
            {/* <Card.Body>
              <Card.Title>Card Title 2</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title.
              </Card.Text>
            </Card.Body> */}
          </Card>
        </Col>

        <Col lg={4} md={6} sm={12} className="mb-4">
          <Card className="border-0">
            <Card.Img
              variant="top"
              className="p-4"
              src="https://imgs.justfreeup.com/zorro/51ea11011a70e54628553d660a9657d1.png"
            />
            {/* <Card.Body>
              <Card.Title>Card Title 3</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title.
              </Card.Text>
            </Card.Body> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LowestPrice;
