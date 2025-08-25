import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Edit2,
  Save,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  Wallet,
  Package,
  Eye,
  Store,
} from "lucide-react";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = ({ userId = "22" }) => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await dispatch(
        fetchModuleData({
          module_action: "user_profile",
          params: { user_id: userId },
        })
      ).unwrap();

      if (response.data?.result) {
        setProfileData(response.data.result);
        setEditedData(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch profile data");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...profileData });
  };

  const handleSave = async () => {
    try {
      // Prepare the data to send to the API
      const updateData = {
        address: editedData.address || "",
        app_version: "1.38", // You may want to make this dynamic
        device_token:
          "c1hvyToeTRe3wTtYqkR7kA:APA91bFEgvjUJi1wPbP8JbHWszC2VrKT8kovodWTQpC-8yUOt6UIMet0r7LvvgK4nmcFhCtpPffDIUcZhrd-QCSaIlfkdYxFGfOscJvISGpJu0r38g9Zkmo", // You may want to make this dynamic
        device_type: "0", // You may want to make this dynamic
        gender: editedData.gender || "0",
        is_manufacturer: editedData.is_manufacturer || "0",
        landmark: editedData.landmark || "",
        mobile: editedData.mobile || "",
        name: editedData.name || "",
        pin_code: editedData.pin_code || "",
        profile_pic: editedData.profile_pic || "",
        shop_name: editedData.shop_name || "",
        user_id: userId,
        user_name: editedData.user_name || "",
        wallet_amount: editedData.wallet_amount || "0",
        email: editedData.email || "",
        city: editedData.city || "",
        about_me: editedData.about_me || "",
        gst_number: editedData.gst_number || "",
      };

      const response = await dispatch(
        fetchModuleData({
          module_action: "update_profile",
          params: updateData,
        })
      ).unwrap();
      console.log("Full response:", response);
      if (response.data.message || response.data.message === "success") {
        // Update the local state with the edited data
        setProfileData({ ...editedData });
        setIsEditing(false);
        toast.success("Profile updated successfully!");

        // Optionally refresh the profile data from server
        // await fetchProfile();
      } else {
        console.log("Profile Data:", response.success);
        console.log("Profile Data2:", response.status);
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getGenderText = (gender) => {
    switch (gender) {
      case "0":
        return "Female";
      case "1":
        return "Male";
      case "2":
        return "Other";
      default:
        return "Not specified";
    }
  };

  if (loading?.user_profile || loading?.update_profile) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">
            {loading?.update_profile
              ? "Updating profile..."
              : "Loading profile..."}
          </p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">No profile data available</div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center border-bottom">
              <h4 className="mb-0 fw-bold text-primary">User Profile</h4>
              {!isEditing ? (
                <button
                  className="btn btn-outline-primary btn-sm "
                  onClick={handleEdit}
                >
                  <Edit2 size={16} className="mr-1" />
                  Edit Profile
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm mr-3"
                    onClick={handleSave}
                    disabled={loading?.update_profile}
                  >
                    <Save size={16} className="mb-1 mr-1" />
                    {loading?.update_profile ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleCancel}
                    disabled={loading?.update_profile}
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="card-body p-4">
              {/* Profile Picture and Basic Info */}
              <div className="text-center mb-5">
                <div className="position-relative d-inline-block mb-3">
                  <img
                    src={profileData.profile_pic || "/api/placeholder/120/120"}
                    alt="Profile"
                    className="rounded-circle border border-3 border-primary shadow-sm"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h3 className="mt-3 mb-1 fw-bold text-dark">
                  {profileData.name}
                </h3>
                <p className="text-muted mb-0 fs-6">@{profileData.user_name}</p>
              </div>

              {/* Profile Information */}
              <div className="row g-4">
                {/* Personal Information Section */}
                <div className="col-12">
                  <h5 className="text-primary fw-bold mb-3 border-bottom pb-2">
                    Personal Information
                  </h5>
                </div>

                {/* Name */}
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px" }}
                    >
                      <User size={16} className="mr-1 text-primary" />
                      <label className="form-label fw-bold text-secondary mb-0">
                        Full Name:
                      </label>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control ms-3"
                        value={editedData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    ) : (
                      <span className="text-dark ms-3">{profileData.name}</span>
                    )}
                  </div>
                </div>

                {/* Username */}
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px" }}
                    >
                      <User size={16} className="mr-1 text-primary" />
                      <label className="form-label fw-bold text-secondary mb-0">
                        Username:
                      </label>
                    </div>
                    {isEditing ? (
                      <div className="ms-3 flex-grow-1">
                        <input
                          type="text"
                          className="form-control"
                          value={profileData.user_name}
                          disabled
                          style={{
                            backgroundColor: "#f8f9fa",
                            cursor: "not-allowed",
                          }}
                        />
                        <small className="text-muted">Cannot be changed</small>
                      </div>
                    ) : (
                      <span className="text-dark ms-3">
                        {profileData.user_name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Mobile */}
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px" }}
                    >
                      <Phone size={16} className="mr-1 text-primary" />
                      <label className="form-label fw-bold text-secondary mb-0">
                        Mobile:
                      </label>
                    </div>
                    {isEditing ? (
                      <div className="ms-3 flex-grow-1">
                        <input
                          type="text"
                          className="form-control"
                          value={`+91 ${profileData.mobile}`}
                          disabled
                          style={{
                            backgroundColor: "#f8f9fa",
                            cursor: "not-allowed",
                          }}
                        />
                        <small className="text-muted">Cannot be changed</small>
                      </div>
                    ) : (
                      <span className="text-dark ms-3">
                        +91 {profileData.mobile}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px" }}
                    >
                      <Mail size={16} className="mr-1 text-primary" />
                      <label className="form-label fw-bold text-secondary mb-0">
                        Email:
                      </label>
                    </div>
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control ms-3"
                        value={editedData.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter email address"
                      />
                    ) : (
                      <span className="text-dark ms-3">
                        {profileData.email || (
                          <span className="text-muted">Not provided</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px" }}
                    >
                      <label className="form-label fw-bold text-secondary mb-0">
                        Gender:
                      </label>
                    </div>
                    {isEditing ? (
                      <select
                        className="form-select ms-3"
                        value={editedData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                      >
                        <option value="0">Female</option>
                        <option value="1">Male</option>
                        <option value="2">Other</option>
                      </select>
                    ) : (
                      <span className="text-dark ms-3">
                        {getGenderText(profileData.gender)}
                      </span>
                    )}
                  </div>
                </div>

                {/* City */}
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px" }}
                    >
                      <label className="form-label fw-bold text-secondary mb-0">
                        City:
                      </label>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control ms-3"
                        value={editedData.city || ""}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="Enter city"
                      />
                    ) : (
                      <span className="text-dark ms-3">
                        {profileData.city || (
                          <span className="text-muted">Not specified</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="col-12 mt-4">
                  <h5 className="text-primary fw-bold mb-3 border-bottom pb-2">
                    Address Information
                  </h5>
                </div>

                {/* Address */}
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-start">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px", marginTop: "6px" }}
                    >
                      <MapPin size={16} className="mr-1 text-primary" />
                      <label className="form-label fw-bold text-secondary mb-0">
                        Address:
                      </label>
                    </div>
                    {isEditing ? (
                      <textarea
                        className="form-control ms-3"
                        rows="2"
                        value={editedData.address || ""}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Enter address"
                      />
                    ) : (
                      <span
                        className="text-dark ms-3"
                        style={{ lineHeight: "1.5" }}
                      >
                        {profileData.address || (
                          <span className="text-muted">Not provided</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Landmark */}
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px" }}
                    >
                      <label className="form-label fw-bold text-secondary mb-0">
                        Landmark:
                      </label>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control ms-3"
                        value={editedData.landmark || ""}
                        onChange={(e) =>
                          handleInputChange("landmark", e.target.value)
                        }
                        placeholder="Enter landmark"
                      />
                    ) : (
                      <span className="text-dark ms-3">
                        {profileData.landmark || (
                          <span className="text-muted">Not specified</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pin Code */}
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px" }}
                    >
                      <label className="form-label fw-bold text-secondary mb-0">
                        Pin Code:
                      </label>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control ms-3"
                        value={editedData.pin_code || ""}
                        onChange={(e) =>
                          handleInputChange("pin_code", e.target.value)
                        }
                        placeholder="Enter pin code"
                        maxLength="6"
                      />
                    ) : (
                      <span className="text-dark ms-3">
                        {profileData.pin_code || (
                          <span className="text-muted">Not specified</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Business Information Section (if manufacturer) */}
                {profileData.is_manufacturer === "1" && (
                  <>
                    <div className="col-12 mt-4">
                      <h5 className="text-primary fw-bold mb-3 border-bottom pb-2">
                        Business Information
                      </h5>
                    </div>

                    {/* Shop Name */}
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div
                          className="d-flex align-items-center"
                          style={{ minWidth: "140px" }}
                        >
                          <Store size={16} className="mr-1 text-primary" />
                          <label className="form-label fw-bold text-secondary mb-0">
                            Shop Name:
                          </label>
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control ms-3"
                            value={editedData.shop_name || ""}
                            onChange={(e) =>
                              handleInputChange("shop_name", e.target.value)
                            }
                            placeholder="Enter shop name"
                          />
                        ) : (
                          <span className="text-dark ms-3">
                            {profileData.shop_name || (
                              <span className="text-muted">Not specified</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* GST Number */}
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div
                          className="d-flex align-items-center"
                          style={{ minWidth: "140px" }}
                        >
                          <label className="form-label fw-bold text-secondary mb-0">
                            GST Number:
                          </label>
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control ms-3"
                            value={editedData.gst_number || ""}
                            onChange={(e) =>
                              handleInputChange("gst_number", e.target.value)
                            }
                            placeholder="Enter GST number"
                          />
                        ) : (
                          <span className="text-dark ms-3">
                            {profileData.gst_number || (
                              <span className="text-muted">Not provided</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Additional Information Section */}
                <div className="col-12 mt-4">
                  <h5 className="text-primary fw-bold mb-3 border-bottom pb-2">
                    Additional Information
                  </h5>
                </div>

                {/* About Me */}
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-start">
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "140px", marginTop: "6px" }}
                    >
                      <label className="form-label fw-bold text-secondary mb-0">
                        About Me:
                      </label>
                    </div>
                    {isEditing ? (
                      <textarea
                        className="form-control ms-3"
                        rows="3"
                        value={editedData.about_me || ""}
                        onChange={(e) =>
                          handleInputChange("about_me", e.target.value)
                        }
                        placeholder="Tell us about yourself"
                      />
                    ) : (
                      <span
                        className="text-dark ms-3 pt-2"
                        style={{ lineHeight: "1.5" }}
                      >
                        {profileData.about_me || (
                          <span className="text-muted">
                            No description provided
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="mt-5">
                <h5 className="text-primary fw-bold mb-3 border-bottom pb-2">
                  Statistics
                </h5>
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-3">
                    <div
                      className="card bg-gradient text-white h-100"
                      style={{
                        background: "linear-gradient(135deg, #28a745, #20c997)",
                      }}
                    >
                      <div className="card-body text-center">
                        <Wallet className="mb-2 mr-1" size={28} />
                        <h6 className="card-title mb-1 fw-bold">
                          Wallet Balance
                        </h6>
                        <p className="card-text fs-4 fw-bold mb-0">
                          ₹{profileData.wallet_amount}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <div
                      className="card bg-gradient text-white h-100"
                      style={{
                        background: "linear-gradient(135deg, #007bff, #6610f2)",
                      }}
                    >
                      <div className="card-body text-center">
                        <Package className="mb-2 mr-1" size={28} />
                        <h6 className="card-title mb-1 fw-bold">Total Items</h6>
                        <p className="card-text fs-4 fw-bold mb-0">
                          {profileData.total_items}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <div
                      className="card bg-gradient text-white h-100"
                      style={{
                        background: "linear-gradient(135deg, #17a2b8, #20c997)",
                      }}
                    >
                      <div className="card-body text-center">
                        <Eye className="mb-2 mr-1" size={28} />
                        <h6 className="card-title mb-1 fw-bold">
                          Profile Views
                        </h6>
                        <p className="card-text fs-4 fw-bold mb-0">
                          {profileData.seen_count}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <div
                      className="card bg-gradient text-white h-100"
                      style={{
                        background: "linear-gradient(135deg, #ffc107, #fd7e14)",
                      }}
                    >
                      <div className="card-body text-center">
                        <Star className="mb-2 mr-1" size={28} />
                        <h6 className="card-title mb-1 fw-bold">Rating</h6>
                        <p className="card-text fs-4 fw-bold mb-0">
                          {profileData.rating}/5 ⭐
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
