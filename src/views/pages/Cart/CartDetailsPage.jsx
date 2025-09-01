import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Eye,
  Heart,
  Shield,
  ChevronRight,
  Star,
  MessageCircle,
  Share2,
  Gift,
} from "lucide-react";
import card2 from "../../../assets/images/card2.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchModuleData } from "../../../redux/slices/apiSlice";
import { useLocation } from "react-router-dom";
import "./CartDetailsPage.css";
import LoginPopup from "../../../components/loginPopUp/LoginPopUp.jsx";
import { referimg } from "../../../assets/index.js";

const ShareWithFriends = () => {
  return (
    <Card className="border-0 mb-4">
      <Card.Body className="p-3">
        <div className="d-flex align-items-center rounded-3 gap-3 mx-4">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 shadow-none mr-3 "
            style={{
              position: "relative",
            }}
          >
            <img
              src={referimg}
              alt="Share Icon"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
          <div className="flex-grow-1 mx-2">
            <h2 className="fw-bolder text-black mb-1">
              Share item with friends
            </h2>
            <medium className="text-muted">Get 500 Coins when they buy</medium>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const CartDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const exclusiveProducts = "exclusiveProducts";
  const products = "products";
  const getCommentsOnProducts = "getCommentsOnProducts";
  const passedProduct = location.state?.product;
  const { data } = useSelector((state) => state.api);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [comment, setComment] = useState("");
  const freshDealsData = data[products]?.product || [];
  const exclusiveProductData = data[exclusiveProducts]?.product || [];
  const commentsData = data[getCommentsOnProducts]?.comments || [];
  const allProducts = Array.isArray(data?.products)
    ? data.products
    : Array.isArray(data?.product)
    ? data.product
    : [];
  const product =
    allProducts.find((item) => String(item.id) === String(id)) || passedProduct;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const getSellerName = () => {
    if (!product) return "Unknown Seller";
    return product.seller_name || product.username || "Unknown Seller";
  };

  useEffect(() => {
    dispatch(
      fetchModuleData({
        module_action: exclusiveProducts,
        params: { limit: 6 },
      })
    );
    dispatch(
      fetchModuleData({ module_action: products, params: { limit: 12 } })
    );
    fetchComments(1);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch, id]);

  const fetchComments = async (pageNo = 1, reset = true) => {
    try {
      setCommentsLoading(true);
      const user_id = localStorage.getItem("user_id") || "";
      await dispatch(
        fetchModuleData({
          module_action: getCommentsOnProducts,
          params: {
            user_id: user_id,
            product_id: id,
            limit: 10,
            page_no: pageNo,
          },
        })
      );
      setTimeout(() => {
        const newComments = data[getCommentsOnProducts]?.result || [];
        if (reset) {
          setComments(newComments);
        } else {
          setComments((prev) => [...prev, ...newComments]);
        }
        setHasMoreComments(newComments.length === 10);
        setCommentsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setCommentsLoading(false);
    }
  };

  const loadMoreComments = () => {
    if (!commentsLoading && hasMoreComments) {
      const nextPage = commentsPage + 1;
      setCommentsPage(nextPage);
      fetchComments(nextPage, false);
    }
  };

  useEffect(() => {
    const newComments = data[getCommentsOnProducts]?.result || [];
    if (newComments.length > 0) {
      setComments(newComments);
      setCommentsLoading(false);
    }
  }, [data[getCommentsOnProducts]]);

  useEffect(() => {
    console.log("Redux Data after fetch:", data);
    console.log("Matched product:", product);
    console.log("Comments:", comments);
  }, [data, comments]);

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const handleBuyNowClick = () => {
    const device_token = localStorage.getItem("device_token");
    if (!device_token || device_token.trim() === "") {
      console.log("User not logged in, opening login popup");
      setIsLoginPopupOpen(true);
      return;
    }
    navigate("/checkout", { state: { product } });
  };

  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
    navigate("/checkout", { state: { product } });
    window.dispatchEvent(new Event("authChange"));
  };

  if (!product) {
    console.log("Product not found for ID:", id);
    return <p className="text-center mt-5">Product not found</p>;
  }

  const productImages = product.product_slider_image || [card2, card2, card2];
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatCommentDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <>
      <Container fluid className="py-4" style={{ maxWidth: "1600px" }}>
        <Row>
          <div className="col-xl-2 pe-2 p-0 d-xl-block d-none">
            <div className="d-flex flex-column gap-2">
              {loading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton key={idx} height={180} width="100%" />
                  ))
                : productImages.map((img, idx) => (
                    <div
                      key={img.image_id || idx}
                      className={`cursor-pointer ${
                        selectedImage === idx ? "" : ""
                      }`}
                      onMouseEnter={() => setSelectedImage(idx)}
                      style={{ cursor: "pointer", overflow: "hidden" }}
                    >
                      <img
                        src={img.image || card2}
                        alt={`Thumbnail ${idx}`}
                        className={`img-fluid p-3 thumbnail-image ${
                          selectedImage !== idx ? "blurred" : ""
                        }`}
                        style={{
                          height: "180px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-12 px-2">
            {loading ? (
              <Skeleton height={800} width="100%" />
            ) : (
              <Card className="border-light">
                <Card.Img
                  className="card-image"
                  variant="top"
                  src={productImages[selectedImage]?.image || card2}
                  alt="Main product view"
                />
              </Card>
            )}
          </div>
          <div className="col-12 d-xl-none d-block mt-3 order-lg-3 order-md-3">
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              {loading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton key={idx} height={100} width={100} />
                  ))
                : productImages.map((img, idx) => (
                    <div
                      key={img.image_id || idx}
                      className={`cursor-pointer ${
                        selectedImage === idx ? "" : ""
                      }`}
                      onClick={() => setSelectedImage(idx)}
                      style={{ cursor: "pointer", overflow: "hidden" }}
                    >
                      <img
                        src={img.image || card2}
                        alt={`Thumbnail ${idx}`}
                        className={`img-fluid p-2 thumbnail-image ${
                          selectedImage !== idx ? "blurred" : ""
                        }`}
                        style={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                          border:
                            selectedImage === idx
                              ? "2px solid #ffd60a"
                              : "2px solid transparent",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  ))}
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-12 ps-4 mt-2 order-lg-2 order-md-2">
            {loading ? (
              <>
                <Skeleton height={20} width={200} />
                <Skeleton height={30} width={150} className="my-3" />
                <Skeleton height={20} width={100} />
                <Skeleton height={20} width={100} className="my-2" />
                <Skeleton height={20} width={100} />
                <Skeleton height={50} width="100%" className="my-3" />
                <Skeleton height={150} width="100%" className="my-3" />
              </>
            ) : (
              <>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="d-flex align-items-center gap-1 mx-2">
                    <Eye size={16} className="text-muted m" />
                    <small className="text-muted">
                      {product.seen_count || 18}
                    </small>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <Heart size={16} className="text-muted" />
                    <small className="text-muted">
                      Liked by {getSellerName()} & 3 others
                    </small>
                  </div>
                </div>
                <h2 className="fw-bold mb-3 fs-4">{product.product_name}</h2>
                <div className="mb-2">
                  <div>
                    <span className="fw-semibold text-dark">Condition: </span>
                    <span className="text-success fw-semibold">
                      {product.condition}
                    </span>
                  </div>
                  <div>
                    <span className="fw-semibold text-dark">Size: </span>
                    <span className="text-dark">{product.size}</span>
                    <p>
                      <strong>Pickup Location:</strong> {product.pickup_address}
                    </p>
                  </div>
                  <div className="mb-3">
                    <span className="text-success fw-bold fs-4">
                      ₹{product.selling_price}
                    </span>
                    <del>
                      <span className="text-muted text-decoration-line-through ms-2 mx-1">
                        ₹{product.mrp}
                      </span>
                    </del>
                  </div>
                </div>
                <Card className="border mb-4">
                  <Card.Body className="p-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-start gap-3">
                        <div className="bg-light p-3 rounded-pill">
                          <Shield className="text-primary" size={18} />
                        </div>
                        <div>
                          <div
                            className="fw-semibold mb-1 mx-2"
                            style={{ fontSize: "14px" }}
                          >
                            Your money is safe with us!
                          </div>
                          <small className="text-muted mx-2">
                            Get item as described or receive your money back!{" "}
                            <Link
                              to="/buyer-protection"
                              className="text-primary fw-semibold text-decoration-none"
                            >
                              Return & Refund
                            </Link>
                          </small>
                        </div>
                      </div>
                      <ChevronRight className="text-muted" size={20} />
                    </div>
                  </Card.Body>
                </Card>
                <Button
                  className="w-100 fw-bold py-3 mb-3 border-0"
                  style={{
                    backgroundColor: "#66e48c",
                    color: "#000",
                    fontSize: "16px",
                  }}
                  onClick={handleBuyNowClick}
                >
                  Buy now ₹{product.selling_price}
                </Button>
                <Row className="mb-2">
                  {[
                    {
                      label: "Category",
                      value:
                        product.cat_name || "Women > Coats, Jackets & Sweats",
                    },
                    { label: "Place of Origin", value: "India" },
                    { label: "Fabric", value: product.fabric || "Denim" },
                    { label: "Colour", value: "Blue" },
                    { label: "Style", value: "Casual" },
                    { label: "Shape", value: "Bomber" },
                    { label: "Embellishment", value: "-" },
                    { label: "Pattern", value: "-" },
                    { label: "Weight", value: product.weight || "Under 2 kg" },
                  ].map((spec, index) => (
                    <Col xs={4} key={index} className="mb-3">
                      <div>
                        <small
                          className="text-muted d-block fw-semibold"
                          style={{ fontSize: "14px" }}
                        >
                          {spec.label}
                        </small>
                        <small
                          className="fw-bold text-dark"
                          style={{ fontSize: "13px" }}
                        >
                          {spec.value}
                        </small>
                      </div>
                    </Col>
                  ))}
                </Row>
                <div className="border-top">
                  <small className="text-muted" style={{ fontSize: "12px" }}>
                    From Konkan Division, Maharashtra
                  </small>
                </div>
              </>
            )}
          </div>
        </Row>
        <Row className="mt-5">
          <Col xs={12}>
            {loading ? (
              <>
                <Skeleton circle height={60} width={60} />
                <Skeleton height={20} width={200} className="my-2" />
                <Skeleton height={20} width={300} className="my-2" />
                <Skeleton height={20} width="100%" className="my-3" />
                <Skeleton height={50} width="100%" className="my-3" />
              </>
            ) : (
              <>
                <Link
                  to={`/user-profile/${product.seller_id || product.user_id}`}
                  state={{
                    sellerId: product.seller_id || product.user_id,
                    sellerName: getSellerName(),
                  }}
                  className="text-decoration-none text-black"
                >
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <img
                          src={
                            product.seller_profile_image ||
                            product.user_profile_image ||
                            card2
                          }
                          alt={getSellerName()}
                          className="rounded-circle"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="mx-2">
                        <div>
                          <h5 className="mb-1 fw-bold">{getSellerName()}</h5>
                          <p className="" style={{ fontSize: "10px" }}>
                            Active {Math.floor(Math.random() * 50) + 1} mins ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        className="text-muted mb-4"
                        style={{ fontSize: "14px" }}
                      >
                        {product.product_detail ||
                          "Closet refresh in progress! Expect pre-loved pieces, impulse purchases, and items too good to sit in storage. Style range: comfy, cute, and occasionally confused"}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="d-lg-flex align-items-center gap-4 mb-4 border justify-content-around p-3">
                  <div className="d-flex align-items-center gap-1">
                    <Star
                      className="text-warning"
                      size={16}
                      fill="currentColor"
                    />
                    <span className="fw-bold rateNo">5.00</span>
                  </div>
                  <div>
                    <span className="fw-bold rateNo">5</span>
                    <small className="text-muted ms-1 rateTxt">Sold</small>
                  </div>
                  <div>
                    <span className="fw-bold rateNo">49</span>
                    <small className="text-muted ms-1 rateTxt">
                      days on Flipzy
                    </small>
                  </div>
                  <div>
                    <span className="fw-bold rateNo">16</span>
                    <small className="text-muted ms-1 rateTxt">available</small>
                  </div>
                </div>
              </>
            )}
            {loading ? (
              <Row className="g-3 mb-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div className="col-sm-2" key={idx}>
                    <Skeleton height={280} width="100%" />
                  </div>
                ))}
              </Row>
            ) : (
              <Row className="g-3 mb-5">
                {exclusiveProductData.map((product) => (
                  <div className="col-sm-2" key={product.id}>
                    <Card className="h-100 border-light">
                      <Link
                        to={{
                          pathname: `/cartDetails/${encodeURIComponent(
                            product.product_name
                          )}/${product.id}`,
                        }}
                        state={{ product }}
                        onClick={scrollToTop}
                      >
                        <Card.Img
                          variant="top"
                          src={product.product_slider_image[0].image}
                          style={{ height: "280px", objectFit: "cover" }}
                        />
                      </Link>
                      <Card.Body className="p-2">
                        <Card.Text
                          className="small m-0 text-dark fw-semibold"
                          style={{ fontSize: "12px" }}
                        >
                          {product.product_name}
                        </Card.Text>
                        <div className="d-flex align-items-center gap-2">
                          <small
                            className="text-muted text-decoration-line-through"
                            style={{ fontSize: "10px" }}
                          >
                            {product.selling_price}
                          </small>
                          <span
                            className="fw-bold text-success mx-1"
                            style={{ fontSize: "10px" }}
                          >
                            <del>{product.mrp}</del>
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Row>
            )}
            <ShareWithFriends />
            {!loading && comments.length >= 1 && (
              <div>
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <MessageCircle size={18} className="mr-2" />
                  COMMENTS {comments.length > 0 && `(${comments.length})`}
                </h6>

                {commentsLoading && comments.length === 0 ? (
                  <div className="mx-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="d-flex align-items-start gap-3 p-3 border-bottom"
                      >
                        <Skeleton circle height={50} width={50} />
                        <div className="flex-grow-1">
                          <Skeleton height={20} width={120} className="mb-1" />
                          <Skeleton height={16} width="80%" />
                          <Skeleton height={12} width={80} className="mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mx-4">
                    {comments.map((comment, index) => (
                      <div
                        key={comment.id || index}
                        className="d-flex align-items-start gap-3 p-3 border-bottom rounded"
                      >
                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            flexShrink: 0,
                          }}
                        >
                          {comment.user_profile_image ? (
                            <img
                              src={comment.user_profile_image}
                              alt={comment.user_name || "User"}
                              className="rounded-circle"
                              style={{
                                width: "35px",
                                height: "35px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                              style={{ width: "35px", height: "35px" }}
                            >
                              {comment.user_name
                                ? comment.user_name.charAt(0).toUpperCase()
                                : "U"}
                            </div>
                          )}
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <p
                              className="mb-0 mr-2 fw-semibold"
                              style={{ fontSize: "14px" }}
                            >
                              {comment.user_name || "Anonymous User"}
                            </p>
                            <small
                              className="text-muted"
                              style={{ fontSize: "12px" }}
                            >
                              {formatCommentDate(
                                comment.created_at || comment.comment_date
                              )}
                            </small>
                          </div>
                          <div
                            className="text-dark"
                            style={{ fontSize: "14px" }}
                          >
                            {comment.comment_text || comment.comment}
                          </div>
                        </div>
                      </div>
                    ))}

                    {hasMoreComments && (
                      <div className="text-center mt-3">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={loadMoreComments}
                          disabled={commentsLoading}
                        >
                          {commentsLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" />
                              Loading...
                            </>
                          ) : (
                            "Load More Comments"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
        <div className="row mt-4">
          <div className="col-12 text-center mb-4">
            <h2 className="fw-bold" style={{ fontSize: "2rem", color: "#333" }}>
              <span style={{ color: "#ff6b9d" }}>❤️</span> You May Also{" "}
              <span style={{ fontWeight: "bold" }}>Like</span>
            </h2>
            <div
              className="mx-auto mt-2"
              style={{
                width: "60px",
                height: "4px",
                backgroundColor: "#ffd700",
                borderRadius: "2px",
              }}
            ></div>
          </div>
        </div>
        {loading ? (
          <Row className="g-3 mb-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div className="col-sm-2" key={idx}>
                <Skeleton height={280} width="100%" />
              </div>
            ))}
          </Row>
        ) : (
          <Row className="g-3 mb-5">
            {freshDealsData.map((product) => (
              <div className="col-sm-2" key={product.id}>
                <Card className="h-100 border-0 mt-4">
                  <Link
                    to={{
                      pathname: `/cartDetails/${encodeURIComponent(
                        product.product_name
                      )}/${product.id}`,
                    }}
                    state={{ product }}
                    onClick={scrollToTop}
                  >
                    <Card.Img
                      variant="top"
                      src={product.product_slider_image[0].image}
                      style={{ height: "280px", objectFit: "cover" }}
                    />
                  </Link>
                  <Card.Body className="p-2">
                    <Card.Text
                      className="small m-0 text-dark fw-semibold"
                      style={{ fontSize: "12px" }}
                    >
                      {product.product_name}
                    </Card.Text>
                    <div className="d-flex align-items-center gap-2">
                      <small
                        className="text-muted text-decoration-line-through"
                        style={{ fontSize: "10px" }}
                      >
                        ₹{product.mrp}
                      </small>
                      <span
                        className="fw-bold text-success mx-1"
                        style={{ fontSize: "12px" }}
                      >
                        ₹{product.selling_price}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
        )}
      </Container>
      <LoginPopup
        show={isLoginPopupOpen}
        handleClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

const onAddComment = (commentText) => {
  console.log("Adding comment:", commentText);
};

export default CartDetailsPage;
