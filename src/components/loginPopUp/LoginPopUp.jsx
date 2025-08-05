import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const LoginPopup = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleLogin = () => {
    if (mobileNumber.length >= 10) {
      alert(`Login initiated for: +91 ${mobileNumber}`);
      // Handle your login logic here
      onClose();
      setMobileNumber('');
    } else {
      alert('Please enter a valid mobile number');
    }
  };

  // Close popup when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1050
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-4 position-relative overflow-hidden shadow-lg"
        style={{ maxWidth: '400px', width: '90%' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle p-2 border-0"
          style={{ zIndex: 10 }}
        >
          <X size={20} />
        </button>

        {/* Header with logo */}
        <div className="text-center pt-4 pb-3">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#fbbf24'
              }}
            >
              <span className="text-dark fw-bold">T</span>
            </div>
            <span className="fs-5 fw-bold text-dark">TreeUp</span>
          </div>
          <p className="text-muted small fw-medium mb-0">India's #1 Online Resale Platform</p>
        </div>

        {/* Promotional banner */}
        <div
          className="mx-3 rounded-3 p-4 mb-4 position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(to right, #fef3c7, #fce7f3)'
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="flex-grow-1">
              <h6 className="fw-semibold text-dark mb-1">Log In & Get</h6>
              <div className="fs-4 fw-bold text-dark mb-2">₹20/- OFF</div>
              <div className="bg-white px-3 py-1 rounded-pill d-inline-block">
                <span className="small fw-medium text-dark">On 1st Order</span>
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-center ms-3 rounded-circle"
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(to bottom right, #f9a8d4, #ec4899)'
              }}
            >
              <div
                className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px' }}
              >
                <span style={{ fontSize: '24px' }}>👋</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="px-4 pb-4">
          <div className="mb-4">
            <div className="d-flex border rounded-3 overflow-hidden">
              <div className="px-3 py-3 bg-light border-end">
                <span className="text-muted fw-medium">+91</span>
              </div>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Mobile Number*"
                className="form-control border-0 shadow-none"
                style={{ outline: 'none' }}
              />
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="btn w-100 fw-semibold py-3 border-0 shadow-sm"
            style={{ backgroundColor: '#fbbf24', color: '#000' }}
          >
            Login
          </button>

          {/* Terms and privacy */}
          <div className="mt-3 text-center">
            <p className="small text-muted mb-0">
              We don't spam. By creating an account, you agree to{' '}
              <a href="#" className="text-primary text-decoration-none">
                TreeUp's Terms
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary text-decoration-none">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
