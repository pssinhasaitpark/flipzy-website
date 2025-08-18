import React, { useState } from 'react';
import { FaPlus, FaTimes, FaMapMarkerAlt, FaPhone, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
const ShippingAddress = () => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 87,
      type: 'test',
      name: 'Anvika Chouhan',
      phone: '9752560248',
      address: 'Ujjain, Madhya Pradesh, 452001',
      isDefault: false
    },
    {
      id: 49,
      type: '121 Devi Shirts Marg',
      name: 'Anvika Chouhan', 
      phone: '9752560248',
      address: 'Indore, Madhya Pradesh, 452003',
      isDefault: false
    },
    {
      id: 25,
      type: 'vddbbddvv',
      name: 'Anvika Chouhan',
      phone: '9752560248', 
      address: 'Indore, Madhya Pradesh, 548448',
      isDefault: true
    },
    {
      id: 24,
      type: 'vdvdvd',
      name: 'Anvika Chouhan',
      phone: '9752560248',
      address: 'Ujjain, Madhya Pradesh, 846884',
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    zipcode: '',
    address: '',
    landmark: '',
    name: '',
    mobile: ''
  });

  const handleInputChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.mobile) {
      const newId = Math.max(...addresses.map(addr => addr.id)) + 1;
      setAddresses([...addresses, {
        id: newId,
        type: newAddress.address.split(' ').slice(0, 3).join(' '),
        name: newAddress.name,
        phone: newAddress.mobile,
        address: newAddress.address,
        isDefault: false
      }]);
      setNewAddress({
        zipcode: '',
        address: '',
        landmark: '',
        name: '',
        mobile: ''
      });
      setShowModal(false);
    }
  };

  const setAsDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="container-fluid p-3" >
      <div className="mb-4 row justify-content-center">
     
              <div className="mb-4 col-sm-8">   <h5 className="mb-3 text-center">Shipping Addresses</h5>
        {addresses.map((address) => (
          <div key={address.id} className="card mb-3 shadow-sm">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-1">
                    <span className="badge bg-success  me-2">Address ID - #{address.id}</span>
                    <small className="text-muted mx-1">{address.type}</small>
                  </div>
                  
                  <div className="d-flex align-items-center mb-2">
                    <FaUser className="text-primary me-1" size={14} />
                    <strong className='mx-1'>{address.name}</strong>
                  </div>
                  
                  <div className="d-flex align-items-center mb-2">
                    <FaPhone className="text-success me-2" size={14} />
                    <span className='mx-1'>{address.phone}</span>
                  </div>
                  
                  <div className="d-flex align-items-start mb-3">
                    <FaMapMarkerAlt className="text-danger me-2 mt-1" size={14} />
                    <span className="text-muted small mx-1">{address.address}</span>
                  </div>
                </div>
                
                <div className="d-flex flex-column">
                  <button 
                    className="btn btn-sm btn-outline-primary mb-1"
                    onClick={() => setAsDefault(address.id)}
                  >
                    <FaEdit size={12} />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteAddress(address.id)}
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
              
              <div className="d-flex justify-content-between align-items-center">
                <button 
                  className={`btn btn-sm ${address.isDefault ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setAsDefault(address.id)}
                  disabled={address.isDefault}
                >
                  {address.isDefault ? 'Default' : 'Make as default'}
                </button>
                <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '30px', height: '30px' }}>
                  <FaMapMarkerAlt className="text-white" size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          className="btn btn-success  py-3 fw-bold"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="me-2" />
          Add New Address
        </button>
      </div></div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">Select Location</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  
                >    <RxCross2 /></button>
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
                        placeholder="Anvika Chouhan1"
                        name="name"
                        value={newAddress.name}
                        onChange={handleInputChange}
                      />
                      <span className="input-group-text">
                        <FaUser className="text-muted" />
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
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
                </div>
              </div>
              
              <div className="modal-footer border-0">
                <Link to="/profile" >
                <button 
                  type="button" 
                  className="btn btn-success w-100 py-3 fw-bold"
                  onClick={handleAddAddress}
                >
                  <FaPlus className="me-2" />
                  Add New Address
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;