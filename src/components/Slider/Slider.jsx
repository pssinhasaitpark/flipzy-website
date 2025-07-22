import React from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SliderComponent = ({ heading, items }) => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">{heading}</h2>
      <Carousel>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {item.map((product, idx) => (
                <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Card className="h-100">
                    <Card.Img variant="top" src={product.image} className="p-3" style={{ height: '200px', objectFit: 'contain' }} />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        {product.description}
                      </Card.Text>
                      <Card.Text className="font-weight-bold">
                        {product.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default SliderComponent;
