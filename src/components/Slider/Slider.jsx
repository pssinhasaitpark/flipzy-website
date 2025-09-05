import React, { useMemo } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Slider.css";

const SliderComponent = ({ heading, items, seeDetails }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate a random starting index and rearrange items
  const shuffledItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    
    // Generate random starting index
    const randomStart = Math.floor(Math.random() * items.length);
    
    // Rearrange array starting from random index
    return [...items.slice(randomStart), ...items.slice(0, randomStart)];
  }, [items]);

  return (
    <Container className="my-5">
      <div className="row d-flex justify-content-between align-items-center mx-1 mx-md-3">
        <div className="col-auto">
          <h2 className="text-center text-md-start mb-2 mb-md-4">{heading}</h2>
        </div>
        <div className="col-auto">
          <Link
            to={`/seeall/${seeDetails}`}
            onClick={() => {
              scrollToTop();
            }}
            className="text-decoration-none"
          >
            <Button
              variant="outline-secondary"
              className="rounded-pill px-3 px-md-4 py-1 fw-medium text-secondary border-2"
              style={{
                fontSize: "0.9rem",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              See All
            </Button>
          </Link>
        </div>
      </div>
      
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <Row className="flex-nowrap" style={{ flexWrap: "nowrap", marginLeft: "8px", marginRight: "8px" }}>
          {shuffledItems.map((product, idx) => {
            // Calculate original index for unique key
            const originalIndex = items.findIndex(item => item.id === product.id);
            
            return (
              <div
                key={`${product.id}-${originalIndex}`}
                className="mb-3"
                style={{ 
                  flex: "0 0 auto", 
                  width: "160px", 
                  marginRight: "12px"
                }}
              >
                <Card
                  className="h-100 w-100 border-0 position-relative"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      height: "180px",
                      width: "160px",
                      margin: "0 auto",
                      borderRadius: "10px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Link
                      to={{
                        pathname: `/cartDetails/${encodeURIComponent(
                          product.product_name
                        )}/${product.id}`,
                      }}
                      state={{ product }}
                      onClick={() => {
                        scrollToTop();
                        console.log(
                          "Clicked Product:",
                          product.product_name,
                          "| ID:",
                          product.id
                        );
                      }}
                    >
                      <Card.Img
                        src={
                          product.product_slider_image[0]?.image ||
                          "https://via.placeholder.com/180x180"
                        }
                        style={{ objectFit: "cover", height: "100%", width: "100%" }}
                      />
                    </Link>
                  </div>
                  
                  <Card.Body className="px-2 py-2">
                    <Card.Title
                      className="mb-1 text-black fw-bold"
                      style={{
                        fontSize: "0.8rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.product_name}
                    </Card.Title>
                    
                    <div className="d-flex align-items-center mb-2">
                      <span className="fw-bolder text-success me-2" style={{ fontSize: "0.9rem" }}>
                        ₹{product.selling_price}
                      </span>
                      <span>
                        <strike
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          ₹{product.mrp}
                        </strike>
                      </span>
                    </div>
                    
                    <div>
                      <span 
                        className="fw-bolder text-black"
                        style={{ 
                          fontSize: "0.75rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "block"
                        }}
                      >
                        {product.username}
                      </span>
                      <div className="d-flex mt-1">
                        {[...Array(4)].map((_, i) => (
                          <FaStar
                            key={i}
                            style={{
                              color: "green",
                              fontSize: "0.8rem",
                              marginRight: "2px",
                            }}
                          />
                        ))}
                        <FaRegStar
                          style={{
                            color: "grey",
                            fontSize: "0.8rem",
                            marginLeft: "2px",
                          }}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </Row>
      </div>
    </Container>
  );
};

export default SliderComponent;