// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Cards.css'; // Create this CSS file for custom styles
// import abc from "../../assets/images/abc.png"
// function CustomCard() {
//   return (
//     <Card style={{ width: '18rem', position: 'relative' }}>
//       <Card.Img variant="top" src={abc}/>
//       <Card.Body className="card-body-overlay">
//         <Card.Title>Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default CustomCard;
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import abc from "../../assets/images/abc.png";
const StepCards = () => {
  const steps = [
    {
      id: 1,
      img: abc,
      title: "List in 30 Seconds",
    },
    {
      id: 2,
      img: abc,
      title: "Doorstep Pickup, Deliver all over India",
    },
    {
      id: 3,
      img: abc,
      title: "Easy & Safe Payments",
    },
  ];

  return (
    <div className="d-flex justify-content-center gap-3 p-3">
      {steps.map((step) => (
        <div
          key={step.id}
          className="text-center border rounded p-2"
          style={{ width: "180px", backgroundColor: "#fff" }}
        >
          <div className="position-relative">
            <img
              src={step.img}
              alt={`Step ${step.id}`}
              className="img-fluid rounded"
              style={{ height: "110px", width: "100%", objectFit: "cover" }}
            />
            <div
              className="position-absolute card-body-overlay top-0 start-0 bg-light rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "30px",
                height: "30px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                border: "1.5px solid #000",
                transform: "translate(10%, -30%)",
              }}
            >
              {step.id}
            </div>
          </div>
          <div
            className="mt-2"
            style={{ fontWeight: "600", fontSize: "0.9rem", color: "#222" }}
          >
            {step.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepCards;
