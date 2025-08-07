import React, { useState, useRef, useEffect } from "react";
import {
  Instagram,
  Youtube,
  Linkedin,
  CheckCircle,
  Leaf,
  Gift,
} from "lucide-react";

const CompleteLandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollContainerRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "nishita bhasin",
      date: "9/27/22",
      rating: 5,
      text: "This is an excellent app with a bigger purpose for spreading happiness in the society and preserving nature through sustainability. It gives all of us an opportunity to sell our pre loved goods and let others enjoy it and similarly buy from others within the community. It not only gives people a way to share but also is helping with recycling of stuff. The app interface is very intelligently thought through too and very smooth. I would encourage all my friends and others reading it to try it.",
    },
    {
      id: 2,
      name: "Harshitha Pp",
      date: "11/15/22",
      rating: 5,
      text: "This is a novel concept that I have ever seen. Really satisfied with this application. One is able to purchase favourite items freely by providing the coins and we can also sell our items. Since both the positive and negative side of the product is explained by most of the sellers there is no trust issues. Wish to go on with this app forever 👍",
    },
    {
      id: 3,
      name: "Krithika Manishanker",
      date: "11/24/22",
      rating: 5,
      text: "The cost of items are relatively reasonable being second hand ofcourse, the collection and variety of items are very vast. It's a very useful space for students who are not earning and looking to save some bucks!",
    },
    {
      id: 4,
      name: "Rahul Kumar",
      date: "12/15/22",
      rating: 5,
      text: "Amazing platform for sustainable shopping! Love how I can exchange items I no longer need for coins and buy new things. The community is very supportive and the delivery is always on time.",
    },
    {
      id: 5,
      name: "Anjali Sharma",
      date: "01/10/23",
      rating: 5,
      text: "Great concept and execution! The coin system makes shopping fun and affordable. Customer service is excellent and I've had great experiences both buying and selling on this platform.",
    },
    {
      id: 6,
      name: "Priya Singh",
      date: "01/10/23",
      rating: 5,
      text: "Fantastic experience! The app is user-friendly and the community is amazing. Love the sustainable approach and the coin system makes it very engaging.",
    },
    {
      id: 7,
      name: "Rohit Gupta",
      date: "01/10/23",
      rating: 5,
      text: "Great concept and execution! The coin system makes shopping fun and affordable. Customer service is excellent and I've had great experiences both buying and selling on this platform.",
    },
  ];

  const socialLinks = [
    {
      platform: "Instagram",
      handle: "@freeup_app",
      icon: <Instagram size={40} />,
      bgColor:
        "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
      textColor: "white",
    },
    {
      platform: "Youtube",
      handle: "@FreeUpApp_ShopSellEarn",
      icon: <Youtube size={40} />,
      bgColor: "rgb(239 127 127)",
      textColor: "white",
    },
    {
      platform: "LinkedIn",
      handle: "@company/freeup",
      icon: <Linkedin size={40} />,
      bgColor: "rgb(141 211 247)",
      textColor: "white",
    },
  ];

  const features = [
    {
      icon: <CheckCircle size={50} />,
      title: "Doorstep Convenience",
    },
    {
      icon: <Leaf size={50} />,
      title: "Sustainability Enabled",
    },
    {
      icon: <Gift size={50} />,
      title: "Rewards Guaranteed",
    },
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = 350;
    const containerWidth = container.offsetWidth;
    const centerOffset = containerWidth / 2;

    const newActiveIndex = Math.round(
      (scrollLeft + centerOffset - itemWidth / 2) / itemWidth
    );
    const clampedIndex = Math.max(
      0,
      Math.min(newActiveIndex, reviews.length - 1)
    );

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  };

  const handleCardClick = (index) => {
    scrollToItem(index);
  };

  const scrollToItem = (index) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const itemWidth = 350;
    const containerWidth = container.offsetWidth;
    const scrollPosition =
      index * itemWidth - containerWidth / 2 + itemWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToItem(Math.floor(reviews.length / 2));
      setActiveIndex(Math.floor(reviews.length / 2));
    }, 100);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`${i < rating ? "text-success" : "text-muted"}`}
        style={{ fontSize: "14px" }}
      >
        ★
      </span>
    ));
  };

  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  const getAvatarColor = (index) => {
    const colors = ["#e74c3c", "#3498db", "#9b59b6", "#f39c12", "#2ecc71"];
    return colors[index % colors.length];
  };

  return (
    <div>
      {/* Community Reviews Section */}
      <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
        <div className="container p-0">
          <div className="text-center mb-5">
            <h2 className="display-6 mb-3 text-dark fw-bold">
              ❤️ From Our Community
            </h2>
            <div
              className="mx-auto"
              style={{
                width: "60px",
                height: "3px",
                backgroundColor: "#ffc107",
              }}
            ></div>
          </div>

          <div className="position-relative">
            <div
              ref={scrollContainerRef}
              className="d-flex overflow-x-auto custom-scrollbar"
              onScroll={handleScroll}
              style={{ scrollBehavior: "smooth" }}
            >
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="review-card-container"
                  style={{
                    width: "330px",
                    minWidth: "380px",
                    cursor: "pointer",
                    padding: "5px",
                    transform:
                      index === activeIndex ? "scale(1.05)" : "scale(0.95)",
                    transformOrigin: "center center",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity: index === activeIndex ? 1 : 0.8,
                    zIndex: index === activeIndex ? 10 : 1,
                    position: "relative",
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <div
                    className="card border-0 shadow-lg h-100"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#2c2c2e",
                      color: "white",
                      overflow: "hidden",
                      height: index === activeIndex ? "420px" : "380px",
                      transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="card-body p-4 d-flex flex-column h-100">
                      <div className="d-flex align-items-start mb-3 flex-shrink-0">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: "45px",
                            height: "45px",
                            minWidth: "45px",
                            backgroundColor: getAvatarColor(index),
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "white",
                          }}
                        >
                          {getUserInitials(review.name)}
                        </div>
                        <div className="flex-grow-1" style={{ minWidth: 0 }}>
                          <h6 className="mb-1 text-white fw-semibold text-truncate">
                            {review.name}
                          </h6>
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center">
                              {renderStars(review.rating)}
                            </div>
                            <small className="text-light opacity-75 ms-2">
                              {review.date}
                            </small>
                          </div>
                        </div>
                        <div className="dropdown flex-shrink-0">
                          <button
                            className="btn btn-link text-light p-0 border-0"
                            style={{ fontSize: "20px", lineHeight: 1 }}
                          >
                            ⋮
                          </button>
                        </div>
                      </div>

                      <div className="flex-grow-1 d-flex align-items-start">
                        <p
                          className="text-light mb-0"
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.5",
                            opacity: "0.95",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: index === activeIndex ? 10 : 8,
                            WebkitBoxOrient: "vertical",
                            wordWrap: "break-word",
                          }}
                        >
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-dark mb-3">
              Follow Us On Social Media
            </h2>
            <div
              className="mx-auto"
              style={{
                width: "60px",
                height: "3px",
               backgroundColor: "#00c853"

              }}
            ></div>
          </div>

          <div className="row justify-content-center g-4">
            {socialLinks.map((social, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div
                  className="d-flex align-items-center p-3 social-item"
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    borderRadius: "15px",
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-5"
                    style={{
                      width: "70px",
                      height: "70px",
                      background: social.bgColor,
                      color: social.textColor,
                      flexShrink: 0,
                    }}
                  >
                    {social.icon}
                  </div>
                  <div className="text-start mx-auto">
                    <h5 className="fw-bold mb-1 text-dark">
                      {social.platform}
                    </h5>
                    <p className="text-muted mb-0">{social.handle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: "#fff3cd" }}>
        <div className="container">
          <div className="row justify-content-center g-5">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="text-center">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#00c853",
                      color: "white",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h5 className="fw-bold mb-3 text-dark ">{feature.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar {
          overflow-x: auto;
          scrollbar-width: auto;
          scrollbar-color: rgb(68, 68, 68) #f8f9fa;
          -webkit-overflow-scrolling: touch;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          height: 12px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 10px;
          margin: 0 20px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #ffc107, #ffb300);
          border-radius: 10px;
          border: 2px solid #f8f9fa;
          min-width: 40px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #ffb300, #ff8f00);
          box-shadow: 0 2px 8px rgba(255, 193, 7, 0.4);
        }
        
        .review-card-container:hover .card {
          transform: translateY(-4px) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.3) !important;
        }

        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        
        .hover-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-item:hover {
          transform: translateX(10px);
          background-color: rgba(255, 193, 7, 0.1);
        }

        @media (max-width: 768px) {
          .display-6 {
            font-size: 1.8rem !important;
          }
          
          .custom-scrollbar {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            margin: 0 10px;
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .custom-scrollbar {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
};

export default CompleteLandingPage;
