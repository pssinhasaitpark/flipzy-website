import React, { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import {
  DownloadQR,
  Footer,
  FooterBottom,
  Header,
} from "../../components/index";
const PaymentMethod = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showIFSC, setShowIFSC] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bankOptions = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "Bank of India",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBankSelect = (bank) => {
    setFormData((prev) => ({
      ...prev,
      bankName: bank,
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (
      !formData.bankName ||
      !formData.accountName ||
      !formData.accountNumber ||
      !formData.ifscCode
    ) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Payment method data:", formData);
    alert("Payment method added successfully!");
  };

  return (
    <>
      {" "}
      <div className="head mb-4">
        <Header />
      </div>
      <div className="container border p-5">
        {/* Bank Selection Dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label>Select Bank*</label>
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                width: "100%",
                padding: "12px 40px 12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "white",
                cursor: "pointer",
                display: "flex",

                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "14px",
                color: formData.bankName ? "#333" : "#999",
              }}
            >
              <span>{formData.bankName || "Select Bank Name"}</span>
              <ChevronDown
                size={20}
                style={{
                  color: "#666",
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </div>

            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {bankOptions.map((bank, index) => (
                  <div
                    key={index}
                    onClick={() => handleBankSelect(bank)}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      fontSize: "14px",
                      borderBottom:
                        index < bankOptions.length - 1
                          ? "1px solid #f0f0f0"
                          : "none",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f8f9fa")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "white")
                    }
                  >
                    {bank}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Account Name Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Account Name*
          </label>
          <input
            type="text"
            value={formData.accountName}
            onChange={(e) => handleInputChange("accountName", e.target.value)}
            placeholder="Account Name"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        {/* Account Number Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Account Number*
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showAccountNumber ? "text" : "password"}
              value={formData.accountNumber}
              onChange={(e) =>
                handleInputChange("accountNumber", e.target.value)
              }
              placeholder="Account Number"
              style={{
                width: "100%",
                padding: "12px 40px 12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <button
              type="button"
              onClick={() => setShowAccountNumber(!showAccountNumber)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#666",
              }}
            >
              {showAccountNumber ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* IFSC Code Input */}
        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            IFSC CODE*
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showIFSC ? "text" : "password"}
              value={formData.ifscCode}
              onChange={(e) =>
                handleInputChange("ifscCode", e.target.value.toUpperCase())
              }
              placeholder="IFSC CODE"
              style={{
                width: "100%",
                padding: "12px 40px 12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s ease",
                textTransform: "uppercase",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <button
              type="button"
              onClick={() => setShowIFSC(!showIFSC)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#666",
              }}
            >
              {showIFSC ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Add Payment Method Button */}
        <button
          onClick={handleSubmit}
          className="btn btn-lg text-light"
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Add Payment Method
        </button>
      </div>
      <div className="mt-5">
        <DownloadQR />
        <Footer />
        <FooterBottom />
      </div>
    </>
  );
};

export default PaymentMethod;
