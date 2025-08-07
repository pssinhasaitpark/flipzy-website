import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StatsCards = () => {
  const statsData = [
    {
      value: "500",
      description: "Cities are thriving"
    },
    {
      value: "10 Lakh+",
      description: "App downloads in India"
    },
    {
      value: "1.5 Lakh+",
      description: "Items listed every month"
    },
    {
      value: "4.5 ★",
      description: "Play Store Rating"
    }
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row g-3">
        {statsData.map((stat, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-3">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #A8E6CF 0%, #7FCDCD 50%, #81C784 100%)',
                borderRadius: '20px',
                minHeight: '140px'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center text-center p-4">
                <h2 
                  className="card-title mb-3 fw-bold"
                  style={{
                    fontSize: '2.2rem',
                    color: '#333',
                    fontWeight: '700'
                  }}
                >
                  {stat.value}
                </h2>
                <p 
                  className="card-text mb-0"
                  style={{
                    fontSize: '1rem',
                    color: '#555',
                    fontWeight: '500',
                    lineHeight: '1.2'
                  }}
                >
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;