import React, { useState, useEffect, useRef } from "react";
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
  FaPencilAlt,
  FaEllipsisV,
} from "react-icons/fa";
import "./Profile.css";
import { Link } from "react-router-dom";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileMenu from "./ProfileMenu";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    shop: "",
    gst: "",
    mobile: "",
    isManufacturer: false,
    notificationsEnabled: true,
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
            address: userData.address || "",
            landmark: userData.landmark || "",
            pinCode: userData.pin_code || "",
            profilePic: userData.profile_pic || "",
            gender: userData.gender || "0",
            walletAmount: userData.wallet_amount || "0",
            appVersion: "1.38",
            deviceType: "0",
            deviceToken: userData.device_token || "",
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

  const handlePictureClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF)");
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPicture = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }
    try {
      setUploadingPicture(true);
      const formDataUpload = new FormData();
      formDataUpload.append("module_action", "update_profile_picture");
      formDataUpload.append("user_id", "22");
      formDataUpload.append("profile_pic", selectedFile);

      const response = await fetch(
        "https://berrybazaar.co.in/admin/Application-API/web-services.php/api/upload",
        {
          method: "POST",
          body: formDataUpload,
        }
      );
      if (response.ok) {
        const result = await response.json();
        setFormData((prev) => ({
          ...prev,
          profilePic: result.profile_pic_url || previewImage,
        }));
        toast.success("Profile picture updated successfully!");
        setSelectedFile(null);
        setPreviewImage(null);
        fileInputRef.current.value = "";
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      toast.error("Failed to upload profile picture!");
      console.error("Error uploading picture:", err);
    } finally {
      setUploadingPicture(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
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
      const response = await dispatch(fetchModuleData(payload)).unwrap();
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
              <div className="col-12 col-md-6">
                <div className="card shadow-sm mb-4">
                  <div className="card-body text-center">
                    <div className="position-relative d-inline-block mb-3">
                      <img
                        src={
                          previewImage ||
                          formData.profilePic ||
                          data.user_profile?.result?.profile_pic ||
                          "/default-avatar.png"
                        }
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          border: "2px solid #dee2e6",
                          cursor: "pointer",
                        }}
                        onClick={() => setLightboxOpen(true)}
                      />
                      <div
                        className="dropdown position-absolute"
                        style={{ bottom: 0, right: 0 }}
                      >
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={handlePictureClick}
                          style={{
                            borderRadius: "50%",
                            width: "28px",
                            height: "28px",
                            padding: "0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid white",
                          }}
                          title="Edit profile picture"
                        >
                          <FaPencilAlt size={10} />
                        </button>
                        {dropdownOpen && (
                          <div
                            className="dropdown-menu show"
                            style={{
                              position: "absolute",
                              right: 0,
                              minWidth: "120px",
                              zIndex: 1000,
                            }}
                          >
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                setLightboxOpen(true);
                                setDropdownOpen(false);
                              }}
                            >
                              View
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                fileInputRef.current.click();
                                setDropdownOpen(false);
                              }}
                            >
                              Upload
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                      />
                    </div>
                    {selectedFile && (
                      <div className="mb-3">
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={handleUploadPicture}
                            disabled={uploadingPicture}
                          >
                            {uploadingPicture ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-1"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Uploading...
                              </>
                            ) : (
                              "Upload"
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewImage(null);
                              fileInputRef.current.value = "";
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                        <small className="text-muted d-block mt-1">
                          Selected: {selectedFile.name}
                        </small>
                      </div>
                    )}
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
                    <div className="list-group list-group-flush">
                      <ProfileMenu />
                    </div>
                  </div>
                </div>
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
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[
          {
            src:
              previewImage ||
              formData.profilePic ||
              data.user_profile?.result?.profile_pic ||
              "/default-avatar.png",
          },
        ]}
      />
      <ToastContainer />
    </>
  );
};

export default Profile;
