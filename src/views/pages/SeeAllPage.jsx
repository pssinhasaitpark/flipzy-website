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
import { fetchModuleData } from "../../redux/slices/apiSlice"; // Adjust the import path as necessary

import { Card } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const SeeAllPage = () => {
  const { module_action } = useParams();
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("any");
  const [selectedCondition, setSelectedCondition] = useState("anyCondition");
  const [sortOrder, setSortOrder] = useState("default"); // Added sort state

  const { data } = useSelector((state) => state.api);
  const allItems = data[module_action]?.product || [];
  const totalItems = data[module_action]?.totalCounts || 0;
  const categoryData = data["category"]?.result || [];

  // Filter items based on selected categories
  const filteredItems = useMemo(() => {
    if (selectedCategories.length === 0) {
      return allItems;
    }

    return allItems.filter((item) =>
      selectedCategories.includes(item.cat_name)
    );
  }, [allItems, selectedCategories]);

  // Further filter by status and condition
  const finalFilteredItems = useMemo(() => {
    let items = filteredItems;

    // Filter by status
    if (selectedStatus !== "any") {
      if (selectedStatus === "available") {
        items = items.filter((item) => item.is_sold === "0");
      } else if (selectedStatus === "sold") {
        items = items.filter((item) => item.is_sold === "1");
      }
    }

    // Filter by condition
    if (selectedCondition !== "anyCondition") {
      items = items.filter(
        (item) =>
          item.condition.toLowerCase() === selectedCondition.toLowerCase()
      );
    }

    return items;
  }, [filteredItems, selectedStatus, selectedCondition]);

  // Sort items based on selected sort order
  const sortedItems = useMemo(() => {
    let items = [...finalFilteredItems];

    switch (sortOrder) {
      case "lowToHigh":
        items.sort((a, b) => parseFloat(a.selling_price) - parseFloat(b.selling_price));
        break;
      case "highToLow":
        items.sort((a, b) => parseFloat(b.selling_price) - parseFloat(a.selling_price));
        break;
      case "default":
      default:
        // Keep original order
        break;
    }

    return items;
  }, [finalFilteredItems, sortOrder]);

  const itemsPerPage = 20;
  const totalFilteredItems = sortedItems.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
  const pageNeighbours = 2;

  // Get items for current page
  const currentPageItems = useMemo(() => {
    const startIndex = (pageNo - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedItems.slice(startIndex, endIndex);
  }, [sortedItems, pageNo, itemsPerPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [1];

    const pages = [];
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

  // Fetch category data when component mounts
  useEffect(() => {
    dispatch(
      fetchModuleData({
        module_action: "category",
      })
    );
  }, [dispatch]);

  // Fetch all product data when component mounts or module_action changes
  useEffect(() => {
    // Fetch all data without filters first
    const params = {
      limit: 1000, // Fetch more items to filter client-side
      page_no: 1,
    };

    dispatch(
      fetchModuleData({
        module_action: module_action,
        params: params,
      })
    );
  }, [dispatch, module_action]);

  // Reset page when filters change
  useEffect(() => {
    setPageNo(1);
  }, [selectedCategories, selectedStatus, selectedCondition, sortOrder]);

  const handleNextPage = () => {
    if (pageNo < totalPages) {
      setPageNo((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNo > 1) {
      setPageNo((prev) => prev - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== pageNo && pageNumber >= 1 && pageNumber <= totalPages) {
      setPageNo(pageNumber);
    }
  };

  const handleCategoryChange = (categoryName, isChecked) => {
    if (isChecked) {
      setSelectedCategories((prev) => [...prev, categoryName]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((cat) => cat !== categoryName)
      );
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleConditionChange = (condition) => {
    setSelectedCondition(condition);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // // Get unique categories from filtered items for display count
  // const getCategoryCount = (categoryName) => {
  //   return allItems.filter((item) => item.cat_name === categoryName).length;
  // };

  return (
    <div className="mt-2">
      <div className="container">
        <div className="row">
          <div className="col-md-3 ">
            <h5 className="">Filter by</h5>
            <div className="border-bottom"></div>
            <div className="mb-3 mt-3 ">
              <h5>Category</h5>
              {categoryData.map((category) => (
                <div key={category.cat_id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`category-${category.cat_id}`}
                    onChange={(e) =>
                      handleCategoryChange(category.cat_name, e.target.checked)
                    }
                    checked={selectedCategories.includes(category.cat_name)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`category-${category.cat_id}`}
                  >
                    {category.cat_name}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <h5>Status</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="any"
                  checked={selectedStatus === "any"}
                  onChange={() => handleStatusChange("any")}
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
                  checked={selectedStatus === "available"}
                  onChange={() => handleStatusChange("available")}
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
                  checked={selectedStatus === "sold"}
                  onChange={() => handleStatusChange("sold")}
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
                  checked={selectedCondition === "anyCondition"}
                  onChange={() => handleConditionChange("anyCondition")}
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
                  id="new"
                  checked={selectedCondition === "new"}
                  onChange={() => handleConditionChange("new")}
                />
                <label className="form-check-label" htmlFor="new">
                  New
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="like new"
                  checked={selectedCondition === "like new"}
                  onChange={() => handleConditionChange("like new")}
                />
                <label className="form-check-label" htmlFor="like new">
                  Like New
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="good"
                  checked={selectedCondition === "good"}
                  onChange={() => handleConditionChange("good")}
                />
                <label className="form-check-label" htmlFor="good">
                  Good
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="used"
                  checked={selectedCondition === "used"}
                  onChange={() => handleConditionChange("used")}
                />
                <label className="form-check-label" htmlFor="used">
                  Used
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between mb-3 py-4">
              <div className="d-flex align-items-start">
                <div className="form-check ">
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
                <div className="form-check mx-5">
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
              </div>
              <select 
                className="form-select w-25 p-2"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="default">Sort by default</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>

            {/* Results summary */}
            <div className="mb-3">
              <p className="text-muted">
                Showing {currentPageItems.length} of {totalFilteredItems}{" "}
                results
                {selectedCategories.length > 0 && (
                  <span> for: {selectedCategories.join(", ")}</span>
                )}
              </p>
            </div>

            <div className="row">
              {currentPageItems.length > 0 ? (
                currentPageItems.map((item, idx) => (
                  <div key={item.id || idx} className="col-md-3 mb-4">
                    <Card
                      className="h-100 w-100 border-0 position-relative"
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        opacity: item.is_sold === "1" ? 0.7 : 0.9,
                        backgroundColor:
                          item.is_sold === "1"
                            ? "rgba(255,255,255,0.8)"
                            : "white",
                        transition: "all 0.3s ease",
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
                        {/* Sold overlay */}
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
                                color: "white",
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
                          onClick={() => {
                            scrollToTop();
                            console.log(
                              "Clicked Product:",
                              item.product_name,
                              "| ID:",
                              item.id
                            );
                          }}
                        >
                          <Card.Img
                            src={item.product_slider_image?.[0]?.image}
                            style={{
                              objectFit: "cover",
                              filter:
                                item.is_sold === "1"
                                  ? "grayscale(50%)"
                                  : "none",
                            }}
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
                              color: item.is_sold === "1" ? "#999" : "#198754",
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
                                stroke: item.is_sold === "1" ? "#ddd" : "grey",
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
                    No products found matching your filters
                  </h5>
                  <p className="text-muted">
                    Try adjusting your filter criteria
                  </p>
                </div>
              )}
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
  );
};

export default SeeAllPage;