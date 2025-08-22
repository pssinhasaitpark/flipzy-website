import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Save, X, User, Phone, Mail, MapPin, Star, Wallet, Package, Eye, Store } from "lucide-react";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      // Here you would typically make an API call to update the profile
      // For now, we'll just update the local state
      setProfileData({ ...editedData });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getGenderText = (gender) => {
    switch (gender) {
      case "0": return "Female";
      case "1": return "Male";
      case "2": return "Other";
      default: return "Not specified";
    }
  };

  if (loading?.user_profile) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          No profile data available
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0 fw-bold text-primary">User Profile</h4>
              {!isEditing ? (
                <button className="btn btn-outline-primary btn-sm" onClick={handleEdit}>
                  <Edit2 size={16} className="me-1" />
                  Edit Profile
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-success btn-sm" onClick={handleSave}>
                    <Save size={16} className="me-1" />
                    Save
                  </button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={handleCancel}>
                    <X size={16} className="me-1" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
            
            <div className="card-body">
              {/* Profile Picture and Basic Info */}
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img
                    src={profileData.profile_pic || "/api/placeholder/120/120"}
                    alt="Profile"
                    className="rounded-circle border border-3 border-primary"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  {profileData.is_manufacturer === "1" && (
                    <span className="position-absolute bottom-0 end-0 bg-success text-white rounded-pill px-2 py-1 small">
                      <Store size={12} className="me-1" />
                      Seller
                    </span>
                  )}
                </div>
                <h3 className="mt-3 mb-1 fw-bold">{profileData.name}</h3>
                <p className="text-muted mb-0">@{profileData.user_name}</p>
              </div>

              {/* Profile Information */}
              <div className="row g-3">
                {/* Name */}
                <div className="col-md-6">
                  <label className="form-label fw-bold p-0 m-0 ">
                    <User size={16} className=" mx-1" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control "
                      value={editedData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <p className="form-control-plaintext mb-0 p-0 mx-2">{profileData.name}</p>
                  )}
                </div>

                {/* Username */}
                <div className="col-md-6">
                  <label className="form-label fw-bold p-0 m-0">
                    Username
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        value={profileData.user_name}
                        disabled
                        style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
                      />
                      <small className="text-muted">Cannot be changed</small>
                    </div>
                  ) : (
                    <p className="form-control-plaintext mb-0 p-0 mx-2 ">{profileData.user_name}</p>
                  )}
                </div>

                {/* Mobile */}
                <div className="col-md-6 mt-2">
                  <label className="form-label fw-bold p-0 m-0">
                    <Phone size={16} className="mx-1" />
                    Mobile Number
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        className="form-control mx-2"
                        value={`+91 ${profileData.mobile}`}
                        disabled
                        style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
                      />
                      <small className="text-muted">Cannot be changed</small>
                    </div>
                  ) : (
                    <p className="form-control-plain text mb-0 p-0 mx-2 ">+91 {profileData.mobile}</p>
                  )}
                </div>

                {/* Email */}
                <div className="col-md-6 mt-2">
                  <label className="form-label fw-bolder p-0 m-0">
                    <Mail size={16} className="mx-1" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      value={editedData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  ) : (
                    <p className="form-control-plain text mb-0 p-0 mx-2 ">
                      {profileData.email || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div className="col-md-6 mt-2">
                  <label className="form-label fw-bolder p-0 m-0 mx-2">Gender</label>
                  {isEditing ? (
                    <select
                      className="form-select"
                      value={editedData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                    >
                      <option value="0">Female</option>
                      <option value="1">Male</option>
                      <option value="2">Other</option>
                    </select>
                  ) : (
                    <p className="form-control-plaintext mb-0 p-0 mx-2">
                      {getGenderText(profileData.gender)}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="col-md-6 mt-2">
                  <label className="form-label fw-bolder p-0 mx-2 m-0">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter city"
                    />
                  ) : (
                    <p className="form-control-plaintext mb-0 p-0 mx-2">
                      {profileData.city || "Not specified"}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="col-12 mt-2">
                  <label className="form-label fw-bolder p-0 mx-2 m-0">
                    <MapPin size={16} className="me-1" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      className="form-control p-0"
                      rows="2"
                      value={editedData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter address"
                    />
                  ) : (
                    <p className="form-control-plaintext mb-0 p-0 mx-2">
                      {profileData.address || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Landmark */}
                <div className="col-md-6 mt-2">
                  <label className="form-label fw-bolder p-0 mx-2 m-0">Landmark</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedData.landmark}
                      onChange={(e) => handleInputChange('landmark', e.target.value)}
                      placeholder="Enter landmark"
                    />
                  ) : (
                    <p className="form-control-plaintext mb-0 p-0 mx-2">
                      {profileData.landmark || "Not specified"}
                    </p>
                  )}
                </div>

                {/* Pin Code */}
                <div className="col-md-6 mt-2">
                  <label className="form-label fw-bolder p-0 mx-2 m-0" >Pin Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedData.pin_code}
                      onChange={(e) => handleInputChange('pin_code', e.target.value)}
                      placeholder="Enter pin code"
                      maxLength="6"
                    />
                  ) : (
                    <p className="form-control-plaintext mb-0 p-0 mx-2">
                      {profileData.pin_code || "Not specified"}
                    </p>
                  )}
                </div>

                {/* Shop Name (if manufacturer) */}
                {profileData.is_manufacturer === "1" && (
                  <div className="col-md-6 mt-2">
                    <label className="form-label fw-bolder p-0 mx-2 m-0">
                      <Store size={16} className="me-1" />
                      Shop Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editedData.shop_name}
                        onChange={(e) => handleInputChange('shop_name', e.target.value)}
                        placeholder="Enter shop name"
                      />
                    ) : (
                      <p className="form-control-plaintext mb-0 p-0 mx-2">
                        {profileData.shop_name || "Not specified"}
                      </p>
                    )}
                  </div>
                )}

                {/* GST Number (if manufacturer) */}
                {profileData.is_manufacturer === "1" && (
                  <div className="col-md-6 mt-2">
                    <label className="form-label fw-bolder mx-2 m-0">GST Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editedData.gst_number}
                        onChange={(e) => handleInputChange('gst_number', e.target.value)}
                        placeholder="Enter GST number"
                      />
                    ) : (
                      <p className="form-control-plaintext mb-0  p-0 mx-2">
                        {profileData.gst_number || "Not provided"}
                      </p>
                    )}
                  </div>
                )}

                {/* About Me */}
                <div className="col-12 mt-2">
                  <label className="form-label fw-bolder mx-2 m-0">About Me</label>
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      rows="3"
                      value={editedData.about_me}
                      onChange={(e) => handleInputChange('about_me', e.target.value)}
                      placeholder="Tell us about yourself"
                    />
                  ) : (
                    <p className="form-control-plaintext mb-0  p-0 mx-2">
                      {profileData.about_me || "No description provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="row mt-4">
                <div className="col-md-3 col-6 mb-3">
                  <div className="card bg-light text-center h-100">
                    <div className="card-body">
                      <Wallet className="text-success mb-2" size={24} />
                      <h6 className="card-title mb-1">Wallet</h6>
                      <p className="card-text fw-bold text-success">
                        ₹{profileData.wallet_amount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div className="card bg-light text-center h-100">
                    <div className="card-body">
                      <Package className="text-primary mb-2" size={24} />
                      <h6 className="card-title mb-1">Items</h6>
                      <p className="card-text fw-bold text-primary">
                        {profileData.total_items}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div className="card bg-light text-center h-100">
                    <div className="card-body">
                      <Eye className="text-info mb-2" size={24} />
                      <h6 className="card-title mb-1">Views</h6>
                      <p className="card-text fw-bold text-info">
                        {profileData.seen_count}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div className="card bg-light text-center h-100">
                    <div className="card-body">
                      <Star className="text-warning mb-2" size={24} />
                      <h6 className="card-title mb-1">Rating</h6>
                      <p className="card-text fw-bold text-warning">
                        {profileData.rating}/5
                      </p>
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