import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Import your images
import img1 from "../../assets/images/card1.png";
import img2 from "../../assets/images/card2.png";
import img3 from "../../assets/images/xard3.png";

function ThreeCards() {
  // Array of card data
  const cardData = [
    { title: "", text: "", image: img1 },
    { title: "", text: "", image: img2 },
    { title: "", text: "", image: img3 },
  ];

  return (
    <Container className="my-4 mt-5 pt-2">
      <Row className="g-4 justify-content-center border-0">
        {cardData.map((card, index) => (
          <Col xs={12} md={6} lg={4} key={index}>
            <Card className="border-0 w-100 p-lg-0 p-3 pt-1">
              <Card.Img variant="top" src={card.image} />
              {/* <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                
              </Card.Body> */}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ThreeCards;
