import React, { useState } from "react";
import {
  FaUmbrella,
  FaBell,
  FaCreditCard,
  FaWarehouse,
  FaInfoCircle,
  FaGift,
  FaChevronRight,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Profile.css";
import { Link } from "react-router-dom";
const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Anvika Chouhan1",
    username: "anvika",
    shop: "FlipzyStore",
    gst: "",
    mobile: "9752560248",
    isManufacturer: true,
    notificationsEnabled: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveProfile = () => {
    console.log("Profile saved:", formData);
    alert("Profile saved successfully!");
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="row g-4">
            {/* Left Column - Profile Info */}
            <div className="col-12 col-md-6">
              {/* Profile Header Card */}
              <div className="card shadow-sm mb-4">
                <div className="card-body text-center">
                  <div className="position-relative d-inline-block mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)",
                        position: "relative",
                      }}
                    >
                      <div
                        className="rounded-circle bg-dark d-flex align-items-center justify-content-center"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <FaUmbrella className="text-white" style={{ fontSize: "1.5rem" }} />
                      </div>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="fw-bold text-muted small">Post</div>
                      <div className="fs-5 fw-bold">8</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-muted small">Rating</div>
                      <div className="fs-5 fw-bold">0</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-muted small">Viewed</div>
                      <div className="fs-5 fw-bold">80</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Edit Profile Form */}
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="card-title mb-0 fw-bold">Edit Your Name:</h6>
                    <a href="#" className="text-decoration-none text-muted small">
                      Admin Access
                    </a>
                  </div>
                  <div className="mb-3 d-flex">
                    <label className="form-label text-muted">
                      <span className="text-dark">Name*: </span>
                    </label>
                    <div className="fs-1 fw-bold mx-2">{formData.name}</div>
                  </div>
                  <div className="mb-3 d-flex">
                    <label className="form-label text-muted">
                      <span className="text-dark">Username*: </span>
                    </label>
                    <div className="fs-1 fw-bold mx-2">{formData.username}</div>
                  </div>
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <span className="small text-muted">Register as a manufacturer?</span>
                    <label className="switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isManufacturer"
                        checked={formData.isManufacturer}
                        onChange={handleInputChange}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  {formData.isManufacturer && (
                    <div className="mb-3">
                      <label className="form-label text-muted">
                        <span className="text-dark">Shop*: </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="shop"
                        value={formData.shop}
                        onChange={handleInputChange}
                        placeholder="Enter Shop Name"
                      />
                    </div>
                  )}
                  {formData.isManufacturer && (
                    <div className="mb-3">
                      <label className="form-label small text-muted">GST:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="gst"
                        value={formData.gst}
                        onChange={handleInputChange}
                        placeholder="Enter GST Number"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Right Column - Settings */}
            <div className="col-12 col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title fw-bold mb-3">Edit Your Contact:</h6>
                  <div className="mb-3 d-flex">
                    <label className="form-label text-muted">
                      <span className="text-dark">Mobile:</span>
                    </label>
                    <div className="fs-1 fw-bold mx-2">{formData.mobile}</div>
                  </div>
                </div>
              </div>
              <div className="card shadow-sm mb-4 mt-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <FaBell className="text-warning me-2 " />
                      <span className="mx-2">Enable/Disable Notification</span>
                    </div>
                    <div className="form-check form-switch">
                      <label className="switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData.notificationsEnabled}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              notificationsEnabled: e.target.checked,
                            }))
                          }
                          style={{
                            backgroundColor: formData.notificationsEnabled
                              ? "#20c997"
                              : "#6c757d",
                          }}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                  {/* Menu Items */}
                  <div className="list-group list-group-flush ">
                    <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom ">
                      <div className="d-flex align-items-center">
                          <Link to="/payment-method" >
                        <FaCreditCard className="text-muted me-3" />
                         <span className="mx-2 text-dark">Payment Method</span></Link>
                      </div>
                      <FaChevronRight className="text-muted" />
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom ">
                      <div className="d-flex align-items-center">
                        <FaWarehouse className="text-muted me-3" />
                       <span className="mx-2">Create/Update Warehouse</span>
                      </div>
                      <FaChevronRight className="text-muted" />
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <FaInfoCircle className="text-muted me-3" />
                   <span className="mx-2">View More Info</span>
                      </div>
                      <FaChevronRight className="text-muted" />
                    </div>
                     <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <FaGift className="text-success me-3" />
                   <div className="mx-2 text-success">Refer & Earn ₹50! Refer & Invite your friend</div>
                   <div className="mx-5">234234234</div>
                   
                      </div>
                      <FaChevronRight className="text-muted" />
                    </div>
                    
                    
                    <div className="text-center mt-2">
                      <a href="#" className="text-success text-decoration-none small">
                        View my referrals{" "}
                      </a>
                    </div>
                  
                    <Link to="/shipping" >  <div className="d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                      <span className="mx-1 text-dark">Address</span>
                      <FaUsers className="text-muted" />
                    </div></Link>
                    <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                      <span>Logout</span>
                      <FaSignOutAlt className="text-muted" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Save Button */}
              <div className="d-grid">
                <button className="btn btn-success btn-lg btn-block" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
