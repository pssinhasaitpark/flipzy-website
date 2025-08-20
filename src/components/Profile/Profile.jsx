import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileMenu from "./ProfileMenu";

const Profile = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    shop: "",
    gst: "",
    mobile: "",
    isManufacturer: false,
    notificationsEnabled: true,
  });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await dispatch(
          fetchModuleData({
            module_action: "user_profile",
            params: { user_id: "22" },
          })
        ).unwrap();
        const userData = response.data?.result;
        if (userData) {
          setFormData({
            name: userData.name || "",
            username: userData.user_name || "",
            shop: userData.shop_name || "",
            gst: userData.gst_number || "",
            mobile: userData.mobile || "",
            isManufacturer: userData.is_manufacturer === "1",
            notificationsEnabled: true,
          });
          if (userData.device_token) {
            localStorage.setItem("device_token", userData.device_token);
          }
        }
      } catch (err) {
        toast.error("Failed to fetch profile data!");
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
        module_action: "update_user_profile",
        params: {
          user_id: "22",
          gst_number: formData.gst,
          is_manufacturer: formData.isManufacturer ? "1" : "0",
          shop_name: formData.shop,
        },
      };
      await dispatch(fetchModuleData(payload)).unwrap();
      toast.success("Profile updated successfully!");
      localStorage.setItem("user_profile", JSON.stringify(formData));
    } catch (err) {
      toast.error("Failed to update profile!");
      console.error("Error updating profile:", err);
    }
  };

  if (loading.user_profile)
    return <div className="text-center py-5">Loading...</div>;
  if (error.user_profile)
    return (
      <div className="text-center py-5 text-danger">
        Error: {error.user_profile}
      </div>
    );

  return (
    <>
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
                      <img
                        src={data.user_profile?.result?.profile_pic}
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="fw-bold text-muted small">Post</div>
                        <div className="fs-5 fw-bold">
                          {data.user_profile?.result?.total_items || 0}
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="fw-bold text-muted small">Rating</div>
                        <div className="fs-5 fw-bold">
                          {data.user_profile?.result?.rating || 0}
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="fw-bold text-muted small">Viewed</div>
                        <div className="fs-5 fw-bold">
                          {data.user_profile?.result?.seen_count || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Edit Profile Form */}
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="card-title mb-0 fw-bold">
                        Profile Details:
                      </h6>
                    </div>
                    <div className="mb-3 d-flex">
                      <label className="form-label text-muted">
                        <span className="text-dark">Name: </span>
                      </label>
                      <div className="fs-6 fw-bold ms-2">{formData.name}</div>
                    </div>
                    <div className="mb-3 d-flex">
                      <label className="form-label text-muted">
                        <span className="text-dark">Username: </span>
                      </label>
                      <div className="fs-6 fw-bold ms-2">
                        {formData.username}
                      </div>
                    </div>
                    <div className="mb-3 d-flex">
                      <label className="form-label text-muted">
                        <span className="text-dark">Mobile: </span>
                      </label>
                      <div className="fs-6 fw-bold ms-2">{formData.mobile}</div>
                    </div>
                    {/* Manufacturer Toggle */}
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <span className="small text-muted">
                        Register as a manufacturer?
                      </span>
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
                    {/* Conditional Shop Field */}
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
                    {/* Conditional GST Field */}
                    {formData.isManufacturer && (
                      <div className="mb-3">
                        <label className="form-label text-muted">GST:</label>
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
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h6 className="card-title fw-bold mb-3">Settings:</h6>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <FaBell className="text-warning me-2" />
                        <span className="mx-2">
                          Enable/Disable Notification
                        </span>
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
                    <div className="list-group list-group-flush">
                      {/* <Link to="/payment-method">
                        <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                          <div className="d-flex align-items-center">
                            <FaCreditCard className="text-muted me-3" />
                            <span className="mx-2 text-dark">
                              Payment Method
                            </span>
                          </div>
                          <FaChevronRight className="text-muted" />
                        </div>
                      </Link>
                          <Link to="/update-warehouse">
                      <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                        <div className="d-flex align-items-center">
                            <FaWarehouse className="text-muted me-3" />
                            <span className="mx-2 text-dark">
                              Create/Update Warehouse
                            </span>
                        </div>
                        <FaChevronRight className="text-muted" />
                      </div>
                          </Link>
                          <Link to="/view-info">
                      <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                        <div className="d-flex align-items-center">
                            <FaInfoCircle className="text-muted me-3" />
                            <span className="mx-2 text-dark">
                              View More Info
                            </span>
                        </div>
                        <FaChevronRight className="text-muted" />
                      </div>
                          </Link>
                      <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                        <div className="d-flex align-items-center">
                          <FaGift className="text-success me-3" />
                          <div className="mx-2 text-success">
                            Refer & Earn ₹50! Refer & Invite your friend
                          </div>
                        </div>
                        <FaChevronRight className="text-muted" />
                      </div>
                      <div className="text-center mt-2">
                        <a
                          href="#"
                          className="text-success text-decoration-none small"
                        >
                          View my referrals
                        </a>
                      </div> */}
                                <ProfileMenu/>
                      {/* <Link to="/shipping">
                        <div className="d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                          <span className="mx-1 text-dark">Address</span>
                          <FaUsers className="text-muted" />
                        </div>
                      </Link> */}
                      {/* <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                        <span>Logout</span>
                        <FaSignOutAlt className="text-muted" />
                      </div> */}
                    </div>
          
                  </div>
                </div>
                {/* Save Button */}
                <div className="d-grid">
                  <button
                    className="btn btn-success btn-lg btn-block"
                    onClick={handleSaveProfile}
                    disabled={loading.update_user_profile}
                  >
                    {loading.update_user_profile ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
