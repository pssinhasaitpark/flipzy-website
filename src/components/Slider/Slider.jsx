import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Slider.css";

const SliderComponent = ({ heading }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.api);
  const productData = data.products?.product || [];

  console.log("sdfsdfasfasd",productData)
  useEffect(() => {
    dispatch(fetchModuleData({ module_action: "products" }));
  }, [dispatch]);

  return (
    <Container className="my-5">
      <div className="row d-flex justify-content-between m-3">
        <h2 className="text-center mb-4">{heading}</h2>
        <Button
          variant="outline-secondary"
          className="rounded-pill px-4 py-1 fw-medium text-secondary border-2 d-block"
          style={{ fontSize: "1rem", marginTop: "10px", marginBottom: "10px" }}
        >
          See All
        </Button>
      </div>
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <Row className="flex-nowrap" style={{ flexWrap: "nowrap" }}>
          {productData.map((product, idx) => (
            <Col
              key={idx}
              xs={10}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
              style={{
                display: "inline-block",
                float: "none",
                maxWidth: "300px",
              }}
            >
              <Card className="h-100 d-flex flex-column">
                <Card.Img
                  variant="top"
                  src={product.product_slider_image[0]?.image || "https://via.placeholder.com/150"}
                  className="p-3"
                  style={{
                    height: "auto",
                    maxHeight: "200px",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    style={{
                      fontSize: "1.1rem",
                      whiteSpace: "normal",
                      overflowWrap: "break-word",
                    }}
                  >
                    {product.product_name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      flexGrow: 1,
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {product.product_detail}
                  </Card.Text>
                  <div className="d-flex">
                    <Card.Text
                      className="font-weight-bold px-2"
                      style={{ fontSize: "1rem" }}
                    >
                      ₹{product.selling_price}
                    </Card.Text>
                    <strike className="">₹{product.mrp}</strike>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default SliderComponent;
