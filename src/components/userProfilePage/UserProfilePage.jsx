import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"; // Add Link import
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfilePage = () => {
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.api);
  const [isFollowing, setIsFollowing] = useState(false);

  // Add scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch products by seller
  useEffect(() => {
    if (sellerId) {
      dispatch(
        fetchModuleData({
          module_action: "getAllProductsBySeller",
          params: {
            user_id: sellerId,
            page_no: 1,
            limit: 60,
          },
        })
      );
    }
  }, [dispatch, sellerId]);

  // Fetch user profile data (image, viewed count, total items)
  useEffect(() => {
    if (sellerId) {
      dispatch(
        fetchModuleData({
          module_action: "user_profile",
          params: {
            user_id: sellerId,
          },
        })
      );
    }
  }, [dispatch, sellerId]);

  const products = data?.getAllProductsBySeller?.product || [];
  const userProfile = data?.user_profile || {};
  const defaultAvatarUrl = "https://avatar.iran.liara.run/public/boy"; // Default avatar image URL
  const viewedCount = userProfile.result?.seen_count ?? 1247;
  const totalItems = userProfile.result?.total_items ?? products.length;

  // Calculate the count of sold products
  const soldItemsCount = products.filter(product => product.is_sold === "1").length;

  const formattedViewed =
    viewedCount >= 1000
      ? (viewedCount / 1000).toFixed(1) + "K"
      : viewedCount.toString();

  const handleFollowClick = () => {
    setIsFollowing((prev) => !prev);
    if (!isFollowing) {
      toast.success(`You followed ${products[0]?.seller_name || "this user"}!`);
    }
  };

  if (loading.getAllProductsBySeller || loading.user_profile) {
    return (
      <div className="text-center mt-5">Loading profile and products...</div>
    );
  }

  if (error.getAllProductsBySeller || error.user_profile) {
    return (
      <div className="text-center mt-5 text-danger">
        Error: {error.getAllProductsBySeller || error.user_profile}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {/* Updated Profile Header */}
      <div className="position-relative mb-4">
        <div
          className="card border-0 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div className="card-body p-4">
            <div className="row align-items-center">
              {/* Profile Section */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <div
                    className="position-relative mr-4"
                    style={{ width: "120px", height: "120px" }}
                  >
                    <img
                      src="https://avatar.iran.liara.run/public/boy"
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: "120px",
                        height: "120px",
                        border: "4px solid #fff",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <h2
                      className="mb-1 fw-bold"
                      style={{
                        fontSize: "2rem",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {products[0]?.seller_name || "Shashi"}
                    </h2>
                    <p
                      className="text-muted mb-3"
                      style={{ fontSize: "1.1rem" }}
                    >
                      @{products[0]?.username || "shashi2395"}
                    </p>
                    <button
                      className="btn btn-lg px-4 py-2 fw-semibold"
                      style={{
                        background: isFollowing
                          ? "linear-gradient(135deg, #ff9999, #cc0000)"
                          : "linear-gradient(135deg,rgb(149, 238, 127),rgb(46, 185, 104))",
                        border: "none",
                        borderRadius: "50px",
                        color: "white",
                        boxShadow: isFollowing
                          ? "0 6px 20px rgba(150, 150, 150, 0.3)"
                          : "0 6px 20px rgba(255, 107, 107, 0.3)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onClick={handleFollowClick}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = isFollowing
                          ? "0 8px 25px rgba(150, 150, 150, 0.4)"
                          : "0 8px 25px rgba(255, 107, 107, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = isFollowing
                          ? "0 6px 20px rgba(150, 150, 150, 0.3)"
                          : "0 6px 20px rgba(255, 107, 107, 0.3)";
                      }}
                    >
                      <i className="fas fa-plus me-2"></i>
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                </div>
              </div>
              {/* Stats Section */}
              <div className="col-md-6">
                <div
                  className="d-flex justify-content-around align-items-center h-100"
                  style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "16px",
                    padding: "2rem 1rem",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="text-center">
                    <div
                      className="display-4 fw-bold mb-2"
                      style={{
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {totalItems}
                    </div>
                    <div
                      className="text-uppercase fw-semibold"
                      style={{
                        fontSize: "0.9rem",
                        letterSpacing: "1px",
                        color: "#6c757d",
                      }}
                    >
                      Total Items
                    </div>
                  </div>
                  {/* Conditionally render the sold items count */}
                  {soldItemsCount > 1 && (
                    <>
                      <div
                        style={{
                          width: "2px",
                          height: "60px",
                          background:
                            "linear-gradient(to bottom, transparent, rgba(108, 117, 125, 0.3), transparent)",
                        }}
                      ></div>
                      <div className="text-center">
                        <div
                          className="display-4 fw-bold mb-2"
                          style={{
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {soldItemsCount}
                        </div>
                        <div
                          className="text-uppercase fw-semibold"
                          style={{
                            fontSize: "0.9rem",
                            letterSpacing: "1px",
                            color: "#6c757d",
                          }}
                        >
                          Sold Items
                        </div>
                      </div>
                    </>
                  )}
                  <div
                    style={{
                      width: "2px",
                      height: "60px",
                      background:
                        "linear-gradient(to bottom, transparent, rgba(108, 117, 125, 0.3), transparent)",
                    }}
                  ></div>
                  <div className="text-center">
                    <div
                      className="display-4 fw-bold mb-2"
                      style={{
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {formattedViewed}
                    </div>
                    <div
                      className="text-uppercase fw-semibold"
                      style={{
                        fontSize: "0.9rem",
                        letterSpacing: "1px",
                        color: "#6c757d",
                      }}
                    >
                      Viewed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="d-flex justify-content-center mb-4">
        <ul className="nav nav-pills gap-2">
          {/* Selling Tab */}
          <li className="nav-item mr-5">
            <a
              className="nav-link px-4 py-2 rounded-pill fw-bold shadow-sm"
              href="#selling"
              style={{
                background: "linear-gradient(135deg, #7b42f6, #6c63ff)",
                color: "white",
                border: "none",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              }}
            >
              Selling {products.length}
            </a>
          </li>
          {/* Reviews Tab */}
          {/* <li className="nav-item">
            <a
              className="nav-link px-4 py-2 rounded-pill border fw-semibold shadow-sm"
              href="#reviews"
              style={{
                color: "#6c63ff",
                borderColor: "#6c63ff",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #6c63ff, #7b42f6)";
                e.target.style.color = "white";
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#6c63ff";
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              }}
            >
              Reviews 15
            </a>
          </li> */}
        </ul>
      </div>
      {/* Products Grid (dynamic) - UPDATED WITH SOLD BADGE */}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-2 col-md-4 col-sm-6 mb-4">
            <div
              className="card h-100 shadow-sm"
              style={{
                opacity: product.is_sold === "1" ? 0.7 : 1,
                backgroundColor: product.is_sold === "1" ? "rgba(255,255,255,0.8)" : "#fff",
                transition: "all 0.3s",
              }}
            >
              {/* Image container with sold overlay */}
              <div
                style={{
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                  height: "150px",
                  background: "#f9f9f9",
                }}
              >
                {/* SOLD overlay */}
                {product.is_sold === "1" && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(255,255,255,0.7)",
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "rgba(220,53,69,0.9)",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: "16px",
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      SOLD
                    </span>
                  </div>
                )}

                {/* Wrap the image with Link for navigation */}
                <Link
                  to={{
                    pathname: `/cartDetails/${encodeURIComponent(
                      product.product_name
                    )}/${product.id}`,
                  }}
                  state={{ product }}
                  onClick={() => {
                    scrollToTop();
                    console.log(
                      "Clicked Product:",
                      product.product_name,
                      "| ID:",
                      product.id
                    );
                  }}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    left: 0,
                    top: 0,
                  }}
                >
                  <img
                    src={
                      product.product_slider_image[0]?.image || defaultAvatarUrl
                    }
                    className="card-img-top"
                    alt={product.product_name}
                    style={{
                      height: "150px",
                      width: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                      filter: product.is_sold === "1" ? "grayscale(50%)" : "none",
                      position: "absolute",
                      left: 0,
                      top: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (product.is_sold !== "1") {
                        e.target.style.transform = "scale(1.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                </Link>
              </div>

              <div className="card-body p-3">
                {/* Make the product name clickable too */}
                <Link
                  to={{
                    pathname: `/cartDetails/${encodeURIComponent(
                      product.product_name
                    )}/${product.id}`,
                  }}
                  state={{ product }}
                  onClick={() => {
                    scrollToTop();
                    console.log(
                      "Clicked Product:",
                      product.product_name,
                      "| ID:",
                      product.id
                    );
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h6
                    className="card-title mb-2"
                    style={{
                      fontSize: "0.9rem",
                      height: "2.2rem",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                      color: product.is_sold === "1" ? "#666" : "inherit",
                    }}
                    onMouseEnter={(e) => {
                      if (product.is_sold !== "1") {
                        e.target.style.color = "#6c63ff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = product.is_sold === "1" ? "#666" : "inherit";
                    }}
                  >
                    {product.product_name}
                  </h6>
                </Link>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span
                      className="fw-bold"
                      style={{
                        color: product.is_sold === "1" ? "#999" : "#000",
                      }}
                    >
                      ₹{product.selling_price}
                    </span>
                    <span
                      className="text-muted text-decoration-line-through ms-2"
                      style={{
                        fontSize: "0.8rem",
                        color: product.is_sold === "1" ? "#ccc" : "#6c757d",
                      }}
                    >
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
