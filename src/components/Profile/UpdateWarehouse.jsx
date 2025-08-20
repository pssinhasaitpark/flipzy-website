import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const WarehouseForm = () => {
  const [formData, setFormData] = useState({
    pickupLocationPincode: "",
    stateName: "",
    cityName: "",
    warehouseName: "",
    pickupLocationAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Handle cancel logic here
  };

  const handleUpdate = () => {
    console.log("Update clicked", formData);
    // Handle update logic here
  };

  return (
    <>
    
      <div
        className="container-fluid p-3"
        style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-sm border-0"
              style={{ borderRadius: "15px" }}
            >
              {/* Header */}
              <div className="card-header bg-white border-0 pt-4 pb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <div
                      className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <span className="text-muted">👤</span>
                    </div>
                  </div>
                  <div>
                    <h6
                      className="mb-0 text-muted"
                      style={{ fontSize: "14px" }}
                    >
                      Name:
                    </h6>
                    <h5 className="mb-0 fw-bold">Anvika Chouhan1</h5>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="card-body px-4 pb-4">
                <div className="bg-light rounded p-4">
                  <h5 className="text-danger mb-4 fw-bold">
                    Create/Update Warehouse
                  </h5>

                  <div>
                    {/* Pickup Location Pincode */}
                    <div className="mb-3">
                      <label
                        className="form-label text-success fw-semibold"
                        style={{ fontSize: "14px" }}
                      >
                        Pickup Location Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="pickupLocationPincode"
                        value={formData.pickupLocationPincode}
                        onChange={handleInputChange}
                        placeholder="452003"
                        style={{
                          borderRadius: "8px",
                          border: "2px solid #e9ecef",
                        }}
                      />
                    </div>

                    {/* State Name with Service Available badge */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label
                          className="form-label text-success fw-semibold mb-0"
                          style={{ fontSize: "14px" }}
                        >
                          State Name
                        </label>
                        <span
                          className="badge bg-success text-white px-3 py-1"
                          style={{ fontSize: "12px", borderRadius: "15px" }}
                        >
                          Service Available
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="stateName"
                        value={formData.stateName}
                        onChange={handleInputChange}
                        placeholder="Madhya Pradesh"
                        style={{
                          borderRadius: "8px",
                          border: "2px solid #e9ecef",
                        }}
                      />
                    </div>

                    {/* City Name */}
                    <div className="mb-3">
                      <label
                        className="form-label text-success fw-semibold"
                        style={{ fontSize: "14px" }}
                      >
                        City Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="cityName"
                        value={formData.cityName}
                        onChange={handleInputChange}
                        placeholder="Indore"
                        style={{
                          borderRadius: "8px",
                          border: "2px solid #e9ecef",
                        }}
                      />
                    </div>

                    {/* Warehouse Name */}
                    <div className="mb-3">
                      <label
                        className="form-label text-success fw-semibold"
                        style={{ fontSize: "14px" }}
                      >
                        Warehouse Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="warehouseName"
                        value={formData.warehouseName}
                        onChange={handleInputChange}
                        placeholder="anvika"
                        style={{
                          borderRadius: "8px",
                          border: "2px solid #e9ecef",
                        }}
                      />
                    </div>

                    {/* Enter Pickup Location Address */}
                    <div className="mb-4">
                      <label
                        className="form-label text-success fw-semibold"
                        style={{ fontSize: "14px" }}
                      >
                        Enter Pickup Location Address
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name="pickupLocationAddress"
                          value={formData.pickupLocationAddress}
                          onChange={handleInputChange}
                          placeholder="266 A Lake Palace Indore MP"
                          style={{
                            borderRadius: "8px 0 0 8px",
                            border: "2px solid #e9ecef",
                          }}
                        />
                        <span
                          className="input-group-text bg-white"
                          style={{
                            border: "2px solid #e9ecef",
                            borderLeft: "none",
                            borderRadius: "0 8px 8px 0",
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                              stroke="#dc3545"
                              strokeWidth="2"
                            />
                            <circle
                              cx="12"
                              cy="10"
                              r="3"
                              stroke="#dc3545"
                              strokeWidth="2"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="row g-3">
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100 py-3 fw-semibold"
                          onClick={handleCancel}
                          style={{ borderRadius: "10px", fontSize: "16px" }}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-success w-100 py-3 fw-semibold text-white"
                          onClick={handleUpdate}
                          style={{
                            borderRadius: "10px",
                            fontSize: "16px",
                            backgroundColor: "#28a745",
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default WarehouseForm;
