import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Eye, Heart, Shield, ChevronRight, Star, MessageCircle, Share2, Gift } from 'lucide-react';
import card2 from '../../assets/images/card2.png';
import cardB1 from '../../assets/images/cardB1.png';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { CartDetails } from ".";
import { useLocation } from "react-router-dom";

const CartDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const passedProduct = location.state?.product;
  const { data } = useSelector((state) => state.api);

  const allProducts = Array.isArray(data?.products)
    ? data.products
    : Array.isArray(data?.product)
    ? data.product
    : [];

  const product = allProducts.find((item) => String(item.id) === String(id)) || passedProduct;

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    console.log("Fetching product details for ID:", id);
    if (id) {
      dispatch(
        fetchModuleData({
          module_action: "exclusiveProductData",
          params: { id: id },
        })
      );
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Redux Data after fetch:", data);
    console.log("Matched product:", product);
  }, [data]);

  if (!product) {
    console.log("Product not found for ID:", id);
    return <p className="text-center mt-5">Product not found</p>;
  }

  const productImages = product.product_slider_image || [card2, card2, card2];

  const products = [
    {
      id: 1,
      name: "Flower Print Elegant Kurti",
      price: "900 Coins",
      originalPrice: "₹598",
      image: cardB1,
      badge: null
    },
    {
      id: 2,
      name: "Babyhug Steel Water Bottle",
      price: "₹198",
      originalPrice: "₹300",
      image: card2,
      badge: null
    },
    {
      id: 3,
      name: "POND'S Bright Miracle Detox Facewash with...",
      price: "1500 Coins",
      originalPrice: "₹52",
      image: cardB1,
      badge: null
    },
    {
      id: 4,
      name: "BOTTLE GREEN 💚 BODYCON DRESS",
      price: "447 Coins",
      originalPrice: "₹699",
      image: card2,
      badge: null
    },
    {
      id: 5,
      name: "Charcoal Grey Heeled Boots",
      price: "3000 Coins",
      originalPrice: "₹2500",
      image: cardB1,
      badge: null
    },
    {
      id: 6,
      name: "Zara White Shirt",
      price: "₹2400",
      originalPrice: "₹2999",
      image: card2,
      badge: null
    },
    {
      id: 7,
      name: "Noise Air Buds",
      price: "900 Coins",
      originalPrice: "₹1999",
      image: cardB1,
      badge: null
    },
    {
      id: 8,
      name: "Cute Hand Knitted Sling Bag",
      price: "599 Coins",
      originalPrice: "₹999",
      image: card2,
      badge: null
    },
    {
      id: 9,
      name: "Floral Printed Kurti",
      price: "2000 Coins",
      originalPrice: "₹899",
      image: cardB1,
      badge: null
    },
    {
      id: 10,
      name: "ESBEDA Black Handbag With Sling Belt",
      price: "₹699",
      originalPrice: "₹1299",
      image: card2,
      badge: null
    },
    {
      id: 11,
      name: "GOLD PLATED HOOP EARRINGS ✨",
      price: "₹300",
      originalPrice: "₹699",
      image: cardB1,
      badge: null
    },
    {
      id: 12,
      name: "Silent ❤️ 💙 Bag",
      price: "₹250",
      originalPrice: "₹599",
      image: card2,
      badge: null
    }
  ];

  const productDetails = {
    title: "Light Blue Distressed Denim Jacket – Size XL",
    price: "₹400",
    condition: "Like New",
    size: "Bust 36in",
    description: "Elevate your casual look with this classic light blue denim jacket featuring trendy distressed detailing on the front and back. A must-have layering piece for street-style lovers",
    likes: "18",
    likedBy: "gu_tm & 3 others"
  };

  const specifications = [
    { label: "Category", value: "Women > Coats, Jackets & Sweats" },
    { label: "Place of Origin", value: "India" },
    { label: "Fabric", value: "Denim" },
    { label: "Colour", value: "Blue" },
    { label: "Style", value: "Casual" },
    { label: "Shape", value: "Bomber" },
    { label: "Embellishment", value: "-" },
    { label: "Pattern", value: "-" },
    { label: "Weight", value: "Under 2 kg" }
  ];

  const sellerItems = [
    {
      id: 1,
      image: card2,
      title: "Classic Beige Tapered Trousers",
      price: "₹600",
      originalPrice: "₹999"
    },
    {
      id: 2,
      image: card2,
      title: "Cherry Bloom Ruched Mini Dress",
      price: "₹350",
      originalPrice: "₹699"
    },
    {
      id: 3,
      image: card2,
      title: "Peach Blossom Co-ord Set",
      price: "₹600",
      originalPrice: "₹999"
    },
    {
      id: 4,
      image: card2,
      title: "Nike Women's Training Sports Bra",
      price: "₹500",
      originalPrice: "₹799"
    },
    {
      id: 5,
      image: card2,
      title: "Vibrant Backless Tie-Up Crop Top - Fiery Pink",
      price: "₹350",
      originalPrice: "₹599"
    },
    {
      id: 6,
      image: card2,
      title: "Lavender Summer Dress 💜",
      price: "₹300",
      originalPrice: "₹599"
    }
  ];

  return (
    <Container fluid className="py-4" style={{ maxWidth: '1600px' }}>
      <Row>
        {/* Left Column - Thumbnail Images */}
        <div className="col-sm-2 pe-2 p-0">
          <div className="d-flex flex-column gap-2">
            {productImages.map((img, idx) => (
              <div
           key={img.image_id}
                className={`cursor-pointer ${selectedImage === idx ? "border border-primary" : ""}`}
                onClick={() => {
                  setSelectedImage(idx);
                  console.log("Selected Image Index:", idx);
                }}
                style={{ cursor: 'pointer', overflow: 'hidden' }}
              >
                <img
                 src={img.image}
                  alt={`Thumbnail ${idx}`}
                  className="img-fluid p-3"
                  style={{ height: '180px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Middle Column - Main Product Image */}
        <div className="col-sm-5 px-2">
          <Card className="border-light">
            <Card.Img
              variant="top"
          src={productImages[selectedImage]?.image}
              alt="Main product view"
              style={{ height: '800px', objectFit: 'cover' }}
            />
          </Card>
        </div>
        {/* Right Column - Product Details */}
        <div className="col-sm-5 ps-4 mt-2">
          {/* Likes and Views */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="d-flex align-items-center gap-1 mx-2">
              <Eye size={16} className="text-muted m" />
              <small className="text-muted">{productDetails.likes}</small>
            </div>
            <div className="d-flex align-items-center gap-1">
              <Heart size={16} className="text-muted" />
              <small className="text-muted">Liked by {productDetails.likedBy}</small>
            </div>
          </div>
          {/* Product Title */}
          <h2 className="fw-bold mb-3 fs-4">{product.product_name}</h2>
          {/* Product Description */}
          {/* <p className="text-muted m-0 mb-2 " style={{ fontSize: '12px' }}>
            {productDetails.description}
          </p> */}
          {/* Condition and Size */}
          <div className="mb-2">
            <div className="">
              <span className="fw-semibold text-dark">Condition: </span>
              <span className="text-success fw-semibold">{product.condition}</span>
            </div>
            <div>
              <span className="fw-semibold text-dark">Size: </span>
              <span className="text-dark">{product.size}</span>
              <p>
                <strong>Pickup Location:</strong> {product.pickup_address}
              </p>
            </div>
             <div className="mb-3 ">
                    <span className="text-success fw-bold fs-4">
                      ₹{product.selling_price}
                    </span>
                    <del>
                    <span className="text-muted text-decoration-line-through ms-2 mx-1">
                      ₹{product.mrp}
                    </span></del>
                  </div>
          </div>
          {/* Money Back Guarantee */}
          <Card className="border mb-4">
            <Card.Body className="p-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-light p-3 rounded-pill">
                    <Shield className="text-primary" size={18} />
                  </div>
                 
                  <div>
                    <div className="fw-semibold mb-1 mx-2" style={{ fontSize: '14px' }}>
                      Your money is safe with us!
                    </div>
                    <small className="text-muted mx-2">
                      Get item as described or receive your money back!{' '}
                      <span className="text-primary fw-semibold">Return & Refund</span>
                    </small>
                  </div>
                </div>
                <ChevronRight className="text-muted" size={20} />
              </div>
            </Card.Body>
          </Card>
          {/* Buy Now Button */}
          <Button
            className="w-100 fw-bold py-3 mb-3 border-0"
            style={{
              backgroundColor: '#ffd60a',
              color: '#000',
              fontSize: '16px'
            }}
          >
            Buy now  ₹{product.selling_price}
          </Button>
          {/* Product Specifications */}
          <Row className="mb-2">
            {specifications.map((spec, index) => (
              <Col xs={4} key={index} className="mb-3">
                <div>
                  <small className="text-muted d-block fw-semibold" style={{ fontSize: '14px' }}>
                    {spec.label}
                  </small>
                  <small className="fw-bold text-dark" style={{ fontSize: '13px' }}>
                    {spec.value}
                  </small>
                </div>
              </Col>
            ))}
          </Row>
          {/* Seller Information */}
          <div className="border-top">
            <small className="text-muted" style={{ fontSize: '12px' }}>
              From Konkan Division, Maharashtra
            </small>
          </div>
        </div>
      </Row>
      <Row className="mt-5">
        <Col xs={12}>
          <div className=''>
            {/* Seller Profile Section */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px' }}
              >
                <img
                  src={card2}
                  alt="komal_001"
                  className="rounded-circle"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </div>
              <div className='mx-2'>
                <div>
                  <h5 className="mb-1 fw-bold">komal_001</h5>
                  <p className="" style={{ fontSize: "10px" }}>Active 34 mins ago</p>
                </div>
              </div>
            </div>
            <div className=''>
              <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                Closet refresh in progress! Expect pre-loved pieces, impulse purchases, and items too good to sit in storage. Style range: comfy, cute, and occasionally confused
              </p>
            </div>
          </div>
          {/* Stats */}
          <div className="d-lg-flex align-items-center gap-4 mb-4 border justify-content-around p-3">
            <div className="d-flex align-items-center gap-1">
              <Star className="text-warning" size={16} fill="currentColor" />
              <span className="fw-bold">5.00</span>
            </div>
            <div>
              <span className="fw-bold">5</span>
              <small className="text-muted ms-1">Sold</small>
            </div>
            <div>
              <span className="fw-bold">49</span>
              <small className="text-muted ms-1">days on FreeUp</small>
            </div>
            <div>
              <span className="fw-bold">16</span>
              <small className="text-muted ms-1">available</small>
            </div>
          </div>
          {/* Seller Items Grid */}
          <Row className="g-3 mb-5">
            {sellerItems.map((item) => (
              <div className='col-sm-2' key={item.id}>
                <Card className="h-100 border-light">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ height: '280px', objectFit: 'cover' }}
                  />
                  <Card.Body className="p-2">
                    <Card.Text
                      className="small m-0 text-dark fw-semibold"
                      style={{ fontSize: '12px' }}
                    >
                      {item.title}
                    </Card.Text>
                    <div className="d-flex align-items-center gap-2">
                      <small className="text-muted text-decoration-line-through" style={{ fontSize: '10px' }}>
                        {item.price}
                      </small>
                      <span className="fw-bold text-success mx-1" style={{ fontSize: '10px' }}>
                        <del>{item.originalPrice}</del>
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
          {/* Share Section */}
          <Card className="border-0 mb-4">
            <Card.Body className="p-3">
              <div className="d-flex align-items-center gap-3 mx-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(45deg, #ffd60a, #ff8500)'
                  }}
                >
                  <Gift className="text-white" size={24} />
                </div>
                <div className="flex-grow-1 mx-2">
                  <div className="fw-bold mb-1">Share item with friends</div>
                  <small className="text-muted">Get 500 Coins when they buy</small>
                </div>
              </div>
            </Card.Body>
          </Card>
          {/* Buyer Offers Section */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">BUYER OFFERS</h6>
            <div className="d-flex align-items-center gap-3 p-3 border-bottom rounded mx-4">
              <div
                className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold"
                style={{ width: '50px', height: '50px' }}
              >
                D
              </div>
              <div className="">
                <p className="align-items-center mt-5 mx-2" style={{}}>dr_sonal_agarwal</p>
                <small className="text-muted mx-2">140?</small>
              </div>
            </div>
          </div>
          {/* Comments Section */}
          <div>
            <h6 className="fw-bold mb-3">COMMENTS</h6>
            <div className="d-flex align-items-start gap-3 p-3 border-bottom rounded mx-4">
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                style={{ width: '50px', height: '50px' }}
              >
                <img
                  src={card2}
                  alt="komal_001"
                  className="rounded-circle"
                  style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                />
              </div>
              <div className="">
                <p className="align-items-center mt-2 mx-2" style={{}}>komal_001</p>
                <small className="text-muted">@dr_sonal_agarwal is your offer 340 or 140?</small>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="row mt-4">
        <div className="col-12 text-center mb-4">
          <h2 className="fw-bold" style={{ fontSize: '2rem', color: '#333' }}>
            <span style={{ color: '#ff6b9d' }}>❤️</span> You May Also <span style={{ fontWeight: 'bold' }}>Like</span>
          </h2>
          <div
            className="mx-auto mt-2"
            style={{
              width: '60px',
              height: '4px',
              backgroundColor: '#ffd700',
              borderRadius: '2px'
            }}
          ></div>
        </div>
      </div>
      {/* Products Grid */}
      <Row className="g-3 mb-5">
        {products.map((product) => (
          <div className='col-sm-2' key={product.id}>
            <Card className="h-100 border-0 mt-4">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '280px', objectFit: 'cover' }}
              />
              <Card.Body className="p-2">
                <Card.Text
                  className="small m-0 text-dark fw-semibold"
                  style={{ fontSize: '12px' }}
                >
                  {product.name}
                </Card.Text>
                <div className="d-flex align-items-center gap-2">
                  <small className="text-muted text-decoration-line-through" style={{ fontSize: '10px' }}>
                    {product.price}
                  </small>
                  <span className="fw-bold text-success mx-1" style={{ fontSize: '10px' }}>
                    <del>{product.originalPrice}</del>
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default CartDetailsPage;
