// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BoxLogo } from "../../assets/index";
// import { X } from "lucide-react";
// import { fetchModuleData } from "../../redux/slices/apiSlice"; // Update path as needed

// const OtpComponent = ({ mobileNumber, onClose, onResend, onVerify }) => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();
//   const { loading, error: apiError } = useSelector((state) => state.api);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (isNaN(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 3) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       document.getElementById(`otp-${index - 1}`).focus();
//     }
//   };

//   const handleContinue = async () => {
//     const otpValue = otp.join("");
//     const HARDCODED_OTP = "4545"; // Hardcoded OTP for verification

//     // Clear any previous errors
//     setError("");

//     // Check if OTP is complete
//     if (otpValue.length !== 4) {
//       setError("Please enter complete OTP");
//       return;
//     }

//     // Verify OTP matches hardcoded value
//     if (otpValue === HARDCODED_OTP) {
//       try {
//         // Fetch user profile data
//         const profileResponse = await dispatch(
//           fetchModuleData({
//             module_action: "user_profile",
//             params: { user_id: "22" },
//           })
//         ).unwrap();

//         console.log("User profile data:", profileResponse.data);

//         // Store device_token in localStorage
//         if (profileResponse.data?.result?.device_token) {
//           localStorage.setItem(
//             "device_token",
//             profileResponse.data.result.device_token
//           );
//           console.log(
//             "Device token stored in localStorage:",
//             profileResponse.data.result.device_token
//           );
//         }

//         // Call the onVerify callback with success
//         if (onVerify) {
//           onVerify(otpValue);
//         }

//         // Close the modal
//         if (onClose) {
//           onClose();
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         setError("Failed to fetch user data. Please try again.");
//       }
//     } else {
//       setError(`Invalid OTP. Please enter ${HARDCODED_OTP}`);
//     }
//   };

//   return (
//     <div
//       className="modal fade show d-block"
//       style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header border-0 pb-0">
//             <button type="button" className="btn-close" onClick={onClose}>
//               <X size={24} />
//             </button>
//           </div>

//           <div className="modal-body px-4 pb-4">
//             <div className="text-center mb-4">
//               <img
//                 src={BoxLogo}
//                 alt="Logo"
//                 className="mb-3"
//                 style={{ height: "60px" }}
//               />
//             </div>

//             <div className="text-center mb-4">
//               <h5 className="fw-bold mb-2">Enter the OTP sent to</h5>
//               <p className="text-muted mb-0">+91 {mobileNumber}</p>
//             </div>

//             <div className="d-flex justify-content-center mb-3">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   id={`otp-${index}`}
//                   type="text"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   maxLength={1}
//                   className="form-control text-center rounded-3 m-2"
//                   style={{ width: "50px", height: "50px" }}
//                 />
//               ))}
//             </div>

//             {error && (
//               <div className="alert alert-danger py-2 mb-3">{error}</div>
//             )}

//             {apiError?.user_profile && (
//               <div className="alert alert-danger py-2 mb-3">
//                 {apiError.user_profile}
//               </div>
//             )}

//             <div className="text-center mb-3">
//               <button
//                 type="button"
//                 className="btn btn-link text-decoration-none"
//                 onClick={onResend}
//               >
//                 Didn't receive OTP? Send again
//               </button>
//             </div>

//             <button
//               onClick={handleContinue}
//               disabled={loading?.user_profile}
//               className="btn btn-success w-100 fw-semibold py-3 border-0 shadow-sm"
//             >
//               {loading?.user_profile ? (
//                 <span>
//                   <span
//                     className="spinner-border spinner-border-sm me-2"
//                     role="status"
//                     aria-hidden="true"
//                   ></span>
//                   Verifying...
//                 </span>
//               ) : (
//                 "Continue"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpComponent;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BoxLogo } from "../../assets/index";
import { X } from "lucide-react";
import { fetchModuleData } from "../../redux/slices/apiSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpComponent = ({ mobileNumber, onClose, onResend, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { loading, error: apiError } = useSelector((state) => state.api);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleContinue = async () => {
    const otpValue = otp.join("");
    const HARDCODED_OTP = "4545";
    setError("");
    if (otpValue.length !== 4) {
      setError("Please enter complete OTP");
      return;
    }
    if (otpValue === HARDCODED_OTP) {
      try {
        const profileResponse = await dispatch(
          fetchModuleData({
            module_action: "user_profile",
            params: { user_id: "22" },
          })
        ).unwrap();
        console.log("User profile data:", profileResponse.data);
        if (profileResponse.data?.result?.device_token) {
          localStorage.setItem(
            "device_token",
            profileResponse.data.result.device_token
          );
          window.dispatchEvent(new Event("authChange"));
        }
        toast.success("OTP verified successfully!", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => {
            if (onVerify) onVerify(otpValue);
          }
        });
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user data. Please try again.");
      }
    } else {
      setError(`Invalid OTP. Please enter ${HARDCODED_OTP}`);
    }
  };

  return (
    <>
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <button type="button" className="btn-close" onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body px-4 pb-4">
              <div className="text-center mb-4">
                <img
                  src={BoxLogo}
                  alt="Logo"
                  className="mb-3"
                  style={{ height: "60px" }}
                />
              </div>
              <div className="text-center mb-4">
                <h5 className="fw-bold mb-2">Enter the OTP sent to</h5>
                <p className="text-muted mb-0">+91 {mobileNumber}</p>
              </div>
              <div className="d-flex justify-content-center mb-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    className="form-control text-center rounded-3 m-2"
                    style={{ width: "50px", height: "50px" }}
                  />
                ))}
              </div>
              {error && (
                <div className="alert alert-danger py-2 mb-3">{error}</div>
              )}
              {apiError?.user_profile && (
                <div className="alert alert-danger py-2 mb-3">
                  {apiError.user_profile}
                </div>
              )}
              <div className="text-center mb-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  onClick={onResend}
                >
                  Didn't receive OTP? Send again
                </button>
              </div>
              <button
                onClick={handleContinue}
                disabled={loading?.user_profile}
                className="btn btn-success w-100 fw-semibold py-3 border-0 shadow-sm"
              >
                {loading?.user_profile ? (
                  <span>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Verifying...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default OtpComponent;

