import React, { useState } from "react";
import { BoxLogo } from "../../assets/index";

import { X } from "lucide-react";

const OtpComponent = ({ mobileNumber, onClose, onResend, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100  d-flex justify-content-center"
      style={{ zIndex: 1050 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-4 position-relative overflow-hidden shadow-lg p-4"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <button
          onClick={onClose}
          className="position-absolute btn btn-light rounded-circle p-2 border-0"
          style={{ right: "15px", top: "10px", zIndex: 10 }}
        >
          <X size={20} />
        </button>
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <img src={BoxLogo} alt="Flipzy Logo" className="w-25" />
          </div>
          <h5 className="fw-bold">Enter the OTP sent to</h5>
          <p className="text-muted">+91 {mobileNumber}</p>
        </div>
        <div className="d-flex justify-content-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="form-control text-center rounded-3 m-2"
              style={{ width: "50px", height: "50px" }}
            />
          ))}
        </div>
        <div className="text-center mb-3">
          <button
            className="btn btn-link text-decoration-none"
            onClick={onResend}
          >
            Didn't receive OTP? <u>Send again</u>
          </button>
        </div>
        <button
          onClick={() => onVerify(otp.join(""))}
          className="btn btn-success w-100 fw-semibold py-3 border-0 shadow-sm"
          
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OtpComponent;
