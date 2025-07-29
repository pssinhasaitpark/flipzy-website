import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../../redux/slices/apiSlice"; // Adjust the import path as necessary
import { HeaderSeeAll } from "../../components/index";
import { Card } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const SeeAllPage = () => {
  const { module_action } = useParams();
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const { data } = useSelector((state) => state.api);
  const items = data[module_action]?.product || [];
  const totalItems = data[module_action]?.totalCounts || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNeighbours = 2; 
  const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [1];
    
    const pages = [];
    const showEllipsisThreshold = 2;
    
    pages.push(1);
    
    let rangeStart = Math.max(2, pageNo - pageNeighbours);
    let rangeEnd = Math.min(totalPages - 1, pageNo + pageNeighbours);
    
    const maxVisiblePages = 2 * pageNeighbours + 1;
    if (rangeEnd - rangeStart + 1 < maxVisiblePages) {
      if (rangeStart === 2) {
        rangeEnd = Math.min(totalPages - 1, rangeStart + maxVisiblePages - 1);
      } else if (rangeEnd === totalPages - 1) {
        rangeStart = Math.max(2, rangeEnd - maxVisiblePages + 1);
      }
    }
    
    if (rangeStart > 2) {
      pages.push("left-ellipsis");
    }
    
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }
    
    if (rangeEnd < totalPages - 1) {
      pages.push("right-ellipsis");
    }
    
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    return pages;
  }, [pageNo, totalPages, pageNeighbours]);

  useEffect(() => {
    // Only fetch if we have a valid page number
    if (pageNo > 0 && pageNo <= totalPages) {
      dispatch(
        fetchModuleData({
          module_action: module_action,
          params: { limit: itemsPerPage, page_no: pageNo },
        })
      );
    }
  }, [dispatch, module_action, pageNo, totalPages]);

  const handleNextPage = () => {
    if (pageNo < totalPages) {
      setPageNo(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNo > 1) {
      setPageNo(prev => prev - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== pageNo && pageNumber >= 1 && pageNumber <= totalPages) {
      setPageNo(pageNumber);
    }
  };

  return (
    <div>
      <div className="header2">
        <HeaderSeeAll />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>Filter by</h3>
            <div className="mb-3">
              <h5>Category</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="women"
                />
                <label className="form-check-label" htmlFor="women">
                  Women
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="men" />
                <label className="form-check-label" htmlFor="men">
                  Men
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="babyKids"
                />
                <label className="form-check-label" htmlFor="babyKids">
                  Baby & Kids
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="beautyCare"
                />
                <label className="form-check-label" htmlFor="beautyCare">
                  Beauty & Care
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="bags" />
                <label className="form-check-label" htmlFor="bags">
                  Bags
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="books"
                />
                <label className="form-check-label" htmlFor="books">
                  Books
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="homeKitchen"
                />
                <label className="form-check-label" htmlFor="homeKitchen">
                  Home & Kitchen
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gadgets"
                />
                <label className="form-check-label" htmlFor="gadgets">
                  Gadgets
                </label>
              </div>
            </div>
            <div className="mb-3">
              <h5>Status</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="any"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="any">
                  Any
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="available"
                />
                <label className="form-check-label" htmlFor="available">
                  Available
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="sold"
                />
                <label className="form-check-label" htmlFor="sold">
                  Sold
                </label>
              </div>
            </div>
            <div className="mb-3">
              <h5>Condition</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="anyCondition"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="anyCondition">
                  Any
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="unused"
                />
                <label className="form-check-label" htmlFor="unused">
                  Unused
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="used"
                />
                <label className="form-check-label" htmlFor="used">
                  Used
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-end mb-3">
              <select className="form-select w-25">
                <option>Sort by default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div className="row">
              {items.map((item) => (
                <div key={item.id} className="col-md-3 mb-4">
                  <Card
                    className="h-100 w-100 border-0 position-relative"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    
                    <div
                      style={{
                        height: "220px",
                        margin: "0px auto",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Link to="/cartDetails" onClick={scrollToTop}>
                      <Card.Img
                        src={item.product_slider_image?.[0]?.image}
                        style={{ objectFit: "cover" }}
                        alt={item.product_name}
                      />
                      </Link>
                    </div>
                    <Card.Body className="px-3 py-2">
                      <Card.Title
                        className="mb-1 text-black fw-bold"
                        style={{
                          fontSize: "0.9rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.product_name}
                      </Card.Title>
                      <Card.Text
                        className="text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {item.cat_name}
                      </Card.Text>
                      <div className="d-flex align-items-center">
                        <span className="fw-bolder text-success me-2">
                          {item.selling_price}
                        </span>
                        <span className="ml-2">
                          <strike
                            className="text-muted"
                            style={{ fontSize: "0.85rem" }}
                          >
                            {item.mrp}
                          </strike>
                        </span>
                      </div>
                      <div className="pt-3">
                        <span className="fw-bolder text-black me-2">
                          {item.username}
                        </span>
                        <div className="d-flex mt-2">
                          {[...Array(4)].map((_, i) => (
                            <FaStar
                              key={i}
                              style={{
                                color: "green",
                                fontSize: "1rem",
                                marginRight: "3px",
                              }}
                            />
                          ))}
                          <FaRegStar
                            style={{
                              color: "grey",
                              fontSize: "1rem",
                              marginLeft: "3px",
                              stroke: "grey",
                              strokeWidth: "10",
                            }}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Pagination - Only show if there are multiple pages */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <ul
                  className="pagination"
                  style={{ listStyle: "none", display: "flex", padding: 0 }}
                >
                  <li className="page-item" style={{ margin: "0 5px" }}>
                    <button
                      className="page-link"
                      onClick={handlePreviousPage}
                      disabled={pageNo === 1}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: pageNo === 1 ? "not-allowed" : "pointer",
                        opacity: pageNo === 1 ? 0.5 : 1,
                      }}
                    >
                      &lt;
                    </button>
                  </li>

                  {pageNumbers.map((number, idx) => {
                    if (
                      number === "left-ellipsis" ||
                      number === "right-ellipsis"
                    ) {
                      return (
                        <li
                          key={`ellipsis-${idx}`}
                          className="page-item"
                          style={{ margin: "0 5px" }}
                        >
                          <span style={{ padding: "0 5px" }}>...</span>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={number}
                        className="page-item"
                        style={{ margin: "0 5px" }}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(number)}
                          style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            color: pageNo === number ? "red" : "black",
                            fontWeight: pageNo === number ? "bold" : "normal",
                          }}
                        >
                          {number}
                        </button>
                      </li>
                    );
                  })}

                  <li className="page-item" style={{ margin: "0 5px" }}>
                    <button
                      className="page-link"
                      onClick={handleNextPage}
                      disabled={pageNo === totalPages}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: pageNo === totalPages ? "not-allowed" : "pointer",
                        opacity: pageNo === totalPages ? 0.5 : 1,
                      }}
                    >
                      &gt;
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeAllPage;