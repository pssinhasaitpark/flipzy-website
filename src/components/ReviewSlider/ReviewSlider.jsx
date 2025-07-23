import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Card, Row, Col } from "react-bootstrap";
import "./ReviewSlider.css";

// EXAMPLE DATA
const reviews = [
  {
    user: "sharu111",
    action: "accepted offer on",
    item: "Whole Korean Outfit",
    time: "1 hour ago",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    user: "jehika257",
    action: "followed",
    item: "@isa_collections",
    time: "2 hour ago",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    user: "shyju",
    action: "made an offer on",
    item: "Peacock Showcase Decor",
    time: "2 hour ago",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
  },
];

// Review Card Component
function ReviewCard({ review }) {
  return (
    <Card className="mb-2 border-0 shadow-sm" style={{ background: "#fff8e8" }}>
      <Card.Body
        className="d-flex align-items-center"
        style={{ padding: "0.5rem" }}
      >
        <img
          src={review.avatar}
          alt="avatar"
          className=" me-3 mx-3 align-items-center rounded-circle review-image"
         
        />
        <div>
          <div>
            <strong>@{review.user}</strong> {review.action}
            <span className="fw-bold ms-1">{review.item}</span>
          </div>
          <small className="text-muted">{review.time}</small>
        </div>
      </Card.Body>
    </Card>
  );
}

// Vertical Carousel Component
function ReviewSlider({ reviews }) {
  return (
    <Carousel
      axis="vertical"
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={2500}
      swipeable
      emulateTouch
      showIndicators={false}
      showArrows={false}
      className="vertical-slider"
      stopOnHover={false}
    >
      {reviews.map((review, idx) => (
        <div key={idx}>
          <ReviewCard review={review} />
        </div>
      ))}
    </Carousel>
  );
}

// Main Community Section Component
export default function CommunitySection() {
  return (
    <div className="container mt-5">
      <Row className="align-items-center">
        {/* Left Side: Image and Reviews */}
        <Col
          md={6}
          className="mb-4 mb-md-0 d-flex flex-column align-items-center"
        >
          <img
            src="https://images.pexels.com/photos/5794221/pexels-photo-5794221.jpeg?auto=compress&w=600"
            style={{
              width: "100% ",
              borderRadius: 18,
              maxHeight: 220,
              objectFit: "cover",
            }}
            alt="community"
          />
          <div style={{ marginTop: "-1.2rem", width: "90%" }}>
            <ReviewSlider reviews={reviews} />
          </div>
        </Col>
        {/* Right Side: Text */}
        <Col md={6} className="text-center text-md-start">
          <div
            style={{
              fontSize: 38,
              color: "#cda40d",
              fontWeight: "bolder",
              lineHeight: "1",
            }}
          >
            &ldquo;
          </div>
          <h6 className="fw-bold mt-3">Discover the community</h6>
          <div style={{ fontSize: 15, color: "#444" }}>
            FreeUp connects you to people with unique items and similar
            interests. You can talk to each other and get custom deals you won’t
            find anywhere else!
          </div>
        </Col>
      </Row>
    </div>
  );
}

// --- Optionally, in App.js ---
// import CommunitySection from './ReviewSlider';
// function App() { return <CommunitySection />; }
// export default App;
