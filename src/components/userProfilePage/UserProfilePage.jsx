import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import { fetchModuleData } from '../../redux/slices/apiSlice'; // Adjust the import path

const UserProfilePage = () => {
  const { sellerId } = useParams(); // Get sellerId from the URL
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.api);

  // Fetch products when the component mounts or sellerId changes
  useEffect(() => {
    if (sellerId) {
      dispatch(
        fetchModuleData({
          module_action: 'getAllProductsBySeller',
          params: {
            user_id: sellerId, // Use sellerId from the URL
            page_no: 1,
            limit: 10,
          },
        })
      );
    }
  }, [dispatch, sellerId]);

  // Extract products from the Redux store
  const products = data?.getAllProductsBySeller?.product || [];

  // Static data for tags and interests
  const tags = [
    "#Art", "#Crafts", "#Content Creation/Writing", "#Dancing", "#Fashion", "#Make-Up",
    "#Movies/TV Shows", "#Music", "#Nature-Outdoor", "#Skincare"
  ];
  const interests = [
    "Declutter", "Recycle/Reuse/Rehome", "Thrifting", "Refresh my closet"
  ];

  // Loading state
  if (loading.getAllProductsBySeller) {
    return <div className="text-center mt-5">Loading products...</div>;
  }

  // Error state
  if (error.getAllProductsBySeller) {
    return <div className="text-center mt-5 text-danger">Error: {error.getAllProductsBySeller}</div>;
  }

  return (
    <div className="container mt-4">
      {/* Profile Header */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <img
                src="https://via.placeholder.com/100x100/6c757d/ffffff?text=Profile"
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '100px', height: '100px' }}
              />
              <h5 className="mb-1">{products[0]?.seller_name || "Shashi"}</h5>
              <p className="text-muted mb-3">@{products[0]?.username || "shashi2395"}</p>
              <button className="btn btn-warning btn-lg w-100 rounded-pill">Follow</button>
            </div>

            <div className="col-md-3">
              <div className="text-center">
                <div className="row">
                  <div className="col-4">
                    <h4 className="mb-0">81</h4>
                    <small className="text-muted">Followers</small>
                  </div>
                  <div className="col-4">
                    <h4 className="mb-0">0</h4>
                    <small className="text-muted">Following</small>
                  </div>
                  <div className="col-4">
                    <h4 className="mb-0">4.73 ⭐</h4>
                    <small className="text-muted">Rating</small>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="row text-center">
                  <div className="col-4">
                    <div className="d-flex flex-column align-items-center">
                      <span className="badge bg-warning text-dark rounded-circle p-2 mb-1">15</span>
                      <small>Sold Myself</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-column align-items-center">
                      <span className="badge bg-warning text-dark rounded-circle p-2 mb-1">0</span>
                      <small>Sold via PopUp</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-column align-items-center">
                      <span className="badge bg-warning text-dark rounded-circle p-2 mb-1">0</span>
                      <small>Cancelled as Seller</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              {/* Bio */}
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-person-badge me-2"></i>
                  <span className="text-muted">A sketch artist who believes in reuse/recycle/rehome!</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-palette me-2"></i>
                  <span className="text-muted">Artist</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-geo-alt me-2"></i>
                  <span className="text-muted">{products[0]?.pickup_address || "Jammu and Kashmir, Jammu"}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-3">
                <div className="d-flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <span key={index} className="badge bg-light text-primary border rounded-pill px-2 py-1" style={{ fontSize: '0.75rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-3">
                <div className="d-flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span key={index} className="badge bg-primary rounded-pill px-3 py-1">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <span className="badge bg-success rounded-pill px-3 py-1">Save the planet</span>
              </div>

              <div className="text-muted">
                <small>🕒 Joined FreeUp 4 years ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="d-flex justify-content-center mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link active" href="#selling">Selling {products.length}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#reviews">Reviews 15</a>
          </li>
        </ul>
      </div>

      {/* Products Grid (dynamic) */}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-2 col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.product_slider_image[0]?.image || "https://via.placeholder.com/200x150/6c757d/ffffff?text=No+Image"}
                className="card-img-top"
                alt={product.product_name}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body p-3">
                <h6 className="card-title mb-2" style={{ fontSize: '0.9rem', height: '2.2rem', overflow: 'hidden' }}>
                  {product.product_name}
                </h6>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fw-bold text-dark">₹{product.selling_price}</span>
                    <span className="text-muted text-decoration-line-through ms-2" style={{ fontSize: '0.8rem' }}>
                      ₹{product.mrp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePage;
