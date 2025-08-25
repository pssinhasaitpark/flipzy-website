import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import {
  ShieldCheck,
  MapPin,
  CreditCard,
  Smartphone,
  Truck,
  X,
} from "lucide-react";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, updatedAddress } = location.state || {};
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  // State for the delivery address
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
  });

  // Fetch addresses on mount
  useEffect(() => {
    dispatch(fetchModuleData({ module_action: "getAddresses" }));
  }, [dispatch]);

  // Update delivery address when API data changes
  useEffect(() => {
    if (data.getAddresses?.result && Array.isArray(data.getAddresses.result)) {
      const defaultAddress = data.getAddresses.result.find(
        (addr) => addr.is_default_address === "1"
      );
      if (defaultAddress) {
        setDeliveryAddress({
          name: defaultAddress.name,
          phone: defaultAddress.mobile,
          address: `${defaultAddress.address}, ${defaultAddress.city}, ${defaultAddress.state} - ${defaultAddress.zip_code}`,
          landmark: defaultAddress.landmark,
        });
      }
    }
    // Update address if returned from /shipping
    if (updatedAddress) {
      setDeliveryAddress(updatedAddress);
    }
  }, [data.getAddresses, updatedAddress]);

  if (!product) {
    return (
      <Container className="text-center py-5">
        <h4>No product selected for checkout.</h4>
      </Container>
    );
  }

  const itemPrice = product.selling_price || 850;
  const convenienceFee = 26;
  const deliveryCharge = 40;
  const totalAmount = itemPrice + convenienceFee + deliveryCharge;

  const handleCheckoutConfirm = () => {
    navigate("/order-confirmation", { state: { product, deliveryAddress } });
  };

  return (<>
    {/* <Header /> */}
    <Container fluid className="py-5" style={{ maxWidth: "1000px" }}>
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#2c3e50" }}>
        Secure Checkout
      </h2>
      <Row className="g-4">
        {/* Left Column: Delivery and Product Info */}
        <Col lg={7}>
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <MapPin size={24} className="text-primary" />
                <h4 className="mb-0" style={{ color: "#2c3e50" }}>
                  Delivery Address
                </h4>
              </div>
              {loading.getAddresses ? (
                <div className="text-center">Loading address...</div>
              ) : error.getAddresses ? (
                <div className="text-center text-danger">{error.getAddresses}</div>
              ) : (
                <Card className="border-0 shadow-sm rounded-3 mb-3">
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1">{deliveryAddress.name}</h5>
                        <p className="mb-1 text-muted">{deliveryAddress.phone}</p>
                        <p className="mb-0 text-muted">
                          {deliveryAddress.address} <br />
                          {deliveryAddress.landmark}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}
              <Button
  onClick={() =>
    navigate("/shipping", {
      state: {
        product,
        currentAddress: deliveryAddress,
        fromCheckout: true, // <-- Add this flag
      },
    })
  }
  variant="outline-primary"
  className="rounded-pill px-4"
>
  Update Delivery Address
</Button>

            </Card.Body>
          </Card>
          {/* Rest of your component remains the same */}
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <Truck size={24} className="text-primary" />
                <h4 className="mb-0" style={{ color: "#2c3e50" }}>
                  Your Order
                </h4>
              </div>
              <Card className="border-0 shadow-sm rounded-3 mb-3">
                <Card.Body className="p-3">
                  <div className="d-flex gap-3">
                    <div className="d-flex position-relative">
                      <img
                        src={product.product_slider_image?.[0]?.image}
                        alt={product.product_name}
                        className="rounded-3"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <span className="position-absolute top-0 start-0 m-2 badge bg-danger rounded-pill">
                        47% OFF
                      </span>
                    </div>
                    <div className="d-flex flex-grow-1 justify-content-between align-items-start ml-3">
                      <div>
                        <h5 className="mb-1">{product.product_name}</h5>
                        <p className="mb-1 text-muted small">Naughty #{product.id}</p>
                        <h4 className="mb-0 fw-bold" style={{ color: "#2c3e50" }}>
                          ₹{itemPrice}
                        </h4>
                      </div>
                      <Button
                        variant="outline-light"
                        className="rounded-circle p-2"
                        style={{ border: "none" }}
                      >
                        <X size={18} className="text-muted" />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
        {/* Right Column: Price Breakdown and Payment */}
        <Col lg={5}>
          <Card className="border-0 shadow-sm rounded-4 sticky-top">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <CreditCard size={24} className="text-primary" />
                <h4 className="mb-0" style={{ color: "#2c3e50" }}>
                  Payment Summary
                </h4>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Item Price</span>
                  <span>₹{itemPrice}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Convenience Fee (3%)</span>
                  <span>₹{convenienceFee}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Charge</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <hr className="my-3" />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total Amount</span>
                  <span style={{ color: "#2c3e50", fontSize: "1.2rem" }}>
                    ₹{Number(itemPrice) + Number(convenienceFee) + Number(deliveryCharge)}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: "#2c3e50" }}>
                  Select Payment Method
                </h5>
                <Card className="border-0 shadow-sm rounded-3 mb-2">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light p-2 rounded-circle">
                        <Smartphone size={20} className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">PhonePe</h6>
                        <p className="mb-0 text-muted small">
                          UPI, Netbanking, Debit/Credit Card
                        </p>
                      </div>
                      <Form.Check
                        type="radio"
                        name="paymentMethod"
                        defaultChecked
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: "#2c3e50" }}>
                  Guarantees
                </h5>
                <Card className="border-0 shadow-sm rounded-3 mb-2">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-start gap-3">
                      <div className="bg-light p-2 rounded-circle">
                        <ShieldCheck size={20} className="text-primary" />
                      </div>
                      <div>
                        <h6 className="mb-1">Free Cancellation</h6>
                        <p className="mb-0 text-muted small">
                          Self-service instant refund anytime before the seller
                          arranges shipping.
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Card className="border-0 shadow-sm rounded-3">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-start gap-3">
                      <div className="bg-light p-2 rounded-circle">
                        <ShieldCheck size={20} className="text-primary" />
                      </div>
                      <div>
                        <h6 className="mb-1">Secure Payment</h6>
                        <p className="mb-0 text-muted small">
                          Your money is safe with us until you receive the item
                          and are satisfied.
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <Button
                className="w-100 py-3 rounded-pill fw-bold"
                style={{
                  backgroundColor: "#5cb85c",
                  border: "none",
                  fontSize: "1rem",
                }}
                onClick={handleCheckoutConfirm}
              >
                Confirm & Pay
                ₹{Number(itemPrice) + Number(convenienceFee) + Number(deliveryCharge)}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default CheckoutPage;
