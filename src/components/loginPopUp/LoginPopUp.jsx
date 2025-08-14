import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { logo } from "../../assets/index";
import OtpComponent from "../../components/otpComponent/OtpComponent";

const LoginPopup = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleLogin = () => {
    if (mobileNumber.length === 10) {
      setShowOtp(true);
    } else {
      alert("Please enter a valid mobile number");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {!showOtp ? (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white rounded-4 position-relative overflow-hidden shadow-lg"
            style={{ maxWidth: "500px", height: "550px", width: "90%" }}
          >
            <button
              onClick={onClose}
              className="position-absolute btn btn-light rounded-circle p-2 border-0"
              style={{ right: "15px", top: "10px", zIndex: 10 }}
            >
              <X size={20} />
            </button>
            <div className="text-center pt-5 pb-3">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <img src={logo} alt="" className="w-25" />
              </div>
              <p className="text-muted small fw-medium mb-0">
                India's #1 Online Resale Platform
              </p>
            </div>
            <div
              className="mx-3 rounded-3 p-4 mb-4 position-relative overflow-hidden"
              style={{
                background: "linear-gradient(to right, #fef3c7, #fce7f3)",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="flex-grow-1">
                  <h6 className="fw-semibold text-dark mb-1">Log In & Get</h6>
                  <div className="fs-4 fw-bold text-dark mb-2">₹20/- OFF</div>
                  <div className="bg-white px-3 py-1 rounded-pill d-inline-block">
                    <span className="small fw-medium text-dark">
                      On 1st Order
                    </span>
                  </div>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center ms-3 rounded-circle"
                  style={{
                    width: "80px",
                    height: "80px",
                    background:
                      "linear-gradient(to bottom right, #f9a8d4, #ec4899)",
                  }}
                >
                  <div
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <span style={{ fontSize: "24px" }}>👋</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="mb-4">
                <div className="d-flex border rounded-3 overflow-hidden">
                  <div className="px-3 py-3 bg-light border-end">
                    <span className="text-muted fw-medium">+91</span>
                  </div>
                  <div className="px-2 py-2">
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) =>
                        setMobileNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      placeholder="Mobile Number*"
                      className="form-control border-0 shadow-none"
                      style={{ outline: "none" }}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="btn btn-success w-100 fw-semibold py-3 pt-2 border-0 shadow-sm"
              >
                Login
              </button>
              <div className="mt-3 text-center pt-4">
                <p className="small text-muted mb-0">
                  We don't spam. By creating an account, you agree to{" "}
                  <a href="#" className="text-primary text-decoration-none">
                    Terms and Condition
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary text-decoration-none">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OtpComponent
          mobileNumber={mobileNumber}
          onClose={() => {
            setShowOtp(false);
            onClose();
          }}
          onResend={() => alert("OTP resent!")}
          onVerify={(otp) => {
            alert(`OTP entered: ${otp}`);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default LoginPopup;
