import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import "./Header.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = ({ className, style, onClick }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust arrow size based on screen width
  const arrowSize = screenWidth <= 480 ? 40 : screenWidth <= 768 ? 40 : 50;
  const containerSize = screenWidth <= 480 ? 40 : screenWidth <= 768 ? 40 : 50;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: screenWidth <= 480 ? "2px" : screenWidth <= 768 ? "5px" : "10px",
        zIndex: 10,
        cursor: "pointer",
        width: `${containerSize}px`,
        height: `${containerSize}px`,
        // backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "50%",
        // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
      onClick={onClick}
      aria-label="Next"
      role="button"
      tabIndex={0}
    >
      <svg
        width={arrowSize}
        height={arrowSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
};

const SamplePrevArrow = ({ className, style, onClick }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust arrow size based on screen width
  const arrowSize = screenWidth <= 480 ? 40 : screenWidth <= 768 ? 40 : 50;
  const containerSize = screenWidth <= 480 ? 40 : screenWidth <= 768 ? 40 : 50;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: screenWidth <= 480 ? "2px" : screenWidth <= 768 ? "5px" : "10px",
        zIndex: 10,
        cursor: "pointer",
        width: `${containerSize}px`,
        height: `${containerSize}px`,
        borderRadius: "50%",
      }}
      onClick={onClick}
      aria-label="Previous"
      role="button"
      tabIndex={0}
    >
      <svg
        width={arrowSize}
        height={arrowSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </div>
  );
};

const HeaderTop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const module_action = "category";
  const { data } = useSelector((state) => state.api);
  const categoryData = data[module_action]?.result || [];

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(
      fetchModuleData({
        module_action: module_action,
      })
    );
  }, [dispatch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (category) => {
    // Navigate to see all page with products module_action and pass category info
    navigate(`/seeall/manufacturerProducts`, {
      state: {
        selectedCategory: category.cat_name,
        categoryId: category.cat_id,
      },
    });
    scrollToTop();
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  // Wait for category data before rendering slider to avoid blank screen
  if (!categoryData.length) {
    return (
      <div
        className="category-header-top px-3 d-lg-flex"
        style={{
          minHeight: window.innerWidth <= 480 ? "70px" : "90px",
          background: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Loading state or empty state can be added here */}
      </div>
    );
  }

  return (
    <div className="category-header-top px-3 d-lg-flex">
      {isLargeScreen ? (
        <div className="category-list px-4 d-lg-flex justify-content-center">
          {categoryData.map((category) => (
            <div
              key={category.cat_id}
              className="category-item"
              tabIndex={0}
              role="button"
              onClick={() => handleCategoryClick(category)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCategoryClick(category);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <div
                className="category-icon"
                style={{
                  background: category.bgColor,
                }}
              >
                <img
                  src={category.cat_image}
                  alt={category.cat_name}
                  className="category-img"
                  loading="lazy"
                />
              </div>
              <div
                className="category-label"
                style={{
                  color: category.color,
                }}
              >
                {category.cat_name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ width: "100%", position: "relative" }}>
          <Slider {...sliderSettings} className="category-list px-4">
            {categoryData.map((category) => (
              <div key={category.cat_id}>
                <div
                  className="category-item"
                  tabIndex={0}
                  role="button"
                  onClick={() => handleCategoryClick(category)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCategoryClick(category);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="category-icon"
                    style={{
                      background: category.bgColor,
                    }}
                  >
                    <img
                      src={category.cat_image}
                      alt={category.cat_name}
                      className="category-img"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className="category-label"
                    style={{
                      color: category.color,
                    }}
                  >
                    {category.cat_name}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default HeaderTop;
