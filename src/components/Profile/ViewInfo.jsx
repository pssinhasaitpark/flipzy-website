import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const ViewInfo = () => {
  // Sample profile data - replace with your actual data
  const profileData = {
    fullName: "Anvika Chouhan",
    mobileNumber: "9752560248",
    gender: "Male",
    zipcode: "452003",
    location: "Madhya Pradesh, Indore",
    localAddress: "121 Devi Ahilya Marg Indore MP",
    state: "Madhya Pradesh",
    city: "Indore",
    landmark: "Nar Agnibal Press"
  }

  const InfoField = ({ label, value, icon }) => (
    <div className="mb-3">
      <label className="form-label text-muted small fw-semibold">{label}</label>
      <div className="d-flex align-items-center">
        <div className="flex-grow-1 p-3 bg-light border rounded-3 position-relative">
          <span className="text-dark">{value}</span>
          {icon && (
            <i className={`${icon} position-absolute end-0 top-50 translate-middle-y me-3 text-muted`}></i>
          )}
        </div>
      </div>
    </div>
  )

  const GenderDisplay = ({ selected }) => (
    <div className="mb-3">
      <label className="form-label text-muted small fw-semibold">Select Gender</label>
      <div className="d-flex gap-4 mt-2">
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" 
            checked={selected === 'Male'} 
            disabled 
            readOnly
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" 
            checked={selected === 'Female'} 
            disabled 
            readOnly
          />
          <label className="form-check-label">Female</label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          {/* Header */}
          <div className="bg-success text-white p-3 d-flex align-items-center">
            <button className="btn btn-link text-white p-0 me-3">
              <i className="fas fa-arrow-left fs-5"></i>
            </button>
            <h5 className="mb-0 fw-semibold">View Profile</h5>
          </div>

          {/* Profile Form */}
          <div className="bg-white p-4">
            <InfoField 
              label="Full Name*" 
              value={profileData.fullName}
              icon="fas fa-user"
            />

            <InfoField 
              label="Mobile Number*" 
              value={profileData.mobileNumber}
              icon="fas fa-mobile-alt"
            />

            <GenderDisplay selected={profileData.gender} />

            <div className="mb-4">
              <h6 className="text-muted fw-semibold mb-3">Select Location</h6>
              
              <InfoField 
                label="Enter Zipcode*" 
                value={profileData.zipcode}
              />

              <div className="mb-3">
                <div className="p-3 bg-success bg-opacity-10 border border-success border-opacity-25 rounded-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-map-marker-alt text-success me-2"></i>
                    <span className="text-success fw-medium">{profileData.location}</span>
                  </div>
                </div>
              </div>

              <InfoField 
                label="Local Address*" 
                value={profileData.localAddress}
                icon="fas fa-map-marker-alt"
              />

              <InfoField 
                label="Select State*" 
                value={profileData.state}
                icon="fas fa-chevron-down"
              />

              <InfoField 
                label="Select City*" 
                value={profileData.city}
                icon="fas fa-chevron-down"
              />

              <InfoField 
                label="Enter Landmark*" 
                value={profileData.landmark}
                icon="fas fa-map-pin"
              />
            </div>

            {/* View Details Button */}
            <button className="btn btn-success w-100 py-3 rounded-3 fw-semibold">
              View Full Details
            </button>
          </div>
        </div>
      </div>

      {/* Font Awesome CDN for icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </div>
  )
}

export default ViewInfo
