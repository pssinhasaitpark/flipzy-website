import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { useEffect } from "react";

const HeaderTop = () => {
  const dispatch = useDispatch();
  const module_action = "category";
  const { data } = useSelector((state) => state.api);
  const categoryData = data[module_action]?.result || [];

  console.log(categoryData);
  useEffect(() => {
    const result = dispatch(
      fetchModuleData({
        module_action: module_action,
      })
    );
    console.log("result", result);
  }, [dispatch]);

  return (
    <div className="category-header-top px-3">
      <div className="category-list px-4">
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
      <style jsx>{`
        .category-header-top {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 90px;
          background: #fff;
        }
        .category-list {
          display: flex;
          flex-direction: row;
          gap: 40px;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 880px;
        }
        .category-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          outline: none;
          user-select: none;
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
