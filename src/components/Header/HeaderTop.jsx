import React from "react";

const HeaderTop = () => {
  const categories = [
    {
      id: "women",
      title: "WOMEN",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80&h=80&fit=crop&crop=face",
      bgColor: "bg-pink-100",
    },
    {
      id: "men",
      title: "MEN",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      bgColor: "bg-blue-100",
    },
    {
      id: "kids",
      title: "KIDS",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=80&h=80&fit=crop&crop=faces",
      bgColor: "bg-purple-100",
    },
    {
      id: "beauty",
      title: "BEAUTY",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop&crop=center",
      bgColor: "bg-yellow-100",
    },
    {
      id: "books",
      title: "BOOKS",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=80&fit=crop&crop=center",
      bgColor: "bg-blue-100",
    },
    {
      id: "home",
      title: "HOME",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop&crop=center",
      bgColor: "bg-green-100",
    },
    {
      id: "gadgets",
      title: "GADGETS",
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=80&h=80&fit=crop&crop=center",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center align-items-center ">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="d-flex flex-column align-items-center text-decoration-none category-item"
                  style={{ cursor: "pointer", minWidth: "100px" }}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className={`d-flex align-items-center justify-content-center mb-2  ${category.bgColor}`}
                    style={{
                      width: "150px",
                      height: "100px",
                      overflow: "hidden",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                  >
                    <div className="d-flex mx-3">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-100 h-100   "
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                    <span
                      className="text-dark fw-bold text-center "
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      {category.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .category-item:hover {
          transform: translateY(-2px);
        }

        .category-item:hover span {
          color: #007bff !important;
        }

        @media (max-width: 768px) {
          .gap-4 {
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 576px) {
          .gap-4 {
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderTop;
