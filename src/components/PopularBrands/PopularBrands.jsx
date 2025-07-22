import React from 'react';

const PopularBrands = () => {
  const brands = [
    // First row
    [
      { name: 'ZARA', logo: 'ZARA' },
      { name: 'VERO MODA', logo: 'VERO MODA' },
      { name: 'BIBA', logo: '❋ BIBA' },
      { name: 'SHEIN', logo: 'SHEIN' },
      { name: 'FOREVER 21', logo: 'FOREVER 21' },
      { name: 'TOKYO TALKIES', logo: 'TOKYO TALKIES' },
      { name: 'H&M', logo: 'H&M' },
      { name: 'DRESSBERRY', logo: 'DRESSBERRY' }
    ],
    // Second row
    [
      { name: 'adidas', logo: 'adidas' },
      { name: 'MANGO', logo: 'MANGO' },
      { name: 'MAC', logo: 'MAC' },
      { name: 'Nike', logo: 'Nike' },
      { name: 'PUMA', logo: 'PUMA' },
      { name: 'fabindia', logo: 'fabindia' },
      { name: 'M&S', logo: 'M&S' },
      { name: 'MICHAEL KORS', logo: 'MICHAEL KORS' }
    ]
  ];

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 fw-bold">Popular brands, up to 90% off</h2>
          
          {brands.map((row, rowIndex) => (
            <div key={rowIndex} className="row mb-3">
              {row.map((brand, index) => (
                <div key={index} className="col-lg-1-5 col-md-3 col-sm-4 col-6 mb-3">
                  <div className="brand-card h-100 d-flex align-items-center justify-content-center p-3 border rounded-3 bg-white position-relative overflow-hidden">
                    <div className="brand-logo text-center">
                      {brand.name === 'H&M' ? (
                        <span className="fw-bold" style={{color: '#e50000', fontSize: '18px'}}>H&M</span>
                      ) : brand.name === 'adidas' ? (
                        <span className="fw-bold text-dark" style={{fontSize: '16px'}}>adidas</span>
                      ) : brand.name === 'Nike' ? (
                        <span className="fw-bold text-dark" style={{fontSize: '18px'}}>Nike</span>
                      ) : brand.name === 'PUMA' ? (
                        <span className="fw-bold text-dark" style={{fontSize: '16px'}}>PUMA</span>
                      ) : brand.name === 'fabindia' ? (
                        <span style={{color: '#d4342c', fontSize: '14px', fontStyle: 'italic'}}>fabindia</span>
                      ) : brand.name === 'MAC' ? (
                        <span className="fw-bold text-dark" style={{fontSize: '18px', fontStyle: 'italic'}}>MAC</span>
                      ) : brand.name === 'BIBA' ? (
                        <span style={{color: '#e50000', fontSize: '16px'}}>❋ BIBA</span>
                      ) : (
                        <span className="fw-normal text-dark" style={{fontSize: '14px'}}>{brand.logo}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .col-lg-1-5 {
          flex: 0 0 12.5%;
          max-width: 12.5%;
        }
        
        @media (max-width: 991.98px) {
          .col-lg-1-5 {
            flex: 0 0 25%;
            max-width: 25%;
          }
        }
        
        .brand-card {
          height: 80px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #e0e0e0 !important;
          background: #fff !important;
        }
        
        .brand-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-color: #007bff !important;
        }
        
        .brand-logo {
          width: 100%;
        }
        
        h2 {
          color: #333;
          font-size: 1.75rem;
        }
      `}</style>
    </div>
  );
};

export default PopularBrands;