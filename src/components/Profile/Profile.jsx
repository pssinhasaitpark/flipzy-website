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
    // Additional fields needed for the API
    address: "",
    landmark: "",
    pinCode: "",
    profilePic: "",
    gender: "0",
    walletAmount: "0",
    appVersion: "1.38",
    deviceType: "0",
    deviceToken: "",
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
            // Set additional fields from API response
            address: userData.address || "",
            landmark: userData.landmark || "",
            pinCode: userData.pin_code || "",
            profilePic: userData.profile_pic || "",
            gender: userData.gender || "0",
            walletAmount: userData.wallet_amount || "0",
            appVersion: "1.38", // Static value as per your example
            deviceType: "0", // Static value as per your example
            deviceToken: userData.device_token || "",
          });

          // Store device token in localStorage if available
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
      // Get device token from localStorage if not already in formData
      const storedDeviceToken =
        localStorage.getItem("device_token") || formData.deviceToken;

      const payload = {
        module_action: "update_profile",
        params: {
          user_id: "22",
          name: formData.name,
          user_name: formData.username,
          mobile: formData.mobile,
          address: formData.address,
          landmark: formData.landmark,
          pin_code: formData.pinCode,
          profile_pic: formData.profilePic,
          shop_name: formData.shop,
          gst_number: formData.gst,
          is_manufacturer: formData.isManufacturer ? "1" : "0",
          gender: formData.gender,
          wallet_amount: formData.walletAmount,
          app_version: formData.appVersion,
          device_type: formData.deviceType,
          device_token: storedDeviceToken,
        },
      };

      console.log("Saving profile with payload:", payload);

      const response = await dispatch(fetchModuleData(payload)).unwrap();

      toast.success("Profile updated successfully!");

      // Update localStorage with the updated profile data
      localStorage.setItem("user_profile", JSON.stringify(formData));

      console.log("Profile update response:", response);
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
                        src={
                          formData.profilePic ||
                          data.user_profile?.result?.profile_pic
                        }
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

                    {/* Additional fields for address information */}
                    <div className="mb-3 d-flex">
                      <label className="form-label text-muted">
                        <span className="text-dark">Address: </span>
                      </label>
                      <div className="fs-6 fw-bold ms-2">
                        {formData.address}
                      </div>
                    </div>

                    <div className="mb-3 d-flex">
                      <label className="form-label text-muted">
                        <span className="text-dark">Landmark: </span>
                      </label>
                      <div className="fs-6 fw-bold ms-2">
                        {formData.landmark}
                      </div>
                    </div>

                    <div className="mb-3 d-flex">
                      <label className="form-label text-muted">
                        <span className="text-dark">Pin Code: </span>
                      </label>
                      <div className="fs-6 fw-bold ms-2">
                        {formData.pinCode}
                      </div>
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
                      <ProfileMenu />
                    </div>
                  </div>
                </div>
                {/* Save Button */}
                <div className="d-grid">
                  <button
                    className="btn btn-success btn-lg btn-block"
                    onClick={handleSaveProfile}
                    disabled={loading.update_profile}
                  >
                    {loading.update_profile ? (
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
