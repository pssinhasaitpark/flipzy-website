// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchModuleData } from "../../redux/slices/apiSlice";
// import { Card } from "react-bootstrap";
// import { FaRegStar, FaStar, FaSearch, FaBars } from "react-icons/fa";
// import { Link, useLocation, useParams } from "react-router-dom";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import logo from "../../assets/images/shortLogo.png";

// const HeaderSeeAll = ({
//   onShowFilter,
//   onSearch,
//   searchQuery,
//   onClearSearch,
// }) => {
//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     onSearch(query);
//   };

//   const handleClearSearch = () => {
//     onClearSearch();
//   };

//   return (
//     <nav
//       className="navbar navbar-expand-lg navbar-light bg-white"
//       style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
//     >
//       <div className="container-fluid">
//         <div
//           className="d-flex align-items-center w-100"
//           style={{ minHeight: "60px" }}
//         >
//           <a
//             className="navbar-brand flex-shrink-0 me-2"
//             href="/"
//             style={{ minWidth: "auto" }}
//           >
//             <img
//               src={logo}
//               height="40"
//               className="d-inline-block align-top"
//               alt="Logo"
//             />
//           </a>
//           <form
//             className="flex-grow-1 position-relative mx-2"
//             style={{ minWidth: "150px", maxWidth: "calc(100% - 120px)" }}
//             onSubmit={(e) => e.preventDefault()}
//           >
//             <input
//               className="form-control rounded-pill bg-light search-all w-100"
//               type="search"
//               placeholder="Search for anything"
//               aria-label="Search"
//               style={{ paddingRight: "45px", fontSize: "14px", height: "40px" }}
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             {searchQuery && (
//               <button
//                 type="button"
//                 className="position-absolute btn btn-link text-decoration-none"
//                 style={{ right: 40, top: "50%", transform: "translateY(-50%)" }}
//                 onClick={handleClearSearch}
//               >
//                 &times;
//               </button>
//             )}
//             <span
//               className="position-absolute search-bar"
//               style={{
//                 right: 12,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 pointerEvents: "none",
//               }}
//             >
//               <FaSearch size={16} />
//             </span>
//           </form>
//           <div className="flex-shrink-0" style={{ minWidth: "50px" }}>
//             <button
//               className="btn d-lg-none p-2"
//               style={{
//                 background: "transparent",
//                 boxShadow: "none",
//                 border: "none",
//                 outline: "none",
//                 fontSize: "24px",
//                 color: "#111",
//                 width: "44px",
//                 height: "44px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//               onClick={onShowFilter}
//               aria-label="Open Filters"
//             >
//               <FaBars />
//             </button>
//             <button
//               className="btn d-none d-lg-block px-3"
//               style={{
//                 fontWeight: "800",
//                 whiteSpace: "nowrap",
//                 fontSize: "14px",
//               }}
//               type="button"
//             >
//               Get the app
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// const SeeAllPage = () => {
//   const { module_action } = useParams();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const searchParams = new URLSearchParams(location.search);
//   const urlSearchQuery = searchParams.get("search") || "";
//   const [pageNo, setPageNo] = useState(1);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState("any");
//   const [selectedCondition, setSelectedCondition] = useState("anyCondition");
//   const [sortOrder, setSortOrder] = useState("default");
//   const [showFilter, setShowFilter] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const { data } = useSelector((state) => state.api);
//   const allItems = data[module_action]?.product || [];
//   const categoryData = data["category"]?.result || [];
//   const totalCount = data[module_action]?.totalCounts || 0;
//   console.log("totalCount", totalCount);
//   useEffect(() => {
//     if (location.state?.selectedCategory) {
//       setSelectedCategories([location.state.selectedCategory]);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     setSearchQuery(urlSearchQuery);
//   }, [urlSearchQuery]);

//   useEffect(() => {
//     dispatch(fetchModuleData({ module_action: "category" }));
//   }, [dispatch]);

//   useEffect(() => {
//     setLoading(true);
//     const params = {
//       search: urlSearchQuery.trim() || "",
//       cat_id: "",
//       sub_cat_id: "",
//       limit: 20,
//       page_no: pageNo,
//       sort_by: sortOrder !== "default" ? sortOrder : "",
//     };
//     dispatch(fetchModuleData({ module_action, params })).then(() => {
//       setLoading(false);
//     });
//   }, [dispatch, module_action, urlSearchQuery, pageNo, sortOrder]);

//   const filteredItems = useMemo(() => {
//     let items = allItems;
//     if (selectedCategories.length > 0) {
//       items = items.filter((item) =>
//         selectedCategories.includes(item.cat_name)
//       );
//     }
//     return items;
//   }, [allItems, selectedCategories]);

//   const finalFilteredItems = useMemo(() => {
//     let items = filteredItems;
//     if (selectedStatus !== "any") {
//       items =
//         selectedStatus === "available"
//           ? items.filter((item) => item.is_sold === "0")
//           : items.filter((item) => item.is_sold === "1");
//     }
//     if (selectedCondition !== "anyCondition") {
//       items = items.filter(
//         (item) =>
//           item.condition &&
//           item.condition.toLowerCase() === selectedCondition.toLowerCase()
//       );
//     }
//     return items;
//   }, [filteredItems, selectedStatus, selectedCondition]);

//   const sortedItems = useMemo(() => {
//     let items = [...finalFilteredItems];
//     if (sortOrder === "lowToHigh") {
//       items.sort(
//         (a, b) => parseFloat(a.selling_price) - parseFloat(b.selling_price)
//       );
//     } else if (sortOrder === "highToLow") {
//       items.sort(
//         (a, b) => parseFloat(b.selling_price) - parseFloat(a.selling_price)
//       );
//     }
//     return items;
//   }, [finalFilteredItems, sortOrder]);

//   const currentPageItems = useMemo(() => {
//     return sortedItems;
//   }, [sortedItems]);

//   useEffect(() => {
//     setPageNo(1);
//   }, [
//     selectedCategories,
//     selectedStatus,
//     selectedCondition,
//     sortOrder,
//     searchQuery,
//   ]);

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

//   const handleSortChange = (e) => setSortOrder(e.target.value);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const newUrl = new URL(window.location);
//     if (query.trim()) {
//       newUrl.searchParams.set("search", query);
//     } else {
//       newUrl.searchParams.delete("search");
//     }
//     window.history.pushState({}, "", newUrl);
//     if (window.searchTimeout) {
//       clearTimeout(window.searchTimeout);
//     }
//     window.searchTimeout = setTimeout(() => {
//       setSearchLoading(true);
//       const params = {
//         limit: 20,
//         page_no: 1,
//         sort_by: sortOrder !== "default" ? sortOrder : "",
//       };
//       if (query.trim()) {
//         params.search = query.trim();
//       }
//       dispatch(fetchModuleData({ module_action, params })).then(() => {
//         setSearchLoading(false);
//       });
//     }, 500);
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     const newUrl = new URL(window.location);
//     newUrl.searchParams.delete("search");
//     window.history.pushState({}, "", newUrl);
//     setSearchLoading(true);
//     dispatch(
//       fetchModuleData({
//         module_action,
//         params: {
//           limit: 20,
//           page_no: 1,
//           sort_by: sortOrder !== "default" ? sortOrder : "",
//         },
//       })
//     ).then(() => {
//       setSearchLoading(false);
//     });
//   };

//   const handlePageClick = (pageNumber) => {
//     if (pageNumber >= 1) {
//       setPageNo(pageNumber);
//     }
//   };
//   const getPageNumbers = (totalPages, currentPage, maxVisible = 5) => {
//     const pageNumbers = [];
//     const half = Math.floor(maxVisible / 2);

//     // Always show first page
//     pageNumbers.push(1);

//     // Show left ellipsis if needed
//     if (currentPage - half > 2) {
//       pageNumbers.push("left-ellipsis");
//     }

//     // Middle numbers
//     const start = Math.max(2, currentPage - half);
//     const end = Math.min(totalPages - 1, currentPage + half);
//     for (let i = start; i <= end; i++) {
//       pageNumbers.push(i);
//     }

//     // Show right ellipsis if needed
//     if (currentPage + half < totalPages - 1) {
//       pageNumbers.push("right-ellipsis");
//     }

//     // Always show last page
//     if (totalPages > 1) {
//       pageNumbers.push(totalPages);
//     }

//     return pageNumbers;
//   };
//   const totalPages = Math.ceil(totalCount / 20);
//   const pageNumbers = getPageNumbers(totalPages, pageNo, 5);
//   const FilterContents = (
//     <div>
//       <h5 className="mb-3">Filter by</h5>
//       {searchQuery && (
//         <div className="mb-3 p-2 bg-light rounded">
//           <div className="d-flex justify-content-between align-items-center">
//             <small className="text-muted">
//               Searching for: <strong>"{searchQuery}"</strong>
//             </small>
//             <button
//               className="btn btn-sm btn-outline-secondary"
//               onClick={handleClearSearch}
//               style={{ fontSize: "0.7rem", padding: "2px 8px" }}
//             >
//               Clear
//             </button>
//           </div>
//         </div>
//       )}
//       <div className="mb-3">
//         <h6 className="mb-2">Category</h6>
//         {loading
//           ? Array.from({ length: 5 }).map((_, idx) => (
//               <div key={idx} className="mb-2">
//                 <Skeleton height={20} width="80%" />
//               </div>
//             ))
//           : categoryData.map((cat) => (
//               <div key={cat.cat_id} className="form-check mb-1">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id={`category-${cat.cat_id}`}
//                   onChange={(e) =>
//                     handleCategoryChange(cat.cat_name, e.target.checked)
//                   }
//                   checked={selectedCategories.includes(cat.cat_name)}
//                 />
//                 <label
//                   className="form-check-label"
//                   htmlFor={`category-${cat.cat_id}`}
//                 >
//                   {cat.cat_name}
//                 </label>
//               </div>
//             ))}
//       </div>
//       <div className="mb-3">
//         <h6 className="mb-2">Status</h6>
//         {loading
//           ? Array.from({ length: 2 }).map((_, idx) => (
//               <div key={idx} className="mb-2">
//                 <Skeleton height={20} width="60%" />
//               </div>
//             ))
//           : ["any", "available", "sold"].map((status) => (
//               <div className="form-check form-check-inline mb-1" key={status}>
//                 <input
//                   type="radio"
//                   className="form-check-input"
//                   name="status"
//                   id={status}
//                   checked={selectedStatus === status}
//                   onChange={() => handleStatusChange(status)}
//                 />
//                 <label className="form-check-label" htmlFor={status}>
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </label>
//               </div>
//             ))}
//       </div>
//       <div className="mb-3">
//         <h6 className="mb-2">Condition</h6>
//         {loading
//           ? Array.from({ length: 5 }).map((_, idx) => (
//               <div key={idx} className="mb-2">
//                 <Skeleton height={20} width="70%" />
//               </div>
//             ))
//           : ["anyCondition", "new", "like new", "good", "used"].map((cond) => (
//               <div className="form-check form-check-inline mb-1" key={cond}>
//                 <input
//                   type="radio"
//                   className="form-check-input"
//                   name="condition"
//                   id={cond}
//                   checked={selectedCondition === cond}
//                   onChange={() => handleConditionChange(cond)}
//                 />
//                 <label className="form-check-label" htmlFor={cond}>
//                   {cond === "anyCondition"
//                     ? "Any"
//                     : cond
//                         .split(" ")
//                         .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//                         .join(" ")}
//                 </label>
//               </div>
//             ))}
//       </div>
//     </div>
//   );

//   const isDataLoading = loading || searchLoading;

//   return (
//     <div>
//       <HeaderSeeAll
//         onShowFilter={() => setShowFilter(true)}
//         onSearch={handleSearch}
//         searchQuery={searchQuery}
//         onClearSearch={handleClearSearch}
//       />
//       <div className="mt-2">
//         <div className="container">
//           <div className="row">
//             <div className="d-none d-lg-block col-lg-3">{FilterContents}</div>
//             <div
//               style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100vw",
//                 height: "100vh",
//                 zIndex: 2000,
//                 background: showFilter ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
//                 transition: "background 0.3s ease",
//                 pointerEvents: showFilter ? "auto" : "none",
//               }}
//               onClick={() => setShowFilter(false)}
//             >
//               <div
//                 style={{
//                   width: "80vw",
//                   maxWidth: 340,
//                   height: "100vh",
//                   background: "#fff",
//                   padding: 24,
//                   position: "absolute",
//                   left: 0,
//                   top: 0,
//                   zIndex: 2100,
//                   overflowY: "auto",
//                   boxShadow: "2px 0 24px rgba(0,0,0,0.13)",
//                   transform: showFilter ? "translateX(0)" : "translateX(-100%)",
//                   transition: "transform 0.3s ease",
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button
//                   className="btn btn-close float-end mb-3"
//                   onClick={() => setShowFilter(false)}
//                   aria-label="Close Filters"
//                 />
//                 {FilterContents}
//               </div>
//             </div>
//             <div className="col-12 col-lg-9">
//               <div
//                 className="d-flex flex-wrap justify-content-between align-items-center mb-3 py-4"
//                 style={{ paddingTop: 18, paddingBottom: 10 }}
//               >
//                 <div
//                   className="d-flex align-items-start flex-wrap"
//                   style={{ gap: 16 }}
//                 >
//                   {isDataLoading ? (
//                     <div className="d-flex gap-4">
//                       <Skeleton height={20} width={50} />
//                     </div>
//                   ) : (
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="flexRadioDisabled"
//                         id="flexRadioDisabled"
//                         checked
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="flexRadioDisabled"
//                       >
//                         All
//                       </label>
//                     </div>
//                   )}
//                 </div>
//                 {isDataLoading ? (
//                   <Skeleton height={38} width={180} />
//                 ) : (
//                   <select
//                     className="form-select"
//                     style={{ width: 180, minWidth: 100, maxWidth: "97vw" }}
//                     value={sortOrder}
//                     onChange={handleSortChange}
//                   >
//                     <option value="default">Sort by default</option>
//                     <option value="lowToHigh">Price: Low to High</option>
//                     <option value="highToLow">Price: High to Low</option>
//                   </select>
//                 )}
//               </div>
//               <div className="mb-3">
//                 {isDataLoading ? (
//                   <Skeleton height={20} width={300} />
//                 ) : (
//                   <p className="text-muted">
//                     Showing {currentPageItems.length} results
//                     {searchQuery && (
//                       <span>
//                         {" "}
//                         for search: <strong>"{searchQuery}"</strong>
//                       </span>
//                     )}
//                     {selectedCategories.length > 0 && (
//                       <span>
//                         {" "}
//                         | Categories: {selectedCategories.join(", ")}
//                       </span>
//                     )}
//                   </p>
//                 )}
//               </div>
//               <div className="row">
//                 {isDataLoading ? (
//                   Array.from({ length: 20 }).map((_, idx) => (
//                     <div
//                       key={idx}
//                       className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
//                     >
//                       <Card
//                         className="h-100 border-0"
//                         style={{
//                           borderRadius: "10px",
//                           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                         }}
//                       >
//                         <Skeleton height={200} />
//                         <Card.Body className="px-3 py-2">
//                           <Skeleton height={20} className="mb-2" />
//                           <Skeleton height={15} width="60%" className="mb-2" />
//                           <div className="d-flex align-items-center">
//                             <Skeleton height={20} width={80} className="me-2" />
//                             <Skeleton height={15} width={60} />
//                           </div>
//                           <div className="pt-3">
//                             <Skeleton
//                               height={15}
//                               width="50%"
//                               className="mb-2"
//                             />
//                             <div className="d-flex">
//                               {[...Array(5)].map((_, i) => (
//                                 <Skeleton
//                                   key={i}
//                                   height={16}
//                                   width={16}
//                                   circle
//                                   className="me-1"
//                                 />
//                               ))}
//                             </div>
//                           </div>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                   ))
//                 ) : currentPageItems.length > 0 ? (
//                   currentPageItems.map((item, idx) => (
//                     <div
//                       key={item.id || idx}
//                       className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
//                     >
//                       <Card
//                         className="h-100 border-0"
//                         style={{
//                           borderRadius: "10px",
//                           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                           opacity: item.is_sold === "1" ? 0.7 : 0.97,
//                           backgroundColor:
//                             item.is_sold === "1"
//                               ? "rgba(255,255,255,0.8)"
//                               : "#fff",
//                           transition: "all 0.3s",
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "100%",
//                             position: "relative",
//                             overflow: "hidden",
//                             height: "0",
//                             paddingBottom: "69%",
//                             minHeight: 120,
//                             maxHeight: 220,
//                             background: "#f9f9f9",
//                           }}
//                         >
//                           {item.is_sold === "1" && (
//                             <div
//                               style={{
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 right: 0,
//                                 bottom: 0,
//                                 backgroundColor: "rgba(255,255,255,0.7)",
//                                 zIndex: 2,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                               }}
//                             >
//                               <span
//                                 style={{
//                                   backgroundColor: "rgba(220,53,69,0.9)",
//                                   color: "#fff",
//                                   padding: "8px 16px",
//                                   borderRadius: "20px",
//                                   fontWeight: "bold",
//                                   fontSize: "0.9rem",
//                                   textTransform: "uppercase",
//                                   letterSpacing: "1px",
//                                 }}
//                               >
//                                 SOLD
//                               </span>
//                             </div>
//                           )}
//                           <Link
//                             to={{
//                               pathname: `/cartDetails/${encodeURIComponent(
//                                 item.product_name
//                               )}/${item.id}`,
//                             }}
//                             state={{ product: item }}
//                             style={{
//                               display: "block",
//                               width: "100%",
//                               height: "100%",
//                               position: "absolute",
//                               left: 0,
//                               top: 0,
//                             }}
//                           >
//                             <img
//                               src={item.product_slider_image?.[0]?.image}
//                               alt={item.product_name}
//                               style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "cover",
//                                 filter:
//                                   item.is_sold === "1"
//                                     ? "grayscale(50%)"
//                                     : "none",
//                                 position: "absolute",
//                                 left: 0,
//                                 top: 0,
//                               }}
//                             />
//                           </Link>
//                         </div>
//                         <Card.Body className="px-3 py-2">
//                           <Card.Title
//                             className="mb-1 text-black fw-bold"
//                             style={{
//                               fontSize: "0.99rem",
//                               whiteSpace: "nowrap",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               color: item.is_sold === "1" ? "#666" : "#000",
//                             }}
//                           >
//                             {item.product_name}
//                           </Card.Title>
//                           <Card.Text
//                             className="text-muted"
//                             style={{
//                               fontSize: "0.85rem",
//                               color: item.is_sold === "1" ? "#999" : "#6c757d",
//                             }}
//                           >
//                             {item.cat_name}
//                           </Card.Text>
//                           <div className="d-flex align-items-center">
//                             <span
//                               className="fw-bolder text-success me-2"
//                               style={{
//                                 color:
//                                   item.is_sold === "1" ? "#999" : "#198754",
//                                 fontWeight: 700,
//                                 fontSize: "1rem",
//                               }}
//                             >
//                               ₹{item.selling_price}
//                             </span>
//                             <span className="ml-2">
//                               <strike
//                                 className="text-muted"
//                                 style={{
//                                   fontSize: "0.85rem",
//                                   color:
//                                     item.is_sold === "1" ? "#ccc" : "#6c757d",
//                                 }}
//                               >
//                                 ₹{item.mrp}
//                               </strike>
//                             </span>
//                           </div>
//                           <div className="pt-3">
//                             <span
//                               className="fw-bolder text-black me-2"
//                               style={{
//                                 color: item.is_sold === "1" ? "#999" : "#000",
//                               }}
//                             >
//                               {item.username}
//                             </span>
//                             <div className="d-flex mt-2">
//                               {[...Array(4)].map((_, i) => (
//                                 <FaStar
//                                   key={i}
//                                   style={{
//                                     color:
//                                       item.is_sold === "1" ? "#ccc" : "green",
//                                     fontSize: "1rem",
//                                     marginRight: "3px",
//                                   }}
//                                 />
//                               ))}
//                               <FaRegStar
//                                 style={{
//                                   color: item.is_sold === "1" ? "#ddd" : "grey",
//                                   fontSize: "1rem",
//                                   marginLeft: "3px",
//                                   stroke:
//                                     item.is_sold === "1" ? "#ddd" : "grey",
//                                   strokeWidth: "10",
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="col-12 text-center py-5">
//                     <h5 className="text-muted">
//                       {searchQuery
//                         ? `No products found for "${searchQuery}"`
//                         : "No products found matching your filters"}
//                     </h5>
//                     <p className="text-muted">
//                       {searchQuery
//                         ? "Try searching with different keywords"
//                         : "Try adjusting your filter criteria"}
//                     </p>
//                     {searchQuery && (
//                       <button
//                         className="btn btn-primary mt-2"
//                         onClick={handleClearSearch}
//                       >
//                         Clear Search and Show All Products
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//               {!isDataLoading && (
//                 <div className="d-flex justify-content-center mt-4">
//                   <ul
//                     className="pagination"
//                     style={{ display: "flex", listStyle: "none" }}
//                   >
//                     <li style={{ margin: "0 5px" }}>
//                       <button
//                         className="page-link"
//                         onClick={() => handlePageClick(pageNo - 1)}
//                         disabled={pageNo === 1}
//                       >
//                         Previous
//                       </button>
//                     </li>

//                     {pageNumbers.map((number, idx) =>
//                       number === "left-ellipsis" ||
//                       number === "right-ellipsis" ? (
//                         <li key={`ellipsis-${idx}`} style={{ margin: "0 5px" }}>
//                           <span>...</span>
//                         </li>
//                       ) : (
//                         <li key={number} style={{ margin: "0 5px" }}>
//                           <button
//                             className="page-link"
//                             onClick={() => handlePageClick(number)}
//                             style={{
//                               border: "none",
//                               background: "none",
//                               cursor: "pointer",
//                               color: pageNo === number ? "red" : "black",
//                               fontWeight: pageNo === number ? "bold" : "normal",
//                             }}
//                           >
//                             {number}
//                           </button>
//                         </li>
//                       )
//                     )}

//                     <li style={{ margin: "0 5px" }}>
//                       <button
//                         className="page-link"
//                         onClick={() => handlePageClick(pageNo + 1)}
//                         disabled={pageNo === totalPages}
//                       >
//                         Next
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
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
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import logo from "../../assets/images/shortLogo.png";

const HeaderSeeAll = ({ onShowFilter, onSearch, searchQuery, onClearSearch }) => {
  const handleSearchChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  const handleClearSearch = () => {
    onClearSearch();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center w-100" style={{ minHeight: "60px" }}>
          <a className="navbar-brand flex-shrink-0 me-2" href="/" style={{ minWidth: "auto" }}>
            <img src={logo} height="40" className="d-inline-block align-top" alt="Logo" />
          </a>
          <form className="flex-grow-1 position-relative mx-2" style={{ minWidth: "150px", maxWidth: "calc(100% - 120px)" }} onSubmit={(e) => e.preventDefault()}>
            <input className="form-control rounded-pill bg-light search-all w-100" type="search" placeholder="Search for anything" aria-label="Search" style={{ paddingRight: "45px", fontSize: "14px", height: "40px" }} value={searchQuery} onChange={handleSearchChange} />
            {searchQuery && (
              <button type="button" className="position-absolute btn btn-link text-decoration-none" style={{ right: 40, top: "50%", transform: "translateY(-50%)" }} onClick={handleClearSearch}>&times;</button>
            )}
            <span className="position-absolute search-bar" style={{ right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <FaSearch size={16} />
            </span>
          </form>
          <div className="flex-shrink-0" style={{ minWidth: "50px" }}>
            <button className="btn d-lg-none p-2" style={{ background: "transparent", boxShadow: "none", border: "none", outline: "none", fontSize: "24px", color: "#111", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onShowFilter} aria-label="Open Filters">
              <FaBars />
            </button>
            <button className="btn d-none d-lg-block px-3" style={{ fontWeight: "800", whiteSpace: "nowrap", fontSize: "14px" }} type="button">Get the app</button>
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
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get("search") || "";
  const [pageNo, setPageNo] = useState(() => {
    const savedPageNo = location.state?.pageNo;
    return savedPageNo ? savedPageNo : 1;
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("any");
  const [selectedCondition, setSelectedCondition] = useState("anyCondition");
  const [sortOrder, setSortOrder] = useState("default");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [searchLoading, setSearchLoading] = useState(false);
  const { data } = useSelector((state) => state.api);
  const allItems = data[module_action]?.product || [];
  const categoryData = data["category"]?.result || [];
  const totalCount = data[module_action]?.totalCounts || 0;

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategories([location.state.selectedCategory]);
    }
  }, [location.state]);

  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  useEffect(() => {
    dispatch(fetchModuleData({ module_action: "category" }));
  }, [dispatch]);

  const getCategoryIds = (categoryNames) => {
    return categoryNames
      .map((catName) => {
        const category = categoryData.find((cat) => cat.cat_name === catName);
        return category ? category.cat_id : null;
      })
      .filter((id) => id !== null);
  };

  const fetchDataWithParams = (customParams = {}) => {
    setLoading(true);
    const categoryIds = getCategoryIds(selectedCategories);
    const params = {
      search: urlSearchQuery.trim() || "",
      cat_id: categoryIds.length > 0 ? categoryIds.join(",") : "",
      sub_cat_id: "",
      limit: 20,
      page_no: pageNo,
      sort_by: sortOrder !== "default" ? sortOrder : "",
      status: selectedStatus !== "any" ? selectedStatus : "",
      condition: selectedCondition !== "anyCondition" ? selectedCondition : "",
      ...customParams,
    };
    dispatch(fetchModuleData({ module_action, params })).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchDataWithParams();
  }, [dispatch, module_action, urlSearchQuery, pageNo, sortOrder, selectedCategories, selectedStatus, selectedCondition]);

  const currentPageItems = useMemo(() => {
    let items = [...allItems];
    if (sortOrder === "lowToHigh") {
      items.sort((a, b) => parseFloat(a.selling_price) - parseFloat(b.selling_price));
    } else if (sortOrder === "highToLow") {
      items.sort((a, b) => parseFloat(b.selling_price) - parseFloat(a.selling_price));
    }
    return items;
  }, [allItems, sortOrder]);

  useEffect(() => {
    setPageNo(1);
  }, [selectedCategories, selectedStatus, selectedCondition, sortOrder, searchQuery]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) => {
      if (prev[0] === categoryName) {
        return [];
      }
      return [categoryName];
    });
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleConditionChange = (condition) => {
    setSelectedCondition(condition);
  };

  const handleSortChange = (e) => setSortOrder(e.target.value);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const newUrl = new URL(window.location);
    if (query.trim()) {
      newUrl.searchParams.set("search", query);
    } else {
      newUrl.searchParams.delete("search");
    }
    window.history.pushState({}, "", newUrl);
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    window.searchTimeout = setTimeout(() => {
      setSearchLoading(true);
      const categoryIds = getCategoryIds(selectedCategories);
      const params = {
        limit: 20,
        page_no: 1,
        sort_by: sortOrder !== "default" ? sortOrder : "",
        cat_id: categoryIds.length > 0 ? categoryIds.join(",") : "",
        status: selectedStatus !== "any" ? selectedStatus : "",
        condition: selectedCondition !== "anyCondition" ? selectedCondition : "",
      };
      if (query.trim()) {
        params.search = query.trim();
      }
      dispatch(fetchModuleData({ module_action, params })).then(() => {
        setSearchLoading(false);
      });
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete("search");
    window.history.pushState({}, "", newUrl);
    setSearchLoading(true);
    const categoryIds = getCategoryIds(selectedCategories);
    dispatch(
      fetchModuleData({
        module_action,
        params: {
          limit: 20,
          page_no: 1,
          sort_by: sortOrder !== "default" ? sortOrder : "",
          cat_id: categoryIds.length > 0 ? categoryIds.join(",") : "",
          status: selectedStatus !== "any" ? selectedStatus : "",
          condition: selectedCondition !== "anyCondition" ? selectedCondition : "",
        },
      })
    ).then(() => {
      setSearchLoading(false);
    });
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1) {
      setPageNo(pageNumber);
    }
  };

  const getPageNumbers = (totalPages, currentPage, maxVisible = 5) => {
    const pageNumbers = [];
    const half = Math.floor(maxVisible / 2);
    pageNumbers.push(1);
    if (currentPage - half > 2) {
      pageNumbers.push("left-ellipsis");
    }
    const start = Math.max(2, currentPage - half);
    const end = Math.min(totalPages - 1, currentPage + half);
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    if (currentPage + half < totalPages - 1) {
      pageNumbers.push("right-ellipsis");
    }
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const totalPages = Math.ceil(totalCount / 20);
  const pageNumbers = getPageNumbers(totalPages, pageNo, 5);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const FilterContents = (
    <div>
      <h5 className="mb-3">Filter by</h5>
      {searchQuery && (
        <div className="mb-3 p-2 bg-light rounded">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Searching for: <strong>"{searchQuery}"</strong>
            </small>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleClearSearch} style={{ fontSize: "0.7rem", padding: "2px 8px" }}>Clear</button>
          </div>
        </div>
      )}
      <div className="mb-3">
        <h6 className="mb-2">Category</h6>
        {loading ? Array.from({ length: 5 }).map((_, idx) => <div key={idx} className="mb-2"><Skeleton height={20} width="80%" /></div>) : categoryData.map((cat) => (
          <div key={cat.cat_id} className="form-check mb-1">
            <input type="radio" className="form-check-input" id={`category-${cat.cat_id}`} onChange={() => handleCategoryChange(cat.cat_name)} checked={selectedCategories.includes(cat.cat_name)} />
            <label className="form-check-label" htmlFor={`category-${cat.cat_id}`}>{cat.cat_name}</label>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <h6 className="mb-2">Status</h6>
        {loading ? Array.from({ length: 2 }).map((_, idx) => <div key={idx} className="mb-2"><Skeleton height={20} width="60%" /></div>) : ["any", "available", "sold"].map((status) => (
          <div className="form-check form-check-inline mb-1" key={status}>
            <input type="radio" className="form-check-input" name="status" id={status} checked={selectedStatus === status} onChange={() => handleStatusChange(status)} />
            <label className="form-check-label" htmlFor={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</label>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <h6 className="mb-2">Condition</h6>
        {loading ? Array.from({ length: 5 }).map((_, idx) => <div key={idx} className="mb-2"><Skeleton height={20} width="70%" /></div>) : ["anyCondition", "new", "like new", "good", "used"].map((cond) => (
          <div className="form-check form-check-inline mb-1" key={cond}>
            <input type="radio" className="form-check-input" name="condition" id={cond} checked={selectedCondition === cond} onChange={() => handleConditionChange(cond)} />
            <label className="form-check-label" htmlFor={cond}>{cond === "anyCondition" ? "Any" : cond.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</label>
          </div>
        ))}
      </div>
    </div>
  );

  const isDataLoading = loading || searchLoading;

  return (
    <div>
      <HeaderSeeAll onShowFilter={() => setShowFilter(true)} onSearch={handleSearch} searchQuery={searchQuery} onClearSearch={handleClearSearch} />
      <div className="mt-2">
        <div className="container">
          <div className="row">
            <div className="d-none d-lg-block col-lg-3">{FilterContents}</div>
            <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 2000, background: showFilter ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)", transition: "background 0.3s ease", pointerEvents: showFilter ? "auto" : "none" }} onClick={() => setShowFilter(false)}>
              <div style={{ width: "80vw", maxWidth: 340, height: "100vh", background: "#fff", padding: 24, position: "absolute", left: 0, top: 0, zIndex: 2100, overflowY: "auto", boxShadow: "2px 0 24px rgba(0,0,0,0.13)", transform: showFilter ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s ease" }} onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-close float-end mb-3" onClick={() => setShowFilter(false)} aria-label="Close Filters" />
                {FilterContents}
              </div>
            </div>
            <div className="col-12 col-lg-9">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 py-4" style={{ paddingTop: 18, paddingBottom: 10 }}>
                <div className="d-flex align-items-start flex-wrap" style={{ gap: 16 }}>
                  {isDataLoading ? <div className="d-flex gap-4"><Skeleton height={20} width={50} /></div> : <div className="form-check"><input className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" checked /><label className="form-check-label" htmlFor="flexRadioDisabled">All</label></div>}
                </div>
                {isDataLoading ? <Skeleton height={38} width={180} /> : <select className="form-select" style={{ width: 180, minWidth: 100, maxWidth: "97vw" }} value={sortOrder} onChange={handleSortChange}><option value="default">Sort by default</option><option value="lowToHigh">Price: Low to High</option><option value="highToLow">Price: High to Low</option></select>}
              </div>
              <div className="mb-3">
                {isDataLoading ? <Skeleton height={20} width={300} /> : <p className="text-muted">Showing {currentPageItems.length} results{searchQuery && <span> for search: <strong>"{searchQuery}"</strong></span>}{selectedCategories.length > 0 && <span> | Categories: {selectedCategories.join(", ")}</span>}</p>}
              </div>
              <div className="row">
                {isDataLoading ? Array.from({ length: 20 }).map((_, idx) => (
                  <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <Card className="h-100 border-0" style={{ borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                      <Skeleton height={200} />
                      <Card.Body className="px-3 py-2">
                        <Skeleton height={20} className="mb-2" />
                        <Skeleton height={15} width="60%" className="mb-2" />
                        <div className="d-flex align-items-center">
                          <Skeleton height={20} width={80} className="me-2" />
                          <Skeleton height={15} width={60} />
                        </div>
                        <div className="pt-3">
                          <Skeleton height={15} width="50%" className="mb-2" />
                          <div className="d-flex">
                            {[...Array(5)].map((_, i) => <Skeleton key={i} height={16} width={16} circle className="me-1" />)}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                )) : currentPageItems.length > 0 ? currentPageItems.map((item, idx) => (
                  <div key={item.id || idx} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <Card className="h-100 border-0" style={{ borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", opacity: item.is_sold === "1" ? 0.7 : 0.97, backgroundColor: item.is_sold === "1" ? "rgba(255,255,255,0.8)" : "#fff", transition: "all 0.3s" }}>
                      <div style={{ width: "100%", position: "relative", overflow: "hidden", height: "0", paddingBottom: "69%", minHeight: 120, maxHeight: 220, background: "#f9f9f9" }}>
                        {item.is_sold === "1" && (
                          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255,255,255,0.7)", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ backgroundColor: "rgba(220,53,69,0.9)", color: "#fff", padding: "8px 16px", borderRadius: "20px", fontWeight: "bold", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>SOLD</span>
                          </div>
                        )}
                        <Link to={{ pathname: `/cartDetails/${encodeURIComponent(item.product_name)}/${item.id}` }} state={{ product: item, pageNo }} onClick={scrollToTop} style={{ display: "block", width: "100%", height: "100%", position: "absolute", left: 0, top: 0 }}>
                          <img src={item.product_slider_image?.[0]?.image} alt={item.product_name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: item.is_sold === "1" ? "grayscale(50%)" : "none", position: "absolute", left: 0, top: 0 }} />
                        </Link>
                      </div>
                      <Card.Body className="px-3 py-2">
                        <Card.Title className="mb-1 text-black fw-bold" style={{ fontSize: "0.99rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: item.is_sold === "1" ? "#666" : "#000" }}>{item.product_name}</Card.Title>
                        <Card.Text className="text-muted" style={{ fontSize: "0.85rem", color: item.is_sold === "1" ? "#999" : "#6c757d" }}>{item.cat_name}</Card.Text>
                        <div className="d-flex align-items-center">
                          <span className="fw-bolder text-success me-2" style={{ color: item.is_sold === "1" ? "#999" : "#198754", fontWeight: 700, fontSize: "1rem" }}>₹{item.selling_price}</span>
                          <span className="ml-2"><strike className="text-muted" style={{ fontSize: "0.85rem", color: item.is_sold === "1" ? "#ccc" : "#6c757d" }}>₹{item.mrp}</strike></span>
                        </div>
                        <div className="pt-3">
                          <span className="fw-bolder text-black me-2" style={{ color: item.is_sold === "1" ? "#999" : "#000" }}>{item.username}</span>
                          <div className="d-flex mt-2">
                            {[...Array(4)].map((_, i) => <FaStar key={i} style={{ color: item.is_sold === "1" ? "#ccc" : "green", fontSize: "1rem", marginRight: "3px" }} />)}
                            <FaRegStar style={{ color: item.is_sold === "1" ? "#ddd" : "grey", fontSize: "1rem", marginLeft: "3px", stroke: item.is_sold === "1" ? "#ddd" : "grey", strokeWidth: "10" }} />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                )) : (
                  <div className="col-12 text-center py-5">
                    <h5 className="text-muted">{searchQuery ? `No products found for "${searchQuery}"` : "No products found matching your filters"}</h5>
                    <p className="text-muted">{searchQuery ? "Try searching with different keywords" : "Try adjusting your filter criteria"}</p>
                    {searchQuery && <button className="btn btn-primary mt-2" onClick={handleClearSearch}>Clear Search and Show All Products</button>}
                  </div>
                )}
              </div>
              {!isDataLoading && (
                <div className="d-flex justify-content-center mt-4">
                  <ul className="pagination" style={{ display: "flex", listStyle: "none" }}>
                    <li style={{ margin: "0 5px" }}>
                      <button className="page-link" onClick={() => handlePageClick(pageNo - 1)} disabled={pageNo === 1}>Previous</button>
                    </li>
                    {pageNumbers.map((number, idx) => number === "left-ellipsis" || number === "right-ellipsis" ? (
                      <li key={`ellipsis-${idx}`} style={{ margin: "0 5px" }}><span>...</span></li>
                    ) : (
                      <li key={number} style={{ margin: "0 5px" }}>
                        <button className="page-link" onClick={() => handlePageClick(number)} style={{ border: "none", background: "none", cursor: "pointer", color: pageNo === number ? "red" : "black", fontWeight: pageNo === number ? "bold" : "normal" }}>{number}</button>
                      </li>
                    ))}
                    <li style={{ margin: "0 5px" }}>
                      <button className="page-link" onClick={() => handlePageClick(pageNo + 1)} disabled={pageNo === totalPages}>Next</button>
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
