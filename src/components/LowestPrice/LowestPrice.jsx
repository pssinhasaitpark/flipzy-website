import React from 'react';

const LowestPrice = () => {
  const features = [
    {
      icon: "📦",
      badge: "NEW",
      title: "10,000",
      subtitle: "ARRIVALS DAILY",
      bgColor: "#f3e8ff",
      textColor: "#8b5cf6",
      badgeColor: "#8b5cf6"
    },
    {
      icon: "💰",
      badge: null,
      title: "CASH ON DELIVERY",
      subtitle: "AVAILABLE",
      bgColor: "#dcfce7",
      textColor: "#16a34a",
      badgeColor: null
    },
    {
      icon: "📋",
      badge: null,
      title: "EASY RESELL",
      subtitle: "OR RETURN",
      bgColor: "#fce7f3",
      textColor: "#ec4899",
      badgeColor: null
    }
  ];

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="display-5 fw-normal text-dark mb-0">
            Buy Like-New Items at Lowest Prices
          </h1>
        </div>
        
        <div className="col-12">
          <div className="row justify-content-center align-items-center">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center">
                  <div 
                    className="feature-circle d-flex align-items-center justify-content-center position-relative me-3"
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    {feature.badge && (
                      <span 
                        className="badge-new position-absolute"
                        style={{ 
                          backgroundColor: feature.badgeColor,
                          color: 'white'
                        }}
                      >
                        {feature.badge}
                      </span>
                    )}
                    <span className="feature-icon">{feature.icon}</span>
                  </div>
                  
                  <div className="feature-text">
                    <h4 
                      className="mb-0 fw-bold"
                      style={{ color: feature.textColor, fontSize: '1.25rem' }}
                    >
                      {feature.title}
                    </h4>
                    <p 
                      className="mb-0 fw-bold"
                      style={{ color: feature.textColor, fontSize: '1.25rem' }}
                    >
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .feature-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        .feature-icon {
          font-size: 2rem;
        }
        
        .badge-new {
          top: -8px;
          right: -8px;
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: bold;
          letter-spacing: 0.5px;
        }
        
        .feature-text h4,
        .feature-text p {
          line-height: 1.2;
          letter-spacing: 0.5px;
        }
        
        h1 {
          font-weight: 400;
          color: #333;
          font-size: 2.5rem;
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }
          
          .feature-circle {
            width: 70px;
            height: 70px;
          }
          
          .feature-icon {
            font-size: 1.7rem;
          }
          
          .feature-text h4,
          .feature-text p {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 576px) {
          .d-flex {
            justify-content: flex-start !important;
          }
          
          .col-12.mb-4.mb-lg-0 {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default LowestPrice;