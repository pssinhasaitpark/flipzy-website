import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OurImpact = () => {
  const impactData = [
    {
      icon: "💰",
      value: "₹1.3 Crores+",
      description: "Money saved with FreeUp Coins"
    },
    {
      icon: "👕",
      value: "1.8 Lakh+",
      description: "Items sold & found new home"
    },
    {
      icon: "🌿",
      value: "11.25 Lakhs+",
      description: "CO2 emissions avoided"
    }
  ];

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 
            className="display-4 fw-bold mb-4"
            style={{
              color: '#000',
              fontWeight: '700',
              fontSize: '3rem'
            }}
          >
            Our Impact
          </h1>
          <p 
            className="lead mx-auto"
            style={{
              maxWidth: '800px',
              fontSize: '1.1rem',
              color: '#333',
              lineHeight: '1.6'
            }}
          >
            We give a second life to millions of used clothes. We help you reduce carbon footprints, 
            clean out your closets and save money.
          </p>
        </div>
      </div>

      {/* Impact Cards */}
      <div className="row justify-content-center g-4">
        {impactData.map((impact, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="d-flex align-items-center">
              {/* Icon */}
              <div 
                className="flex-shrink-0 me-3 d-flex align-items-center justify-content-center"
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#F4E17B',
                  borderRadius: '12px',
                  fontSize: '2.5rem'
                }}
              >
                {impact.icon}
              </div>
              
              {/* Content */}
              <div className="flex-grow-1">
                <h3 
                  className="mb-1 fw-bold"
                  style={{
                    fontSize: '1.8rem',
                    color: '#333',
                    fontWeight: '700'
                  }}
                >
                  {impact.value}
                </h3>
                <p 
                  className="mb-0"
                  style={{
                    fontSize: '1rem',
                    color: '#666',
                    lineHeight: '1.3'
                  }}
                >
                  {impact.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurImpact;