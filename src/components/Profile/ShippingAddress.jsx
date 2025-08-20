import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../../redux/slices/apiSlice";
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
  const [newAddress, setNewAddress] = useState({
    zipcode: "",
    address: "",
    landmark: "",
    name: "",
    mobile: "",
    city: "",
    state: "",
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

  const handleInputChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.mobile) {
      const params = {
        name: newAddress.name,
        mobile: newAddress.mobile,
        address: newAddress.address,
        landmark: newAddress.landmark,
        pincode: newAddress.zipcode,
        city: newAddress.city,
        state: newAddress.state,
      };
      dispatch(fetchModuleData({ module_action: "addAddresses", params })).then(
        () => {
          dispatch(fetchModuleData({ module_action: "getAddresses" }));
          setNewAddress({
            zipcode: "",
            address: "",
            landmark: "",
            name: "",
            mobile: "",
            city: "",
            state: "",
          });
          setShowModal(false);
          setCurrentAddress(null);
        }
      );
    }
  };

  const handleEditAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.mobile) {
      const params = {
        address_id: currentAddress.address_id,
        name: newAddress.name,
        mobile: newAddress.mobile,
        address: newAddress.address,
        landmark: newAddress.landmark,
        pincode: newAddress.zipcode,
        city: newAddress.city,
        state: newAddress.state,
      };
      dispatch(
        fetchModuleData({ module_action: "updateAddress", params })
      ).then(() => {
        dispatch(fetchModuleData({ module_action: "getAddresses" }));
        setNewAddress({
          zipcode: "",
          address: "",
          landmark: "",
          name: "",
          mobile: "",
          city: "",
          state: "",
        });
        setShowModal(false);
        setCurrentAddress(null);
      });
    }
  };

  const handleSetAsDefault = (id) => {
    dispatch(
      fetchModuleData({
        module_action: "markAsDefaultAddress",
        params: { address_id: id },
      })
    ).then(() => {
      dispatch(fetchModuleData({ module_action: "getAddresses" }));
    });
  };

  const handleDeleteAddress = (id) => {
    dispatch(
      fetchModuleData({
        module_action: "deleteAddress",
        params: { address_id: id },
      })
    ).then(() => {
      dispatch(fetchModuleData({ module_action: "getAddresses" }));
    });
  };

  const openEditModal = (address) => {
    setCurrentAddress(address);
    setNewAddress({
      zipcode: address.zip_code || "",
      address: address.address || "",
      landmark: address.landmark || "",
      name: address.name || "",
      mobile: address.mobile || "",
      city: address.city || "",
      state: address.state || "",
    });
    setShowModal(true);
  };

  return (
    <div className="container-fluid p-3">
      <div className="mb-4 row justify-content-center">
        <div className="mb-4 col-sm-8">
          <h5 className="mb-3 text-center">Shipping Addresses</h5>
          {loading.getAddresses ? (
            <div className="text-center">Loading addresses...</div>
          ) : error.getAddresses ? (
            <div className="text-center text-danger">{error.getAddresses}</div>
          ) : Array.isArray(addresses) && addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address.address_id} className="card mb-3 shadow-sm">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-1">
                        <span className="badge bg-success me-2">
                          Address ID - #{address.address_id}
                        </span>
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
                          {address.address}, {address.city}, {address.state} -{" "}
                          {address.zip_code}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <button
                        className="btn btn-sm btn-outline-primary mb-1"
                        onClick={() => openEditModal(address)}
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteAddress(address.address_id)}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className={`btn btn-sm ${
                        address.is_default_address === "1"
                          ? "btn-success"
                          : "btn-outline-success"
                      }`}
                      onClick={() => handleSetAsDefault(address.address_id)}
                      disabled={address.is_default_address === "1"}
                    >
                      {address.is_default_address === "1"
                        ? "Default"
                        : "Make as default"}
                    </button>
                    <div
                      className="bg-danger rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <FaMapMarkerAlt className="text-white" size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No addresses found.</div>
          )}
          <button
            className="btn btn-success py-3 fw-bold"
            onClick={() => {
              setCurrentAddress(null);
              setNewAddress({
                zipcode: "",
                address: "",
                landmark: "",
                name: "",
                mobile: "",
                city: "",
                state: "",
              });
              setShowModal(true);
            }}
          >
            <FaPlus className="me-2" />
            Add New Address
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  {currentAddress ? "Edit Address" : "Add New Address"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setCurrentAddress(null);
                    setNewAddress({
                      zipcode: "",
                      address: "",
                      landmark: "",
                      name: "",
                      mobile: "",
                      city: "",
                      state: "",
                    });
                  }}
                >
                  <RxCross2 />
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <div className="mb-3">
                    <label className="form-label">Enter Zipcode*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Zipcode*"
                      name="zipcode"
                      value={newAddress.zipcode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Enter Address*</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="121 Devi Ahilya Marg Indore MP"
                        name="address"
                        value={newAddress.address}
                        onChange={handleInputChange}
                      />
                      <span className="input-group-text">
                        <FaMapMarkerAlt className="text-muted" />
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Enter Landmark*</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Landmark"
                        name="landmark"
                        value={newAddress.landmark}
                        onChange={handleInputChange}
                      />
                      <span className="input-group-text">
                        <FaMapMarkerAlt className="text-muted" />
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Enter Name*</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Anvika Chouhan"
                        name="name"
                        value={newAddress.name}
                        onChange={handleInputChange}
                      />
                      <span className="input-group-text">
                        <FaUser className="text-muted" />
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile Number*</label>
                    <div className="input-group">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="9752560248"
                        name="mobile"
                        value={newAddress.mobile}
                        onChange={handleInputChange}
                      />
                      <span className="input-group-text">
                        <FaPhone className="text-muted" />
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City*</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Indore"
                        name="city"
                        value={newAddress.city}
                        onChange={handleInputChange}
                      />
                      <span className="input-group-text">
                        <FaMapMarkerAlt className="text-muted" />
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">State*</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Madhya Pradesh"
                        name="state"
                        value={newAddress.state}
                        onChange={handleInputChange}
                      />
                      <span className="input-group-text">
                        <FaMapMarkerAlt className="text-muted" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-success w-100 py-3 fw-bold"
                  onClick={
                    currentAddress ? handleEditAddress : handleAddAddress
                  }
                >
                  {currentAddress ? (
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
