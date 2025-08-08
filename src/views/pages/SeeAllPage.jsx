// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchModuleData } from "../../redux/slices/apiSlice"; // Adjust the import path as necessary

// import { Card } from "react-bootstrap";
// import { FaRegStar, FaStar } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";

// const SeeAllPage = () => {
//   const { module_action } = useParams();
//   const dispatch = useDispatch();
//   const [pageNo, setPageNo] = useState(1);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState("any");
//   const [selectedCondition, setSelectedCondition] = useState("anyCondition");

//   const { data } = useSelector((state) => state.api);
//   const allItems = data[module_action]?.product || [];
//   const totalItems = data[module_action]?.totalCounts || 0;
//   const categoryData = data["category"]?.result || [];

//   // Filter items based on selected categories
//   const filteredItems = useMemo(() => {
//     if (selectedCategories.length === 0) {
//       return allItems;
//     }

//     return allItems.filter((item) =>
//       selectedCategories.includes(item.cat_name)
//     );
//   }, [allItems, selectedCategories]);

//   // Further filter by status and condition
//   const finalFilteredItems = useMemo(() => {
//     let items = filteredItems;

//     // Filter by status
//     if (selectedStatus !== "any") {
//       if (selectedStatus === "available") {
//         items = items.filter((item) => item.is_sold === "0");
//       } else if (selectedStatus === "sold") {
//         items = items.filter((item) => item.is_sold === "1");
//       }
//     }

//     // Filter by condition
//     if (selectedCondition !== "anyCondition") {
//       items = items.filter(
//         (item) =>
//           item.condition.toLowerCase() === selectedCondition.toLowerCase()
//       );
//     }

//     return items;
//   }, [filteredItems, selectedStatus, selectedCondition]);

//   const itemsPerPage = 20;
//   const totalFilteredItems = finalFilteredItems.length;
//   const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
//   const pageNeighbours = 2;

//   // Get items for current page
//   const currentPageItems = useMemo(() => {
//     const startIndex = (pageNo - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return finalFilteredItems.slice(startIndex, endIndex);
//   }, [finalFilteredItems, pageNo, itemsPerPage]);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const pageNumbers = useMemo(() => {
//     if (totalPages <= 1) return [1];

//     const pages = [];
//     pages.push(1);

//     let rangeStart = Math.max(2, pageNo - pageNeighbours);
//     let rangeEnd = Math.min(totalPages - 1, pageNo + pageNeighbours);

//     const maxVisiblePages = 2 * pageNeighbours + 1;
//     if (rangeEnd - rangeStart + 1 < maxVisiblePages) {
//       if (rangeStart === 2) {
//         rangeEnd = Math.min(totalPages - 1, rangeStart + maxVisiblePages - 1);
//       } else if (rangeEnd === totalPages - 1) {
//         rangeStart = Math.max(2, rangeEnd - maxVisiblePages + 1);
//       }
//     }

//     if (rangeStart > 2) {
//       pages.push("left-ellipsis");
//     }

//     for (let i = rangeStart; i <= rangeEnd; i++) {
//       if (i !== 1 && i !== totalPages) {
//         pages.push(i);
//       }
//     }

//     if (rangeEnd < totalPages - 1) {
//       pages.push("right-ellipsis");
//     }

//     if (totalPages > 1 && !pages.includes(totalPages)) {
//       pages.push(totalPages);
//     }

//     return pages;
//   }, [pageNo, totalPages, pageNeighbours]);

//   // Fetch category data when component mounts
//   useEffect(() => {
//     dispatch(
//       fetchModuleData({
//         module_action: "category",
//       })
//     );
//   }, [dispatch]);

//   // Fetch all product data when component mounts or module_action changes
//   useEffect(() => {
//     // Fetch all data without filters first
//     const params = {
//       limit: 1000, // Fetch more items to filter client-side
//       page_no: 1,
//     };

//     dispatch(
//       fetchModuleData({
//         module_action: module_action,
//         params: params,
//       })
//     );
//   }, [dispatch, module_action]);

//   // Reset page when filters change
//   useEffect(() => {
//     setPageNo(1);
//   }, [selectedCategories, selectedStatus, selectedCondition]);

//   const handleNextPage = () => {
//     if (pageNo < totalPages) {
//       setPageNo((prev) => prev + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (pageNo > 1) {
//       setPageNo((prev) => prev - 1);
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     if (pageNumber !== pageNo && pageNumber >= 1 && pageNumber <= totalPages) {
//       setPageNo(pageNumber);
//     }
//   };

//   const handleCategoryChange = (categoryName, isChecked) => {
//     if (isChecked) {
//       setSelectedCategories((prev) => [...prev, categoryName]);
//     } else {
//       setSelectedCategories((prev) =>
//         prev.filter((cat) => cat !== categoryName)
//       );
//     }
//   };

//   const handleStatusChange = (status) => {
//     setSelectedStatus(status);
//   };

//   const handleConditionChange = (condition) => {
//     setSelectedCondition(condition);
//   };

//   // // Get unique categories from filtered items for display count
//   // const getCategoryCount = (categoryName) => {
//   //   return allItems.filter((item) => item.cat_name === categoryName).length;
//   // };

//   return (
//     <div className="mt-2">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-3 ">
//             <h5 className="">Filter by</h5>
//             <div className="border-bottom"></div>
//             <div className="mb-3 mt-3 ">
//               <h5>Category</h5>
//               {categoryData.map((category) => (
//                 <div key={category.cat_id} className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id={`category-${category.cat_id}`}
//                     onChange={(e) =>
//                       handleCategoryChange(category.cat_name, e.target.checked)
//                     }
//                     checked={selectedCategories.includes(category.cat_name)}
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor={`category-${category.cat_id}`}
//                   >
//                     {category.cat_name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <div className="mb-3">
//               <h5>Status</h5>
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="status"
//                   id="any"
//                   checked={selectedStatus === "any"}
//                   onChange={() => handleStatusChange("any")}
//                 />
//                 <label className="form-check-label" htmlFor="any">
//                   Any
//                 </label>
//               </div>
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="status"
//                   id="available"
//                   checked={selectedStatus === "available"}
//                   onChange={() => handleStatusChange("available")}
//                 />
//                 <label className="form-check-label" htmlFor="available">
//                   Available
//                 </label>
//               </div>
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="status"
//                   id="sold"
//                   checked={selectedStatus === "sold"}
//                   onChange={() => handleStatusChange("sold")}
//                 />
//                 <label className="form-check-label" htmlFor="sold">
//                   Sold
//                 </label>
//               </div>
//             </div>
//             <div className="mb-3">
//               <h5>Condition</h5>
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="condition"
//                   id="anyCondition"
//                   checked={selectedCondition === "anyCondition"}
//                   onChange={() => handleConditionChange("anyCondition")}
//                 />
//                 <label className="form-check-label" htmlFor="anyCondition">
//                   Any
//                 </label>
//               </div>
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="condition"
//                   id="new"
//                   checked={selectedCondition === "new"}
//                   onChange={() => handleConditionChange("new")}
//                 />
//                 <label className="form-check-label" htmlFor="new">
//                   New
//                 </label>
//               </div>
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="condition"
//                   id="like new"
//                   checked={selectedCondition === "like new"}
//                   onChange={() => handleConditionChange("like new")}
//                 />
//                 <label className="form-check-label" htmlFor="like new">
//                   Like New
//                 </label>
//               </div>
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="condition"
//                   id="good"
//                   checked={selectedCondition === "good"}
//                   onChange={() => handleConditionChange("good")}
//                 />
//                 <label className="form-check-label" htmlFor="good">
//                   Good
//                 </label>
//               </div>
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="condition"
//                   id="used"
//                   checked={selectedCondition === "used"}
//                   onChange={() => handleConditionChange("used")}
//                 />
//                 <label className="form-check-label" htmlFor="used">
//                   Used
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-9">
//             <div className="d-flex justify-content-between mb-3 py-4">
//               <div className="d-flex align-items-start">
//                 <div className="form-check ">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="flexRadioDisabled"
//                     id="flexRadioDisabled"
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor="flexRadioDisabled"
//                   >
//                     All
//                   </label>
//                 </div>
//                 <div className="form-check mx-5">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="flexRadioDisabled"
//                     id="flexRadioDisabled2"
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor="flexRadioDisabled2"
//                   >
//                     Free Coins
//                   </label>
//                 </div>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="flexRadioDisabled"
//                     id="flexRadioCheckedDisabled"
//                   />
//                   <label
//                     className="form-check-label mx-2"
//                     htmlFor="flexRadioCheckedDisabled"
//                   >
//                     Cash Deals
//                   </label>
//                 </div>
//               </div>
//               <select className="form-select w-25 p-2">
//                 <option>Sort by default</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//               </select>
//             </div>

//             {/* Results summary */}
//             <div className="mb-3">
//               <p className="text-muted">
//                 Showing {currentPageItems.length} of {totalFilteredItems}{" "}
//                 results
//                 {selectedCategories.length > 0 && (
//                   <span> for: {selectedCategories.join(", ")}</span>
//                 )}
//               </p>
//             </div>

//             <div className="row">
//               {currentPageItems.length > 0 ? (
//                 currentPageItems.map((item, idx) => (
//                   <div key={item.id || idx} className="col-md-3 mb-4">
//                     <Card
//                       className="h-100 w-100 border-0 position-relative"
//                       style={{
//                         borderRadius: "10px",
//                         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                         opacity: item.is_sold === "1" ? 0.7 : 0.9,
//                         backgroundColor:
//                           item.is_sold === "1"
//                             ? "rgba(255,255,255,0.8)"
//                             : "white",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <div
//                         style={{
//                           height: "220px",
//                           margin: "0px auto",
//                           overflow: "hidden",
//                           position: "relative",
//                         }}
//                       >
//                         {/* Sold overlay */}
//                         {item.is_sold === "1" && (
//                           <div
//                             style={{
//                               position: "absolute",
//                               top: 0,
//                               left: 0,
//                               right: 0,
//                               bottom: 0,
//                               backgroundColor: "rgba(255,255,255,0.7)",
//                               zIndex: 2,
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                             }}
//                           >
//                             <span
//                               style={{
//                                 backgroundColor: "rgba(220,53,69,0.9)",
//                                 color: "white",
//                                 padding: "8px 16px",
//                                 borderRadius: "20px",
//                                 fontWeight: "bold",
//                                 fontSize: "0.9rem",
//                                 textTransform: "uppercase",
//                                 letterSpacing: "1px",
//                               }}
//                             >
//                               SOLD
//                             </span>
//                           </div>
//                         )}
//                         <Link
//                           to={{
//                             pathname: `/cartDetails/${encodeURIComponent(
//                               item.product_name
//                             )}/${item.id}`,
//                           }}
//                           state={{ product: item }}
//                           onClick={() => {
//                             scrollToTop();
//                             console.log(
//                               "Clicked Product:",
//                               item.product_name,
//                               "| ID:",
//                               item.id
//                             );
//                           }}
//                         >
//                           <Card.Img
//                             src={item.product_slider_image?.[0]?.image}
//                             style={{
//                               objectFit: "cover",
//                               filter:
//                                 item.is_sold === "1"
//                                   ? "grayscale(50%)"
//                                   : "none",
//                             }}
//                             alt={item.product_name}
//                           />
//                         </Link>
//                       </div>
//                       <Card.Body className="px-3 py-2">
//                         <Card.Title
//                           className="mb-1 text-black fw-bold"
//                           style={{
//                             fontSize: "0.9rem",
//                             whiteSpace: "nowrap",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             color: item.is_sold === "1" ? "#666" : "#000",
//                           }}
//                         >
//                           {item.product_name}
//                         </Card.Title>
//                         <Card.Text
//                           className="text-muted"
//                           style={{
//                             fontSize: "0.85rem",
//                             color: item.is_sold === "1" ? "#999" : "#6c757d",
//                           }}
//                         >
//                           {item.cat_name}
//                         </Card.Text>
//                         <div className="d-flex align-items-center">
//                           <span
//                             className="fw-bolder text-success me-2"
//                             style={{
//                               color: item.is_sold === "1" ? "#999" : "#198754",
//                             }}
//                           >
//                             ₹{item.selling_price}
//                           </span>
//                           <span className="ml-2">
//                             <strike
//                               className="text-muted"
//                               style={{
//                                 fontSize: "0.85rem",
//                                 color:
//                                   item.is_sold === "1" ? "#ccc" : "#6c757d",
//                               }}
//                             >
//                               ₹{item.mrp}
//                             </strike>
//                           </span>
//                         </div>
//                         <div className="pt-3">
//                           <span
//                             className="fw-bolder text-black me-2"
//                             style={{
//                               color: item.is_sold === "1" ? "#999" : "#000",
//                             }}
//                           >
//                             {item.username}
//                           </span>
//                           <div className="d-flex mt-2">
//                             {[...Array(4)].map((_, i) => (
//                               <FaStar
//                                 key={i}
//                                 style={{
//                                   color:
//                                     item.is_sold === "1" ? "#ccc" : "green",
//                                   fontSize: "1rem",
//                                   marginRight: "3px",
//                                 }}
//                               />
//                             ))}
//                             <FaRegStar
//                               style={{
//                                 color: item.is_sold === "1" ? "#ddd" : "grey",
//                                 fontSize: "1rem",
//                                 marginLeft: "3px",
//                                 stroke: item.is_sold === "1" ? "#ddd" : "grey",
//                                 strokeWidth: "10",
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 ))
//               ) : (
//                 <div className="col-12 text-center py-5">
//                   <h5 className="text-muted">
//                     No products found matching your filters
//                   </h5>
//                   <p className="text-muted">
//                     Try adjusting your filter criteria
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Pagination - Only show if there are multiple pages */}
//             {totalPages > 1 && (
//               <div className="d-flex justify-content-center mt-4">
//                 <ul
//                   className="pagination"
//                   style={{ listStyle: "none", display: "flex", padding: 0 }}
//                 >
//                   <li className="page-item" style={{ margin: "0 5px" }}>
//                     <button
//                       className="page-link"
//                       onClick={handlePreviousPage}
//                       disabled={pageNo === 1}
//                       style={{
//                         border: "none",
//                         background: "none",
//                         cursor: pageNo === 1 ? "not-allowed" : "pointer",
//                         opacity: pageNo === 1 ? 0.5 : 1,
//                       }}
//                     >
//                       &lt;
//                     </button>
//                   </li>

//                   {pageNumbers.map((number, idx) => {
//                     if (
//                       number === "left-ellipsis" ||
//                       number === "right-ellipsis"
//                     ) {
//                       return (
//                         <li
//                           key={`ellipsis-${idx}`}
//                           className="page-item"
//                           style={{ margin: "0 5px" }}
//                         >
//                           <span style={{ padding: "0 5px" }}>...</span>
//                         </li>
//                       );
//                     }

//                     return (
//                       <li
//                         key={number}
//                         className="page-item"
//                         style={{ margin: "0 5px" }}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => handlePageClick(number)}
//                           style={{
//                             border: "none",
//                             background: "none",
//                             cursor: "pointer",
//                             color: pageNo === number ? "red" : "black",
//                             fontWeight: pageNo === number ? "bold" : "normal",
//                           }}
//                         >
//                           {number}
//                         </button>
//                       </li>
//                     );
//                   })}

//                   <li className="page-item" style={{ margin: "0 5px" }}>
//                     <button
//                       className="page-link"
//                       onClick={handleNextPage}
//                       disabled={pageNo === totalPages}
//                       style={{
//                         border: "none",
//                         background: "none",
//                         cursor:
//                           pageNo === totalPages ? "not-allowed" : "pointer",
//                         opacity: pageNo === totalPages ? 0.5 : 1,
//                       }}
//                     >
//                       &gt;
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeeAllPage;
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { Card } from "react-bootstrap";
import { FaRegStar, FaStar, FaSearch, FaBars } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import logo from "../../assets/images/shortLogo.png";

const HeaderSeeAll = ({
  onShowFilter,
  onSearch,
  searchQuery,
  onClearSearch,
}) => {
  const handleSearchChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  const handleClearSearch = () => {
    onClearSearch();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="container-fluid">
        <div
          className="d-flex align-items-center w-100"
          style={{ minHeight: "60px" }}
        >
          <a
            className="navbar-brand flex-shrink-0 me-2"
            href="/"
            style={{ minWidth: "auto" }}
          >
            <img
              src={logo}
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </a>
          <form
            className="flex-grow-1 position-relative mx-2"
            style={{ minWidth: "150px", maxWidth: "calc(100% - 120px)" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control rounded-pill bg-light search-all w-100"
              type="search"
              placeholder="Search for anything"
              aria-label="Search"
              style={{
                paddingRight: "45px",
                fontSize: "14px",
                height: "40px",
              }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                type="button"
                className="position-absolute btn btn-link text-decoration-none"
                style={{
                  right: 40,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={handleClearSearch}
              >
                &times;
              </button>
            )}
            <span
              className="position-absolute search-bar"
              style={{
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <FaSearch size={16} />
            </span>
          </form>
          <div className="flex-shrink-0" style={{ minWidth: "50px" }}>
            <button
              className="btn d-lg-none p-2"
              style={{
                background: "transparent",
                boxShadow: "none",
                border: "none",
                outline: "none",
                fontSize: "24px",
                color: "#111",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={onShowFilter}
              aria-label="Open Filters"
            >
              <FaBars />
            </button>
            <button
              className="btn d-none d-lg-block px-3"
              style={{
                fontWeight: "800",
                whiteSpace: "nowrap",
                fontSize: "14px",
              }}
              type="button"
            >
              Get the app
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const SeeAllPage = () => {
  const { module_action } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get search query from URL params
  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get("search") || "";

  // States
  const [pageNo, setPageNo] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("any");
  const [selectedCondition, setSelectedCondition] = useState("anyCondition");
  const [sortOrder, setSortOrder] = useState("default");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [searchLoading, setSearchLoading] = useState(false);

  // Data from redux
  const { data } = useSelector((state) => state.api);
  const allItems = data[module_action]?.product || [];
  const categoryData = data["category"]?.result || [];

  // Handle category selection from navigation state
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategories([location.state.selectedCategory]);
    }
  }, [location.state]);

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchModuleData({ module_action: "category" }));
  }, [dispatch]);

  // Fetch initial data with search query if present
  useEffect(() => {
    setLoading(true);
    const params = { limit: 1000, page_no: 1 };

    // If there's a search query, add it to params
    if (urlSearchQuery.trim()) {
      params.search = urlSearchQuery.trim();
    }

    dispatch(
      fetchModuleData({
        module_action,
        params,
      })
    ).then(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    });
  }, [dispatch, module_action, urlSearchQuery]);

  // Local filtering (after API data is received)
  const filteredItems = useMemo(() => {
    let items = allItems;

    // Category filter
    if (selectedCategories.length > 0) {
      items = items.filter((item) =>
        selectedCategories.includes(item.cat_name)
      );
    }

    return items;
  }, [allItems, selectedCategories]);

  const finalFilteredItems = useMemo(() => {
    let items = filteredItems;

    // Status filter
    if (selectedStatus !== "any") {
      items =
        selectedStatus === "available"
          ? items.filter((item) => item.is_sold === "0")
          : items.filter((item) => item.is_sold === "1");
    }

    // Condition filter
    if (selectedCondition !== "anyCondition") {
      items = items.filter(
        (item) =>
          item.condition &&
          item.condition.toLowerCase() === selectedCondition.toLowerCase()
      );
    }

    return items;
  }, [filteredItems, selectedStatus, selectedCondition]);

  const sortedItems = useMemo(() => {
    let items = [...finalFilteredItems];
    if (sortOrder === "lowToHigh") {
      items.sort(
        (a, b) => parseFloat(a.selling_price) - parseFloat(b.selling_price)
      );
    } else if (sortOrder === "highToLow") {
      items.sort(
        (a, b) => parseFloat(b.selling_price) - parseFloat(a.selling_price)
      );
    }
    return items;
  }, [finalFilteredItems, sortOrder]);

  const itemsPerPage = 20;
  const totalFilteredItems = sortedItems.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
  const pageNeighbours = 2;

  const currentPageItems = useMemo(() => {
    const startIndex = (pageNo - 1) * itemsPerPage;
    return sortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedItems, pageNo, itemsPerPage]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [1];
    const pages = [1];
    let rangeStart = Math.max(2, pageNo - pageNeighbours);
    let rangeEnd = Math.min(totalPages - 1, pageNo + pageNeighbours);
    const maxVisiblePages = 2 * pageNeighbours + 1;
    if (rangeEnd - rangeStart + 1 < maxVisiblePages) {
      if (rangeStart === 2)
        rangeEnd = Math.min(totalPages - 1, rangeStart + maxVisiblePages - 1);
      else if (rangeEnd === totalPages - 1)
        rangeStart = Math.max(2, rangeEnd - maxVisiblePages + 1);
    }
    if (rangeStart > 2) pages.push("left-ellipsis");
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) pages.push(i);
    }
    if (rangeEnd < totalPages - 1) pages.push("right-ellipsis");
    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);
    return pages;
  }, [pageNo, totalPages, pageNeighbours]);

  // Reset page when filters change
  useEffect(() => {
    setPageNo(1);
  }, [
    selectedCategories,
    selectedStatus,
    selectedCondition,
    sortOrder,
    searchQuery,
  ]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Auto-close sidebar on filter change when sidebar is open & screen is mobile/tablet (<992px)
  const closeSidebarIfMobile = () => {
    if (showFilter && window.innerWidth < 992) setShowFilter(false);
  };

  // Filter handlers with auto close on mobile/tablet
  const handleCategoryChange = (categoryName, isChecked) => {
    if (isChecked) {
      setSelectedCategories((prev) => [...prev, categoryName]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((cat) => cat !== categoryName)
      );
    }
    closeSidebarIfMobile();
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    closeSidebarIfMobile();
  };

  const handleConditionChange = (condition) => {
    setSelectedCondition(condition);
    closeSidebarIfMobile();
  };

  const handleSortChange = (e) => setSortOrder(e.target.value);

  // Updated search handler - makes API call with debouncing
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Update URL without full navigation
    const newUrl = new URL(window.location);
    if (query.trim()) {
      newUrl.searchParams.set("search", query);
    } else {
      newUrl.searchParams.delete("search");
    }
    window.history.pushState({}, "", newUrl);

    // Debounced API call for search
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }

    window.searchTimeout = setTimeout(() => {
      setSearchLoading(true);
      const params = { limit: 1000, page_no: 1 };

      if (query.trim()) {
        params.search = query.trim();
      }

      dispatch(
        fetchModuleData({
          module_action,
          params,
        })
      ).then(() => {
        setSearchLoading(false);
      });
    }, 500); // 500ms debounce
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    // Remove search param from URL
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete("search");
    window.history.pushState({}, "", newUrl);

    // Fetch data without search
    setSearchLoading(true);
    dispatch(
      fetchModuleData({
        module_action,
        params: { limit: 1000, page_no: 1 },
      })
    ).then(() => {
      setSearchLoading(false);
    });
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== pageNo && pageNumber >= 1 && pageNumber <= totalPages) {
      setPageNo(pageNumber);
    }
  };

  // The filters UI block used in both sidebar and offcanvas
  const FilterContents = (
    <div>
      <h5 className="mb-3">Filter by</h5>

      {/* Search filter indicator */}
      {searchQuery && (
        <div className="mb-3 p-2 bg-light rounded">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Searching for: <strong>"{searchQuery}"</strong>
            </small>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleClearSearch}
              style={{ fontSize: "0.7rem", padding: "2px 8px" }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="mb-3">
        <h6 className="mb-2">Category</h6>
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="mb-2">
                <Skeleton height={20} width="80%" />
              </div>
            ))
          : categoryData.map((cat) => (
              <div key={cat.cat_id} className="form-check mb-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`category-${cat.cat_id}`}
                  onChange={(e) =>
                    handleCategoryChange(cat.cat_name, e.target.checked)
                  }
                  checked={selectedCategories.includes(cat.cat_name)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`category-${cat.cat_id}`}
                >
                  {cat.cat_name}
                </label>
              </div>
            ))}
      </div>
      <div className="mb-3">
        <h6 className="mb-2">Status</h6>
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="mb-2">
                <Skeleton height={20} width="60%" />
              </div>
            ))
          : ["any", "available", "sold"].map((status) => (
              <div className="form-check form-check-inline mb-1" key={status}>
                <input
                  type="radio"
                  className="form-check-input"
                  name="status"
                  id={status}
                  checked={selectedStatus === status}
                  onChange={() => handleStatusChange(status)}
                />
                <label className="form-check-label" htmlFor={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </label>
              </div>
            ))}
      </div>
      <div className="mb-3">
        <h6 className="mb-2">Condition</h6>
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="mb-2">
                <Skeleton height={20} width="70%" />
              </div>
            ))
          : ["anyCondition", "new", "like new", "good", "used"].map((cond) => (
              <div className="form-check form-check-inline mb-1" key={cond}>
                <input
                  type="radio"
                  className="form-check-input"
                  name="condition"
                  id={cond}
                  checked={selectedCondition === cond}
                  onChange={() => handleConditionChange(cond)}
                />
                <label className="form-check-label" htmlFor={cond}>
                  {cond === "anyCondition"
                    ? "Any"
                    : cond
                        .split(" ")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                </label>
              </div>
            ))}
      </div>
    </div>
  );

  const isDataLoading = loading || searchLoading;

  return (
    <div>
      {/* Header with hamburger and search */}
      <HeaderSeeAll
        onShowFilter={() => setShowFilter(true)}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onClearSearch={handleClearSearch}
      />
      <div className="mt-2">
        <div className="container">
          <div className="row">
            {/* Sidebar visible only on large screens (≥992px) */}
            <div className="d-none d-lg-block col-lg-3">{FilterContents}</div>
            {/* Offcanvas sidebar for mobile/tablet (<992px) */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 2000,
                background: showFilter ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
                transition: "background 0.3s ease",
                pointerEvents: showFilter ? "auto" : "none",
              }}
              onClick={() => setShowFilter(false)}
            >
              <div
                style={{
                  width: "80vw",
                  maxWidth: 340,
                  height: "100vh",
                  background: "#fff",
                  padding: 24,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: 2100,
                  overflowY: "auto",
                  boxShadow: "2px 0 24px rgba(0,0,0,0.13)",
                  transform: showFilter ? "translateX(0)" : "translateX(-100%)",
                  transition: "transform 0.3s ease",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="btn btn-close float-end mb-3"
                  onClick={() => setShowFilter(false)}
                  aria-label="Close Filters"
                />
                {FilterContents}
              </div>
            </div>
            {/* Main content */}
            <div className="col-12 col-lg-9">
              {/* Top controls */}
              <div
                className="d-flex flex-wrap justify-content-between align-items-center mb-3 py-4"
                style={{ paddingTop: 18, paddingBottom: 10 }}
              >
                <div
                  className="d-flex align-items-start flex-wrap"
                  style={{ gap: 16 }}
                >
                  {isDataLoading ? (
                    <div className="d-flex gap-4">
                      <Skeleton height={20} width={50} />
                      <Skeleton height={20} width={80} />
                      <Skeleton height={20} width={70} />
                    </div>
                  ) : (
                    <>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioDisabled"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDisabled"
                        >
                          All
                        </label>
                      </div>
                      <div className="form-check mx-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioDisabled2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDisabled2"
                        >
                          Free Coins
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioCheckedDisabled"
                        />
                        <label
                          className="form-check-label mx-2"
                          htmlFor="flexRadioCheckedDisabled"
                        >
                          Cash Deals
                        </label>
                      </div>
                    </>
                  )}
                </div>
                {isDataLoading ? (
                  <Skeleton height={38} width={180} />
                ) : (
                  <select
                    className="form-select"
                    style={{ width: 180, minWidth: 100, maxWidth: "97vw" }}
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option value="default">Sort by default</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                )}
              </div>
              {/* Results summary */}
              <div className="mb-3">
                {isDataLoading ? (
                  <Skeleton height={20} width={300} />
                ) : (
                  <p className="text-muted">
                    Showing {currentPageItems.length} of {totalFilteredItems}{" "}
                    results
                    {searchQuery && (
                      <span>
                        {" "}
                        for search: <strong>"{searchQuery}"</strong>
                      </span>
                    )}
                    {selectedCategories.length > 0 && (
                      <span>
                        {" "}
                        | Categories: {selectedCategories.join(", ")}
                      </span>
                    )}
                  </p>
                )}
              </div>
              {/* Products grid */}
              <div className="row">
                {isDataLoading ? (
                  // Skeleton loading for products
                  Array.from({ length: 20 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                    >
                      <Card
                        className="h-100 border-0"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Skeleton height={200} />
                        <Card.Body className="px-3 py-2">
                          <Skeleton height={20} className="mb-2" />
                          <Skeleton height={15} width="60%" className="mb-2" />
                          <div className="d-flex align-items-center">
                            <Skeleton height={20} width={80} className="me-2" />
                            <Skeleton height={15} width={60} />
                          </div>
                          <div className="pt-3">
                            <Skeleton
                              height={15}
                              width="50%"
                              className="mb-2"
                            />
                            <div className="d-flex">
                              {[...Array(5)].map((_, i) => (
                                <Skeleton
                                  key={i}
                                  height={16}
                                  width={16}
                                  circle
                                  className="me-1"
                                />
                              ))}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                ) : currentPageItems.length > 0 ? (
                  currentPageItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                    >
                      <Card
                        className="h-100 border-0"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          opacity: item.is_sold === "1" ? 0.7 : 0.97,
                          backgroundColor:
                            item.is_sold === "1"
                              ? "rgba(255,255,255,0.8)"
                              : "#fff",
                          transition: "all 0.3s",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            position: "relative",
                            overflow: "hidden",
                            height: "0",
                            paddingBottom: "69%",
                            minHeight: 120,
                            maxHeight: 220,
                            background: "#f9f9f9",
                          }}
                        >
                          {item.is_sold === "1" && (
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
                                  padding: "8px 16px",
                                  borderRadius: "20px",
                                  fontWeight: "bold",
                                  fontSize: "0.9rem",
                                  textTransform: "uppercase",
                                  letterSpacing: "1px",
                                }}
                              >
                                SOLD
                              </span>
                            </div>
                          )}
                          <Link
                            to={{
                              pathname: `/cartDetails/${encodeURIComponent(
                                item.product_name
                              )}/${item.id}`,
                            }}
                            state={{ product: item }}
                            onClick={scrollToTop}
                            style={{
                              display: "block",
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              left: 0,
                              top: 0,
                            }}
                          >
                            <img
                              src={item.product_slider_image?.[0]?.image}
                              alt={item.product_name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter:
                                  item.is_sold === "1"
                                    ? "grayscale(50%)"
                                    : "none",
                                position: "absolute",
                                left: 0,
                                top: 0,
                              }}
                            />
                          </Link>
                        </div>
                        <Card.Body className="px-3 py-2">
                          <Card.Title
                            className="mb-1 text-black fw-bold"
                            style={{
                              fontSize: "0.99rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              color: item.is_sold === "1" ? "#666" : "#000",
                            }}
                          >
                            {item.product_name}
                          </Card.Title>
                          <Card.Text
                            className="text-muted"
                            style={{
                              fontSize: "0.85rem",
                              color: item.is_sold === "1" ? "#999" : "#6c757d",
                            }}
                          >
                            {item.cat_name}
                          </Card.Text>
                          <div className="d-flex align-items-center">
                            <span
                              className="fw-bolder text-success me-2"
                              style={{
                                color:
                                  item.is_sold === "1" ? "#999" : "#198754",
                                fontWeight: 700,
                                fontSize: "1rem",
                              }}
                            >
                              ₹{item.selling_price}
                            </span>
                            <span className="ml-2">
                              <strike
                                className="text-muted"
                                style={{
                                  fontSize: "0.85rem",
                                  color:
                                    item.is_sold === "1" ? "#ccc" : "#6c757d",
                                }}
                              >
                                ₹{item.mrp}
                              </strike>
                            </span>
                          </div>
                          <div className="pt-3">
                            <span
                              className="fw-bolder text-black me-2"
                              style={{
                                color: item.is_sold === "1" ? "#999" : "#000",
                              }}
                            >
                              {item.username}
                            </span>
                            <div className="d-flex mt-2">
                              {[...Array(4)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  style={{
                                    color:
                                      item.is_sold === "1" ? "#ccc" : "green",
                                    fontSize: "1rem",
                                    marginRight: "3px",
                                  }}
                                />
                              ))}
                              <FaRegStar
                                style={{
                                  color: item.is_sold === "1" ? "#ddd" : "grey",
                                  fontSize: "1rem",
                                  marginLeft: "3px",
                                  stroke:
                                    item.is_sold === "1" ? "#ddd" : "grey",
                                  strokeWidth: "10",
                                }}
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h5 className="text-muted">
                      {searchQuery
                        ? `No products found for "${searchQuery}"`
                        : "No products found matching your filters"}
                    </h5>
                    <p className="text-muted">
                      {searchQuery
                        ? "Try searching with different keywords"
                        : "Try adjusting your filter criteria"}
                    </p>
                    {searchQuery && (
                      <button
                        className="btn btn-primary mt-2"
                        onClick={handleClearSearch}
                      >
                        Clear Search and Show All Products
                      </button>
                    )}
                  </div>
                )}
              </div>
              {/* Pagination */}
              {!isDataLoading && totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <ul
                    className="pagination"
                    style={{ listStyle: "none", display: "flex", padding: 0 }}
                  >
                    <li className="page-item" style={{ margin: "0 5px" }}>
                      <button
                        className="page-link"
                        onClick={() => setPageNo(pageNo > 1 ? pageNo - 1 : 1)}
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
                    {pageNumbers.map((number, idx) =>
                      number === "left-ellipsis" ||
                      number === "right-ellipsis" ? (
                        <li
                          key={`ellipsis-${idx}`}
                          className="page-item"
                          style={{ margin: "0 5px" }}
                        >
                          <span style={{ padding: "0 5px" }}>...</span>
                        </li>
                      ) : (
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
                      )
                    )}
                    <li className="page-item" style={{ margin: "0 5px" }}>
                      <button
                        className="page-link"
                        onClick={() =>
                          setPageNo(
                            pageNo < totalPages ? pageNo + 1 : totalPages
                          )
                        }
                        disabled={pageNo === totalPages}
                        style={{
                          border: "none",
                          background: "none",
                          cursor:
                            pageNo === totalPages ? "not-allowed" : "pointer",
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
    </div>
  );
};

export default SeeAllPage;