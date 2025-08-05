import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../../redux/slices/apiSlice";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: "10px", // bring arrows inside container
        zIndex: 10,
        cursor: "pointer",
        width: "30px",
        height: "30px",
      }}
      onClick={onClick}
      aria-label="Next"
      role="button"
      tabIndex={0}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000" // black color stroke
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
};

const SamplePrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "10px", // bring arrows inside container
        zIndex: 10,
        cursor: "pointer",
        width: "30px",
        height: "30px",
      }}
      onClick={onClick}
      aria-label="Previous"
      role="button"
      tabIndex={0}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000" // black color stroke
        strokeWidth="3"
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
  const module_action = "category";
  const { data } = useSelector((state) => state.api);
  const categoryData = data[module_action]?.result || [];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
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

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
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
          minHeight: "90px",
          background: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
 
      </div>
    );
  }

  return (
    <div className="category-header-top px-3 d-lg-flex">
      {isSmallScreen ? (
        <Slider {...sliderSettings} className="category-list px-4">
          {categoryData.map((category) => (
            <div
              key={category.cat_id}
              className="category-item"
              tabIndex={0}
              role="button"
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
        </Slider>
      ) : (
        <div className="category-list px-4 d-lg-flex justify-content-center">
          {categoryData.map((category) => (
            <div
              key={category.cat_id}
              className="category-item"
              tabIndex={0}
              role="button"
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
      )}

      <style jsx>{`
        .category-header-top {
          width: 100%;
          justify-content: center;
          align-items: center;
          min-height: 90px;
          background: #fff;
        }
        .category-list {
          flex-direction: row;
          gap: 40px;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 880px;
        }
        .category-item {
          display: flex !important; /* Override slick styles */
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          outline: none;
          user-select: none;
          padding: 10px; /* add some spacing in slider */
        }
        .category-item:focus .category-label,
        .category-item:hover .category-label {
          text-decoration: underline;
        }
        .category-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 18px;
          width: 72px;
          height: 72px;
          overflow: hidden;
        }
        .category-img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 9px;
        }
        .category-label {
          margin: 8px 0 0;
          font-size: 14px;
          font-family: "Arial", sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
          background: none;
          padding: 0;
        }
        @media (max-width: 768px) {
          .category-list {
            gap: 24px;
          }
          .category-icon {
            width: 56px;
            height: 56px;
          }
          .category-img {
            width: 38px;
            height: 38px;
          }
        }
        @media (max-width: 600px) {
          .category-list {
            gap: 14px;
            max-width: 100vw;
            padding: 0 4px;
          }
          .category-header-top {
            min-height: 70px;
            padding: 0 2px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderTop;
