// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import {
//   fetchPaymentMethodsBySellerId,
//   addPaymentMethodBySellerId,
//   updatePaymentMethodBySellerId,
//   deletePaymentMethodBySellerId,
// } from "../../redux/slices/paymentSlice";
// import { ChevronDown, Eye, EyeOff, Plus, Trash2, Edit3 } from "lucide-react";
// import { RxCross2 } from "react-icons/rx";

// const PaymentMethod = () => {
//   const dispatch = useDispatch();

//   // Fixed Redux state access
//   const { paymentMethods, loading, error } = useSelector((state) => ({
//     paymentMethods: Array.isArray(state.payment.paymentMethods)
//       ? state.payment.paymentMethods
//       : [],
//     loading: state.payment.loading?.getPaymentMethodsBySellerId || false,
//     error: state.payment.error,
//   }));

//   const [showModal, setShowModal] = useState(false);
//   const [currentPaymentMethod, setCurrentPaymentMethod] = useState(null);
//   const [showAccountNumber, setShowAccountNumber] = useState(false);
//   const [showIFSC, setShowIFSC] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const bankOptions = [
//     "State Bank of India",
//     "HDFC Bank",
//     "ICICI Bank",
//     "Axis Bank",
//     "Kotak Mahindra Bank",
//     "Punjab National Bank",
//     "Bank of Baroda",
//     "Canara Bank",
//     "Union Bank of India",
//     "Bank of India",
//   ];

//   // Initial form values
//   const initialValues = {
//     bankName: "",
//     accountName: "",
//     accountNumber: "",
//     ifscCode: "",
//     upiId: "",
//   };

//   // Validation schema
//   const validationSchema = Yup.object({
//     bankName: Yup.string()
//       .required("Bank name is required")
//       .notOneOf(["Select Bank Name"], "Please select a valid bank"),
//     accountName: Yup.string()
//       .required("Account name is required")
//       .min(2, "Account name must be at least 2 characters")
//       .max(50, "Account name must not exceed 50 characters")
//       .matches(
//         /^[a-zA-Z\s]+$/,
//         "Account name should contain only letters and spaces"
//       ),
//     accountNumber: Yup.string()
//       .required("Account number is required")
//       .matches(/^[0-9]+$/, "Account number should contain only numbers")
//       .min(9, "Account number must be at least 9 digits")
//       .max(18, "Account number must not exceed 18 digits"),
//     ifscCode: Yup.string()
//       .required("IFSC code is required")
//       .matches(
//         /^[A-Z]{4}0[A-Z0-9]{6}$/,
//         "Invalid IFSC code format (e.g., SBIN0123456)"
//       )
//       .length(11, "IFSC code must be exactly 11 characters"),
//     upiId: Yup.string()
//       .optional()
//       .matches(
//         /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z0-9.\-_]{2,64}$/,
//         "Invalid UPI ID format (e.g., example@upi)"
//       ),
//   });

//   // Log paymentMethods whenever it changes
//   useEffect(() => {
//     console.log("Payment methods from Redux:", paymentMethods);
//   }, [paymentMethods]);

//   // Get seller_id from localStorage
//   const getSellerId = () => {
//     const userData = JSON.parse(localStorage.getItem("user") || "{}");
//     return userData.seller_id || 22; // fallback to 22 if not found
//   };

//   // Fetch payment methods on mount
//   useEffect(() => {
//     const sellerId = getSellerId();
//     console.log("Fetching payment methods for sellerId:", sellerId);
//     dispatch(fetchPaymentMethodsBySellerId({ sellerId }));
//   }, [dispatch]);

//   const handleBankSelect = (bank, setFieldValue) => {
//     setFieldValue("bankName", bank);
//     setIsDropdownOpen(false);
//   };

//   const resetForm = () => {
//     setCurrentPaymentMethod(null);
//     setShowModal(false);
//     setIsDropdownOpen(false);
//     setShowAccountNumber(false);
//     setShowIFSC(false);
//   };

//   const handleSubmit = async (
//     values,
//     { setSubmitting, resetForm: formikReset }
//   ) => {
//     try {
//       const sellerId = getSellerId();

//       if (currentPaymentMethod) {
//         // Update existing payment method
//         const params = {
//           module_action: "updatePaymentMethodBySellerId",
//           payment_method_id: currentPaymentMethod.payment_method_id,
//           seller_id: sellerId,
//           account_name: values.accountName,
//           account_number: values.accountNumber,
//           ifsc_code: values.ifscCode,
//           bank_name: values.bankName,
//           upi_id: values.upiId,
//         };

//         await dispatch(updatePaymentMethodBySellerId(params));
//         await dispatch(fetchPaymentMethodsBySellerId({ sellerId }));
//         toast.success("Payment method updated successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       } else {
//         // Add new payment method
//         const params = {
//           module_action: "addPaymentMethodBySellerId",
//           seller_id: sellerId,
//           account_name: values.accountName,
//           account_number: values.accountNumber,
//           ifsc_code: values.ifscCode,
//           bank_name: values.bankName,
//           upi_id: values.upiId,
//         };

//         await dispatch(addPaymentMethodBySellerId(params));
//         await dispatch(fetchPaymentMethodsBySellerId({ sellerId }));
//         toast.success("Payment method added successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }

//       formikReset();
//       resetForm();
//     } catch (error) {
//       toast.error("Operation failed. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       console.error("Payment method operation failed:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeletePaymentMethod = async (paymentMethodId) => {
//     if (
//       window.confirm("Are you sure you want to delete this payment method?")
//     ) {
//       try {
//         const sellerId = getSellerId();
//         await dispatch(
//           deletePaymentMethodBySellerId({
//             module_action: "deletePaymentMethodBySellerId",
//             payment_method_id: paymentMethodId,
//             seller_id: sellerId,
//           })
//         );
//         await dispatch(fetchPaymentMethodsBySellerId({ sellerId }));
//         toast.success("Payment method deleted successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       } catch (error) {
//         toast.error("Failed to delete payment method. Please try again.", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         console.error("Delete operation failed:", error);
//       }
//     }
//   };

//   const handleEditClick = (paymentMethod) => {
//     setCurrentPaymentMethod(paymentMethod);
//     setShowModal(true);
//   };

//   const handleAddNewClick = () => {
//     setCurrentPaymentMethod(null);
//     setShowModal(true);
//   };

//   // Filter out invalid payment methods (those without proper data)
//   const validPaymentMethods = paymentMethods.filter(
//     (method) =>
//       method &&
//       method.payment_method_id &&
//       (method.account_name || method.upi_id) // Must have either account name or UPI ID
//   );

//   // Get initial values for edit mode
//   const getInitialValues = () => {
//     if (currentPaymentMethod) {
//       return {
//         bankName: currentPaymentMethod.bank_name || "",
//         accountName: currentPaymentMethod.account_name || "",
//         accountNumber: currentPaymentMethod.account_number || "",
//         ifscCode: currentPaymentMethod.ifsc_code || "",
//         upiId: currentPaymentMethod.upi_id || "",
//       };
//     }
//     return initialValues;
//   };

//   return (
//     <div className="container-fluid p-3">
//       <div className="mb-4 row justify-content-center">
//         <div className="col-12">
//           <h5 className="mb-3 text-center">Payment Methods</h5>

//           {loading ? (
//             <div className="text-center">Loading payment methods...</div>
//           ) : error ? (
//             <div className="text-center text-danger">{error}</div>
//           ) : validPaymentMethods.length > 0 ? (
//             <div className="row">
//               {validPaymentMethods.map((method) => (
//                 <div
//                   key={method.payment_method_id}
//                   className="col-lg-4 col-md-6 col-sm-12 mb-3"
//                 >
//                   <div className="card h-100 shadow-sm">
//                     <div className="card-body p-3 d-flex flex-column">
//                       <div className="flex-grow-1">
//                         <div className="d-flex justify-content-between align-items-start mb-2">
//                           <span className="badge bg-primary me-2">
//                             ID - #{method.payment_method_id}
//                           </span>
//                           <div>
                           
                          
//                           </div>
//                         </div>

//                         {/* Show bank name only if it's not the default placeholder */}
//                         {method.bank_name &&
//                           method.bank_name !== "Select Bank Name" && (
//                             <div className="mb-2">
//                               <strong className="text-success">
//                                 {method.bank_name}
//                               </strong>
//                             </div>
//                           )}

//                         {/* Show account details only if account name exists */}
//                         {method.account_name && (
//                           <>
//                             <div className="mb-2">
//                               <span className="text-muted small">
//                                 Account Name:{" "}
//                               </span>
//                               <strong>{method.account_name}</strong>
//                             </div>

//                             {method.account_number && (
//                               <div className="mb-2">
//                                 <span className="text-muted small">
//                                   Account Number:{" "}
//                                 </span>
//                                 <span>
//                                   ****{method.account_number.slice(-4)}
//                                 </span>
//                               </div>
//                             )}

//                             {method.ifsc_code && (
//                               <div className="mb-2">
//                                 <span className="text-muted small">
//                                   IFSC Code:{" "}
//                                 </span>
//                                 <span>{method.ifsc_code}</span>
//                               </div>
//                             )}
//                           </>
//                         )}

//                         {/* Always show UPI ID if it exists */}
//                         {method.upi_id && (
//                           <div className="mb-2">
//                             <span className="text-muted small">UPI ID: </span>
//                             <span className="text-primary fw-bold">
//                               {method.upi_id}
//                             </span>
//                           </div>
//                         )}

//                         {/* Show payment type badge */}
//                         <div className="mt-2">
//                           {method.upi_id && method.account_name ? (
//                             <span className="badge bg-info">Bank + UPI</span>
//                           ) : method.upi_id ? (
//                             <span className="badge bg-warning">UPI Only</span>
//                           ) : (
//                             <span className="badge bg-success">
//                               Bank Account
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center">
//               <div className="alert alert-info">
//                 No payment methods found. Add your first payment method to get
//                 started.
//               </div>
//             </div>
//           )}

//           <div className="row mt-4">
//             <div className="col-12 text-center">
//               <button
//                 className="btn btn-success py-3 fw-bold px-5"
//                 onClick={handleAddNewClick}
//               >
//                 <Plus className="me-2" size={18} />
//                 Add New Payment Method
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//               <div className="modal-header border-0">
//                 <h5 className="modal-title">
//                   {currentPaymentMethod
//                     ? "Edit Payment Method"
//                     : "Add New Payment Method"}
//                 </h5>
//                 <button type="button" className="btn-close" onClick={resetForm}>
//                   <RxCross2 />
//                 </button>
//               </div>

//               <Formik
//                 initialValues={getInitialValues()}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//                 enableReinitialize={true}
//               >
//                 {({ values, setFieldValue, isSubmitting, errors, touched }) => (
//                   <Form>
//                     <div className="modal-body">
//                       {/* Bank Selection Dropdown */}
//                       <div className="mb-3">
//                         <label className="form-label">Select Bank*</label>
//                         <div style={{ position: "relative" }}>
//                           <div
//                             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                             className={`form-control d-flex justify-content-between align-items-center ${
//                               errors.bankName && touched.bankName
//                                 ? "is-invalid"
//                                 : ""
//                             }`}
//                             style={{
//                               cursor: "pointer",
//                               color: values.bankName ? "#333" : "#999",
//                             }}
//                           >
//                             <span>{values.bankName || "Select Bank Name"}</span>
//                             <ChevronDown
//                               size={20}
//                               style={{
//                                 color: "#666",
//                                 transform: isDropdownOpen
//                                   ? "rotate(180deg)"
//                                   : "rotate(0deg)",
//                                 transition: "transform 0.2s ease",
//                               }}
//                             />
//                           </div>
//                           {isDropdownOpen && (
//                             <div
//                               style={{
//                                 position: "absolute",
//                                 top: "100%",
//                                 left: 0,
//                                 right: 0,
//                                 backgroundColor: "white",
//                                 border: "1px solid #ddd",
//                                 borderRadius: "8px",
//                                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                                 zIndex: 1000,
//                                 maxHeight: "200px",
//                                 overflowY: "auto",
//                               }}
//                             >
//                               {bankOptions.map((bank, index) => (
//                                 <div
//                                   key={index}
//                                   onClick={() =>
//                                     handleBankSelect(bank, setFieldValue)
//                                   }
//                                   className="p-3"
//                                   style={{
//                                     cursor: "pointer",
//                                     fontSize: "14px",
//                                     borderBottom:
//                                       index < bankOptions.length - 1
//                                         ? "1px solid #f0f0f0"
//                                         : "none",
//                                   }}
//                                   onMouseEnter={(e) =>
//                                     (e.target.style.backgroundColor = "#f8f9fa")
//                                   }
//                                   onMouseLeave={(e) =>
//                                     (e.target.style.backgroundColor = "white")
//                                   }
//                                 >
//                                   {bank}
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                         <ErrorMessage
//                           name="bankName"
//                           component="div"
//                           className="invalid-feedback d-block"
//                         />
//                       </div>

//                       {/* Account Name Input */}
//                       <div className="mb-3">
//                         <label className="form-label">Account Name*</label>
//                         <Field
//                           type="text"
//                           name="accountName"
//                           className={`form-control ${
//                             errors.accountName && touched.accountName
//                               ? "is-invalid"
//                               : ""
//                           }`}
//                           placeholder="Enter account holder name"
//                         />
//                         <ErrorMessage
//                           name="accountName"
//                           component="div"
//                           className="invalid-feedback"
//                         />
//                       </div>

//                       {/* Account Number Input */}
//                       <div className="mb-3">
//                         <label className="form-label">Account Number*</label>
//                         <div className="position-relative">
//                           <Field
//                             type={showAccountNumber ? "text" : "password"}
//                             name="accountNumber"
//                             className={`form-control ${
//                               errors.accountNumber && touched.accountNumber
//                                 ? "is-invalid"
//                                 : ""
//                             }`}
//                             placeholder="Enter account number"
//                           />
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setShowAccountNumber(!showAccountNumber)
//                             }
//                             className="btn position-absolute end-0 top-50 translate-middle-y"
//                             style={{
//                               background: "none",
//                               border: "none",
//                               color: "#666",
//                             }}
//                           >
//                             {showAccountNumber ? (
//                               <EyeOff size={18} />
//                             ) : (
//                               <Eye size={18} />
//                             )}
//                           </button>
//                           <ErrorMessage
//                             name="accountNumber"
//                             component="div"
//                             className="invalid-feedback"
//                           />
//                         </div>
//                       </div>

//                       {/* IFSC Code Input */}
//                       <div className="mb-3">
//                         <label className="form-label">IFSC CODE*</label>
//                         <div className="position-relative">
//                           <Field
//                             type={showIFSC ? "text" : "password"}
//                             name="ifscCode"
//                             className={`form-control ${
//                               errors.ifscCode && touched.ifscCode
//                                 ? "is-invalid"
//                                 : ""
//                             }`}
//                             placeholder="Enter IFSC code (e.g., SBIN0123456)"
//                             style={{ textTransform: "uppercase" }}
//                             onChange={(e) =>
//                               setFieldValue(
//                                 "ifscCode",
//                                 e.target.value.toUpperCase()
//                               )
//                             }
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowIFSC(!showIFSC)}
//                             className="btn position-absolute end-0 top-50 translate-middle-y"
//                             style={{
//                               background: "none",
//                               border: "none",
//                               color: "#666",
//                             }}
//                           >
//                             {showIFSC ? (
//                               <EyeOff size={18} />
//                             ) : (
//                               <Eye size={18} />
//                             )}
//                           </button>
//                           <ErrorMessage
//                             name="ifscCode"
//                             component="div"
//                             className="invalid-feedback"
//                           />
//                         </div>
//                       </div>

//                       {/* UPI ID Input */}
//                       <div className="mb-3">
//                         <label className="form-label">UPI ID (Optional)</label>
//                         <Field
//                           type="text"
//                           name="upiId"
//                           className={`form-control ${
//                             errors.upiId && touched.upiId ? "is-invalid" : ""
//                           }`}
//                           placeholder="Enter UPI ID (e.g., example@paytm)"
//                         />
//                         <ErrorMessage
//                           name="upiId"
//                           component="div"
//                           className="invalid-feedback"
//                         />
//                       </div>
//                     </div>

//                     <div className="modal-footer border-0">
//                       <button
//                         type="submit"
//                         className="btn btn-success w-100 py-3 fw-bold"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <span
//                               className="spinner-border spinner-border-sm me-2"
//                               role="status"
//                               aria-hidden="true"
//                             ></span>
//                             {currentPaymentMethod ? "Updating..." : "Adding..."}
//                           </>
//                         ) : currentPaymentMethod ? (
//                           <>
//                             <Edit3 className="me-2" size={18} />
//                             Update Payment Method
//                           </>
//                         ) : (
//                           <>
//                             <Plus className="me-2" size={18} />
//                             Add Payment Method
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentMethod;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  fetchPaymentMethodsBySellerId,
  addPaymentMethodBySellerId,
  updatePaymentMethodBySellerId,
  deletePaymentMethodBySellerId,
} from "../../redux/slices/paymentSlice";
import { ChevronDown, Plus, Trash2, Edit3 } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { paymentMethods, loading, error } = useSelector((state) => ({
    paymentMethods: Array.isArray(state.payment.paymentMethods)
      ? state.payment.paymentMethods
      : [],
    loading: state.payment.loading?.getPaymentMethodsBySellerId || false,
    error: state.payment.error,
  }));
  const [showModal, setShowModal] = useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bankOptions = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "Bank of India",
  ];

  const initialValues = {
    bankName: "",
    accountName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
  };

  const validationSchema = Yup.object({
    bankName: Yup.string()
      .required("Bank name is required")
      .notOneOf(["Select Bank Name"], "Please select a valid bank"),
    accountName: Yup.string()
      .required("Account name is required")
      .min(2, "Account name must be at least 2 characters")
      .max(50, "Account name must not exceed 50 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Account name should contain only letters and spaces"
      ),
    accountNumber: Yup.string()
      .required("Account number is required")
      .matches(/^[0-9]+$/, "Account number should contain only numbers")
      .min(9, "Account number must be at least 9 digits")
      .max(18, "Account number must not exceed 18 digits"),
    ifscCode: Yup.string()
      .required("IFSC code is required")
      .matches(
        /^[A-Z]{4}0[A-Z0-9]{6}$/,
        "Invalid IFSC code format (e.g., SBIN0123456)"
      )
      .length(11, "IFSC code must be exactly 11 characters"),
    upiId: Yup.string()
      .optional()
      .matches(
        /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z0-9.\-_]{2,64}$/,
        "Invalid UPI ID format (e.g., example@upi)"
      ),
  });

  useEffect(() => {
    console.log("Payment methods from Redux:", paymentMethods);
  }, [paymentMethods]);

  const getSellerId = () => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    return userData.seller_id || 22;
  };

  useEffect(() => {
    const sellerId = getSellerId();
    console.log("Fetching payment methods for sellerId:", sellerId);
    dispatch(fetchPaymentMethodsBySellerId({ sellerId }));
  }, [dispatch]);

  const handleBankSelect = (bank, setFieldValue) => {
    setFieldValue("bankName", bank);
    setIsDropdownOpen(false);
  };

  const resetForm = () => {
    setCurrentPaymentMethod(null);
    setShowModal(false);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm: formikReset }
  ) => {
    try {
      const sellerId = getSellerId();
      if (currentPaymentMethod) {
        const params = {
          module_action: "updatePaymentMethodBySellerId",
          payment_method_id: currentPaymentMethod.payment_method_id,
          seller_id: sellerId,
          account_name: values.accountName,
          account_number: values.accountNumber,
          ifsc_code: values.ifscCode,
          bank_name: values.bankName,
          upi_id: values.upiId,
        };
        await dispatch(updatePaymentMethodBySellerId(params));
        await dispatch(fetchPaymentMethodsBySellerId({ sellerId }));
        toast.success("Payment method updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        const params = {
          module_action: "addPaymentMethodBySellerId",
          seller_id: sellerId,
          account_name: values.accountName,
          account_number: values.accountNumber,
          ifsc_code: values.ifscCode,
          bank_name: values.bankName,
          upi_id: values.upiId,
        };
        await dispatch(addPaymentMethodBySellerId(params));
        await dispatch(fetchPaymentMethodsBySellerId({ sellerId }));
        toast.success("Payment method added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      formikReset();
      resetForm();
    } catch (error) {
      toast.error("Operation failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Payment method operation failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePaymentMethod = async (paymentMethodId) => {
    if (
      window.confirm("Are you sure you want to delete this payment method?")
    ) {
      try {
        const sellerId = getSellerId();
        await dispatch(
          deletePaymentMethodBySellerId({
            module_action: "deletePaymentMethodBySellerId",
            payment_method_id: paymentMethodId,
            seller_id: sellerId,
          })
        );
        await dispatch(fetchPaymentMethodsBySellerId({ sellerId }));
        toast.success("Payment method deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Failed to delete payment method. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Delete operation failed:", error);
      }
    }
  };

  const handleEditClick = (paymentMethod) => {
    setCurrentPaymentMethod(paymentMethod);
    setShowModal(true);
  };

  const handleAddNewClick = () => {
    setCurrentPaymentMethod(null);
    setShowModal(true);
  };

  const validPaymentMethods = paymentMethods.filter(
    (method) =>
      method &&
      method.payment_method_id &&
      (method.account_name || method.upi_id)
  );

  const getInitialValues = () => {
    if (currentPaymentMethod) {
      return {
        bankName: currentPaymentMethod.bank_name || "",
        accountName: currentPaymentMethod.account_name || "",
        accountNumber: currentPaymentMethod.account_number || "",
        ifscCode: currentPaymentMethod.ifsc_code || "",
        upiId: currentPaymentMethod.upi_id || "",
      };
    }
    return initialValues;
  };

  return (
    <div className="container-fluid p-3">
      <div className="mb-4 row justify-content-center">
        <div className="col-12">
          <h5 className="mb-3 text-center">Payment Methods</h5>
          {loading ? (
            <div className="text-center">Loading payment methods...</div>
          ) : error ? (
            <div className="text-center text-danger">{error}</div>
          ) : validPaymentMethods.length > 0 ? (
            <div className="row">
              {validPaymentMethods.map((method) => (
                <div
                  key={method.payment_method_id}
                  className="col-lg-4 col-md-6 col-sm-12 mb-3"
                >
                  <div className="card h-100 shadow-sm">
                    <div className="card-body p-3 d-flex flex-column">
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="badge bg-primary me-2">
                            ID - #{method.payment_method_id}
                          </span>
                          <div>
                            <button
                              className="btn btn-sm btn-outline-danger me-2"
                              onClick={() =>
                                handleDeletePaymentMethod(
                                  method.payment_method_id
                                )
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEditClick(method)}
                            >
                              <Edit3 size={16} />
                            </button>
                          </div>
                        </div>
                        {method.bank_name &&
                          method.bank_name !== "Select Bank Name" && (
                            <div className="mb-2">
                              <strong className="text-success">
                                {method.bank_name}
                              </strong>
                            </div>
                          )}
                        {method.account_name && (
                          <>
                            <div className="mb-2">
                              <span className="text-muted small">
                                Account Name:{" "}
                              </span>
                              <strong>{method.account_name}</strong>
                            </div>
                            {method.account_number && (
                              <div className="mb-2">
                                <span className="text-muted small">
                                  Account Number:{" "}
                                </span>
                                <span>
                                  ****{method.account_number.slice(-4)}
                                </span>
                              </div>
                            )}
                            {method.ifsc_code && (
                              <div className="mb-2">
                                <span className="text-muted small">
                                  IFSC Code:{" "}
                                </span>
                                <span>{method.ifsc_code}</span>
                              </div>
                            )}
                          </>
                        )}
                        {method.upi_id && (
                          <div className="mb-2">
                            <span className="text-muted small">UPI ID: </span>
                            <span className="text-primary fw-bold">
                              {method.upi_id}
                            </span>
                          </div>
                        )}
                        <div className="mt-2">
                          {method.upi_id && method.account_name ? (
                            <span className="badge bg-info">Bank + UPI</span>
                          ) : method.upi_id ? (
                            <span className="badge bg-warning">UPI Only</span>
                          ) : (
                            <span className="badge bg-success">
                              Bank Account
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="alert alert-info">
                No payment methods found. Add your first payment method to get
                started.
              </div>
            </div>
          )}
          <div className="row mt-4">
            <div className="col-12 text-center">
              <button
                className="btn btn-success py-3 fw-bold px-5"
                onClick={handleAddNewClick}
              >
                <Plus className="me-2" size={18} />
                Add New Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  {currentPaymentMethod
                    ? "Edit Payment Method"
                    : "Add New Payment Method"}
                </h5>
                <button type="button" className="btn-close" onClick={resetForm}>
                  <RxCross2 />
                </button>
              </div>
              <Formik
                initialValues={getInitialValues()}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ values, setFieldValue, isSubmitting, errors, touched }) => (
                  <Form>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Select Bank*</label>
                        <div style={{ position: "relative" }}>
                          <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`form-control d-flex justify-content-between align-items-center ${
                              errors.bankName && touched.bankName
                                ? "is-invalid"
                                : ""
                            }`}
                            style={{
                              cursor: "pointer",
                              color: values.bankName ? "#333" : "#999",
                            }}
                          >
                            <span>{values.bankName || "Select Bank Name"}</span>
                            <ChevronDown
                              size={20}
                              style={{
                                color: "#666",
                                transform: isDropdownOpen
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.2s ease",
                              }}
                            />
                          </div>
                          {isDropdownOpen && (
                            <div
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                backgroundColor: "white",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                zIndex: 1000,
                                maxHeight: "200px",
                                overflowY: "auto",
                              }}
                            >
                              {bankOptions.map((bank, index) => (
                                <div
                                  key={index}
                                  onClick={() =>
                                    handleBankSelect(bank, setFieldValue)
                                  }
                                  className="p-3"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    borderBottom:
                                      index < bankOptions.length - 1
                                        ? "1px solid #f0f0f0"
                                        : "none",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.target.style.backgroundColor = "#f8f9fa")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.target.style.backgroundColor = "white")
                                  }
                                >
                                  {bank}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <ErrorMessage
                          name="bankName"
                          component="div"
                          className="invalid-feedback d-block"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Account Name*</label>
                        <Field
                          type="text"
                          name="accountName"
                          className={`form-control ${
                            errors.accountName && touched.accountName
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter account holder name"
                        />
                        <ErrorMessage
                          name="accountName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Account Number*</label>
                        <Field
                          type="text"
                          name="accountNumber"
                          className={`form-control ${
                            errors.accountNumber && touched.accountNumber
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter account number"
                        />
                        <ErrorMessage
                          name="accountNumber"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">IFSC CODE*</label>
                        <Field
                          type="text"
                          name="ifscCode"
                          className={`form-control ${
                            errors.ifscCode && touched.ifscCode
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter IFSC code (e.g., SBIN0123456)"
                          style={{ textTransform: "uppercase" }}
                          onChange={(e) =>
                            setFieldValue("ifscCode", e.target.value.toUpperCase())
                          }
                        />
                        <ErrorMessage
                          name="ifscCode"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">UPI ID (Optional)</label>
                        <Field
                          type="text"
                          name="upiId"
                          className={`form-control ${
                            errors.upiId && touched.upiId ? "is-invalid" : ""
                          }`}
                          placeholder="Enter UPI ID (e.g., example@paytm)"
                        />
                        <ErrorMessage
                          name="upiId"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="modal-footer border-0">
                      <button
                        type="submit"
                        className="btn btn-success w-100 py-3 fw-bold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            {currentPaymentMethod ? "Updating..." : "Adding..."}
                          </>
                        ) : currentPaymentMethod ? (
                          <>
                            <Edit3 className="me-2" size={18} />
                            Update Payment Method
                          </>
                        ) : (
                          <>
                            <Plus className="me-2" size={18} />
                            Add Payment Method
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
