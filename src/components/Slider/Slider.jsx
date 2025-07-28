import React from "react";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Slider.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const SliderComponent = ({ heading, items, seeDetails }) => {
  console.log("sdfsdfasfasd", items);

  return (
    <div>
      <Container className="my-5">
        <div className="row d-flex justify-content-between m-3">
          <h2 className="text-center mb-4">{heading}</h2>
          <Link to={`/seeall/${seeDetails}`}>
            <Button
              variant="outline-secondary"
              className="rounded-pill px-4 py-1 fw-medium text-secondary border-2 d-block"
              style={{
                fontSize: "1rem",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              See All
            </Button>
          </Link>
        </div>
        <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <Row className="flex-nowrap ml-2" style={{ flexWrap: "nowrap" }}>
            {items.map((product, idx) => (
              <div
                key={idx}
                className="mb-3"
                style={{
                  flex: "0 0 auto",
                  width: "190px",
                  marginRight: "16px",
                }}
              >
                <Card
                  className="h-100 w-100 border-0 position-relative"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Sold Badge */}
                  {/* <Badge
                  bg="secondary"
                  className="position-absolute top-0 start-0 m-2"
                  style={{ zIndex: 1 }}
                >
                  Sold
                </Badge> */}

                  {/* Image */}
                  <div
                    style={{
                      height: "220px",
                      width: "190px",
                      margin: "0px auto",
                      borderRadius: "10px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Card.Img
                      src={
                        product.product_slider_image[0]?.image ||
                        "https://via.placeholder.com/220x250"
                      }
                      style={{
                        // height: "100%",
                        // width: "150%",

                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Body */}
                  <Card.Body className="px-3 py-2">
                    <Card.Title
                      className="mb-1 text-black fw-bold"
                      style={{
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.product_name}
                    </Card.Title>
                    <Card.Text
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {/* Waist: {product.waist || "30 inches"} */}
                    </Card.Text>
                    <div className="d-flex align-items-center">
                      <span className="fw-bolder text-success me-2">
                        ₹{product.selling_price}
                      </span>
                      <span className="ml-2">
                        <strike
                          className="text-muted "
                          style={{ fontSize: "0.85rem" }}
                        >
                          ₹{product.mrp}
                        </strike>
                      </span>
                    </div>
                    <div className="pt-3">
                      <span className="fw-bolder text-black me-2">
                        {product.username}
                      </span>
                      <div className="d-flex mt-2">
                        {[...Array(4)].map((_, i) => (
                          <FaStar
                            key={i}
                            style={{
                              color: "green",
                              fontSize: "1rem",
                              marginRight: "3px",
                            }}
                          />
                        ))}
                        <FaRegStar
                          style={{
                            color: "grey",
                            fontSize: "1rem",
                            marginLeft: "3px",
                            stroke: "grey",
                            strokeWidth: "10",
                          }}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SliderComponent;
