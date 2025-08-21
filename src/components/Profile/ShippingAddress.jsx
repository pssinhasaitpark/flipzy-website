import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaTimes,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);

  // Initial form values
  const initialValues = {
    zipcode: "",
    address: "",
    landmark: "",
    name: "",
    mobile: "",
    city: "",
    state: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    zipcode: Yup.string()
      .required("Zipcode is required")
      .matches(/^[0-9]{6}$/, "Zipcode must be exactly 6 digits")
      .test("not-all-zeros", "Invalid zipcode", (value) => value !== "000000"),
    address: Yup.string()
      .required("Address is required")
      .min(10, "Address must be at least 10 characters")
      .max(200, "Address must not exceed 200 characters")
      .trim(),
    landmark: Yup.string()
      .required("Landmark is required")
      .min(3, "Landmark must be at least 3 characters")
      .max(100, "Landmark must not exceed 100 characters")
      .trim(),
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .matches(/^[a-zA-Z\s]+$/, "Name should contain only letters and spaces")
      .trim(),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[6-9][0-9]{9}$/, "Invalid mobile number format")
      .length(10, "Mobile number must be exactly 10 digits"),
    city: Yup.string()
      .required("City is required")
      .min(2, "City must be at least 2 characters")
      .max(50, "City must not exceed 50 characters")
      .matches(/^[a-zA-Z\s]+$/, "City should contain only letters and spaces")
      .trim(),
    state: Yup.string()
      .required("State is required")
      .min(2, "State must be at least 2 characters")
      .max(50, "State must not exceed 50 characters")
      .matches(/^[a-zA-Z\s]+$/, "State should contain only letters and spaces")
      .trim(),
  });

  // Fetch addresses on mount
  useEffect(() => {
    dispatch(fetchModuleData({ module_action: "getAddresses" }));
  }, [dispatch]);

  // Update local state when API data changes
  useEffect(() => {
    if (data.getAddresses?.result && Array.isArray(data.getAddresses.result)) {
      setAddresses(data.getAddresses.result);
    } else {
      setAddresses([]); // Fallback to empty array if data is invalid
    }
  }, [data.getAddresses]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const params = {
        name: values.name.trim(),
        mobile: values.mobile,
        address: values.address.trim(),
        landmark: values.landmark.trim(),
        pincode: values.zipcode,
        city: values.city.trim(),
        state: values.state.trim(),
      };

      if (currentAddress) {
        // Update existing address
        params.address_id = currentAddress.address_id;
        await dispatch(
          fetchModuleData({ module_action: "updateAddress", params })
        );
        toast.success("Address updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        // Add new address
        await dispatch(
          fetchModuleData({ module_action: "addAddresses", params })
        );
        toast.success("Address added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      // Refresh address list
      await dispatch(fetchModuleData({ module_action: "getAddresses" }));
      resetForm();
      handleCloseModal();
    } catch (error) {
      toast.error("Operation failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Address operation failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSetAsDefault = async (id) => {
    try {
      await dispatch(
        fetchModuleData({
          module_action: "markAsDefaultAddress",
          params: { address_id: id },
        })
      );
      await dispatch(fetchModuleData({ module_action: "getAddresses" }));
      toast.success("Default address updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to set default address. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Set default address failed:", error);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await dispatch(
          fetchModuleData({
            module_action: "deleteAddress",
            params: { address_id: id },
          })
        );
        await dispatch(fetchModuleData({ module_action: "getAddresses" }));
        toast.success("Address deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Failed to delete address. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Delete address failed:", error);
      }
    }
  };

  const handleEditClick = (address) => {
    setCurrentAddress(address);
    setShowModal(true);
  };

  const handleAddNewClick = () => {
    setCurrentAddress(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAddress(null);
  };

  // Get initial values for edit mode
  const getInitialValues = () => {
    if (currentAddress) {
      return {
        zipcode: currentAddress.zip_code || "",
        address: currentAddress.address || "",
        landmark: currentAddress.landmark || "",
        name: currentAddress.name || "",
        mobile: currentAddress.mobile || "",
        city: currentAddress.city || "",
        state: currentAddress.state || "",
      };
    }
    return initialValues;
  };

  return (
    <div className="container-fluid p-3">
      <div className="mb-4 row justify-content-center">
        <div className="col-12">
          <h5 className="mb-3 text-center">Shipping Addresses</h5>

          {loading.getAddresses ? (
            <div className="text-center">Loading addresses...</div>
          ) : error.getAddresses ? (
            <div className="text-center text-danger">{error.getAddresses}</div>
          ) : Array.isArray(addresses) && addresses.length > 0 ? (
            <div className="row">
              {addresses.map((address) => (
                <div
                  key={address.address_id}
                  className="col-lg-4 col-md-6 col-sm-12 mb-3"
                >
                  <div className="card h-100 shadow-sm">
                    <div className="card-body p-3 d-flex flex-column">
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="badge bg-success me-2">
                            Address ID - #{address.address_id}
                          </span>
                          <div>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEditClick(address)}
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleDeleteAddress(address.address_id)
                              }
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>

                        <div className="d-flex align-items-center mb-2">
                          <FaUser className="text-primary me-1" size={14} />
                          <strong className="mx-1">{address.name}</strong>
                        </div>

                        <div className="d-flex align-items-center mb-2">
                          <FaPhone className="text-success me-2" size={14} />
                          <span className="mx-1">{address.mobile}</span>
                        </div>

                        <div className="d-flex align-items-start mb-3">
                          <FaMapMarkerAlt
                            className="text-danger me-2 mt-1"
                            size={14}
                          />
                          <span className="text-muted small mx-1">
                            {address.address}, {address.landmark},{" "}
                            {address.city}, {address.state} - {address.zip_code}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <button
                          className={`btn btn-sm w-100 ${
                            address.is_default_address === "1"
                              ? "btn-success"
                              : "btn-outline-success"
                          }`}
                          onClick={() => handleSetAsDefault(address.address_id)}
                          disabled={address.is_default_address === "1"}
                        >
                          {address.is_default_address === "1"
                            ? "Default Address"
                            : "Make as Default"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="alert alert-info">
                No addresses found. Add your first address to get started.
              </div>
            </div>
          )}

          <div className="row mt-4">
            <div className="col-12 text-center">
              <button
                className="btn btn-success py-3 fw-bold px-5"
                onClick={handleAddNewClick}
              >
                <FaPlus className="me-2" />
                Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  {currentAddress ? "Edit Address" : "Add New Address"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                >
                  <RxCross2 />
                </button>
              </div>

              <Formik
                initialValues={getInitialValues()}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <div className="modal-body">
                      <div className="row">
                        {/* Zipcode */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Enter Zipcode*</label>
                          <Field
                            type="text"
                            name="zipcode"
                            className={`form-control ${
                              errors.zipcode && touched.zipcode
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter 6-digit zipcode"
                            maxLength="6"
                          />
                          <ErrorMessage
                            name="zipcode"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        {/* Name */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Enter Name*</label>
                          <div className="input-group">
                            <Field
                              type="text"
                              name="name"
                              className={`form-control ${
                                errors.name && touched.name ? "is-invalid" : ""
                              }`}
                              placeholder="Enter full name"
                            />
                            <span className="input-group-text">
                              <FaUser className="text-muted" />
                            </span>
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="mb-3">
                        <label className="form-label">Enter Address*</label>
                        <div className="input-group">
                          <Field
                            as="textarea"
                            name="address"
                            className={`form-control ${
                              errors.address && touched.address
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter complete address (House/Flat No., Street, Area)"
                            rows="3"
                            style={{ resize: "vertical" }}
                          />
                          <span className="input-group-text">
                            <FaMapMarkerAlt className="text-muted" />
                          </span>
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="row">
                        {/* Landmark */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Enter Landmark*</label>
                          <div className="input-group">
                            <Field
                              type="text"
                              name="landmark"
                              className={`form-control ${
                                errors.landmark && touched.landmark
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Nearby landmark"
                            />
                            <span className="input-group-text">
                              <FaMapMarkerAlt className="text-muted" />
                            </span>
                            <ErrorMessage
                              name="landmark"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>

                        {/* Mobile */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Mobile Number*</label>
                          <div className="input-group">
                            <Field
                              type="tel"
                              name="mobile"
                              className={`form-control ${
                                errors.mobile && touched.mobile
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter 10-digit mobile number"
                              maxLength="10"
                              onKeyDown={(e) => {
                                if (
                                  ![..."0123456789"].includes(e.key) &&
                                  ![
                                    "Backspace",
                                    "Delete",
                                    "Tab",
                                    "Escape",
                                    "Enter",
                                    "ArrowLeft",
                                    "ArrowRight",
                                  ].includes(e.key)
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                              }}
                            />
                            <span className="input-group-text">
                              <FaPhone className="text-muted" />
                            </span>
                            <ErrorMessage
                              name="mobile"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* City */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">City*</label>
                          <div className="input-group">
                            <Field
                              type="text"
                              name="city"
                              className={`form-control ${
                                errors.city && touched.city ? "is-invalid" : ""
                              }`}
                              placeholder="Enter city name"
                            />
                            <span className="input-group-text">
                              <FaMapMarkerAlt className="text-muted" />
                            </span>
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>

                        {/* State */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label">State*</label>
                          <div className="input-group">
                            <Field
                              type="text"
                              name="state"
                              className={`form-control ${
                                errors.state && touched.state
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter state name"
                            />
                            <span className="input-group-text">
                              <FaMapMarkerAlt className="text-muted" />
                            </span>
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer border-0">
                      <button
                        type="submit"
                        className="btn btn-success w-100 py-3 fw-bold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            {currentAddress ? "Updating..." : "Adding..."}
                          </>
                        ) : currentAddress ? (
                          <>
                            <FaEdit className="me-2" />
                            Update Address
                          </>
                        ) : (
                          <>
                            <FaPlus className="me-2" />
                            Add New Address
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
