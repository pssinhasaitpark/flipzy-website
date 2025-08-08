import React, { useEffect } from "react";
import logo from "../../assets/images/flipzy_online_store.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchModuleData } from "../../redux/slices/apiSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const module_action = "category";
  const { data } = useSelector((state) => state.api);
  const categoryData = data[module_action]?.result || [];

  useEffect(() => {
    dispatch(fetchModuleData({ module_action: module_action }));
  }, [dispatch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (category) => {
    navigate(`/seeall/manufacturerProducts`, {
      state: {
        selectedCategory: category.cat_name,
        categoryId: category.cat_id,
      },
    });
    scrollToTop();
  };

  return (
    <footer className="text-light py-5" style={{ backgroundColor: "#212121" }}>
      <div className="container">
        <div className="row">
          {/* Logo Column */}
          <div className="col-md-3 mb-4">
            <div className="d-flex align-items-center mb-3">
              <div className="text-dark fw-bold text-center" style={{ fontSize: "20px" }}>
                <img src={logo} alt="image" className="img-fluid w-50" />
              </div>
            </div>
          </div>

          {/* Shop Categories Column */}
          <div className="col-md-2 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Shop Categories</h6>
            <ul className="list-unstyled">
              {categoryData.map((category) => (
                <li key={category.cat_id} className="mb-2">
                  <a
                    href="#"
                    className="text-light text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(category);
                    }}
                  >
                    {category.cat_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-md-2 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-md-2 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Community Guidelines
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Cancellation, Refunds & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="col-md-1 mb-4">
            <h6 className="text-warning mb-3 fw-bold">Policies</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/terms-n-condition" className="text-light text-decoration-none">
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy-policy" className="text-light text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
