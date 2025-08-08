import React from "react";
import { BoxLogo, logo2 } from "../../assets";

const TermsAndConditions = () => {
  const buttonStyle = {
    position: "relative",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    paddingBlock: "0.75rem",
    paddingInline: "1.5rem",
    backgroundColor: "#00c853",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffff",
    gap: "10px",
    fontWeight: "bold",
    border: "3px solid #ffffff4d",
    outline: "none",
    overflow: "hidden",
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none",
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = "scale(1.05)";
    e.target.style.borderColor = "#fff9";
    const icon = e.target.querySelector(".custom-icon");
    if (icon) {
      icon.style.transform = "translateX(4px)";
    }
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.borderColor = "#ffffff4d";
    const icon = e.target.querySelector(".custom-icon");
    if (icon) {
      icon.style.transform = "translateX(0)";
    }
  };
  return (
    <>
      <style jsx>{`
        .custom-button::before {
          content: "";
          position: absolute;
          width: 100px;
          height: 100%;
          background-image: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 30%,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0) 70%
          );
          top: 0;
          left: -100px;
          opacity: 0.6;
        }

        .custom-button:hover::before {
          animation: shine 1.5s ease-out infinite;
        }

        @keyframes shine {
          0% {
            left: -100px;
          }
          60% {
            left: 100%;
          }
          to {
            left: 100%;
          }
        }
      `}</style>
      <div className="container-fluid bg-light min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-5">
                    <img src={BoxLogo} className="w-25 pb-3" alt="" />
                    <h1
                      className="display-5 fw-bold mb-3"
                      style={{ color: "#00c853" }}
                    >
                      Terms and Conditions
                    </h1>
                    <p className="lead text-muted">
                      Welcome to Flipzy! These Terms and Conditions outline the
                      rules and regulations for the use of our mobile app and
                      website.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h2
                      className="h4 fw-semibold mb-3"
                      style={{ color: "#00c853" }}
                    >
                      1. Acceptance of Terms
                    </h2>
                    <p className="text-muted lh-lg">
                      By accessing or using Flipzy, you agree to comply with and
                      be bound by these Terms. If you do not agree to these
                      Terms, please do not use our services.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h2
                      className="h4 fw-semibold mb-3"
                      style={{ color: "#00c853" }}
                    >
                      2. Eligibility
                    </h2>
                    <p className="text-muted lh-lg">
                      To use Flipzy, you must be at least 18 years old or the
                      age of majority in your jurisdiction.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h2
                      className="h4 fw-semibold mb-3"
                      style={{ color: "#00c853" }}
                    >
                      3. User Responsibilities
                    </h2>
                    <ul className="list-unstyled">
                      <li className="mb-2 text-muted lh-lg">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        You are responsible for the accuracy of the information
                        you provide.
                      </li>
                      <li className="mb-2 text-muted lh-lg">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Items posted for sale must be legally owned and
                        described accurately.
                      </li>
                      <li className="mb-2 text-muted lh-lg">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Fraudulent activity or scams will result in account
                        suspension and legal action.
                      </li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h2
                      className="h4 fw-semibold mb-3"
                      style={{ color: "#00c853" }}
                    >
                      4. Prohibited Items
                    </h2>
                    <p className="text-muted lh-lg mb-3">
                      You may not list or sell illegal, counterfeit, or
                      restricted items, including but not limited to:
                    </p>
                    <ul className="list-unstyled">
                      <li className="mb-2 text-muted lh-lg">
                        <i className="bi bi-x-circle-fill text-danger me-2"></i>
                        Stolen goods
                      </li>
                      <li className="mb-2 text-muted lh-lg">
                        <i className="bi bi-x-circle-fill text-danger me-2"></i>
                        Drugs or medication
                      </li>
                      <li className="mb-2 text-muted lh-lg">
                        <i className="bi bi-x-circle-fill text-danger me-2"></i>
                        Weapons or explosives
                      </li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h2
                      className="h4 fw-semibold mb-3"
                      style={{ color: "#00c853" }}
                    >
                      5. Flipzy Rights
                    </h2>
                    <ul className="list-unstyled">
                      <li className="mb-2 text-muted lh-lg">
                        <i className="bi bi-shield-fill-check text-warning me-2"></i>
                        We reserve the right to remove any listing without
                        notice.
                      </li>
                      <li className="mb-2 text-muted lh-lg">
                        <i className="bi bi-shield-fill-check text-warning me-2"></i>
                        We may suspend or terminate accounts that violate our
                        policies.
                      </li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h2
                      className="h4 fw-semibold mb-3"
                      style={{ color: "#00c853" }}
                    >
                      6. Limitation of Liability
                    </h2>
                    <div className="alert alert-warning border-0 shadow-sm">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      <strong>Important:</strong> Flipzy is a platform for
                      peer-to-peer selling. We are not responsible for any
                      direct or indirect damages resulting from user
                      transactions.
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2
                      className="h4 fw-semibold mb-3"
                      style={{ color: "#00c853" }}
                    >
                      7. Changes to Terms
                    </h2>
                    <p className="text-muted lh-lg">
                      We reserve the right to update these Terms at any time.
                      Changes will be communicated via the app or website.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h2
                      className="h4 fw-semibold mb-3"
                      style={{ color: "#00c853" }}
                    >
                      8. Contact Us
                    </h2>
                    <div className="card">
                      <div className="card-body text-center">
                        <i className="bi bi-envelope-fill text-primary fs-3 mb-3"></i>
                        <p className="text-muted mb-3">
                          If you have any questions about these Terms, please
                          contact us at:
                        </p>{" "}
                        <div className=" d-flex justify-content-center ">
                          <a
                            href="mailto:support@flipzy.app"
                            className="custom-button w-50"
                            style={buttonStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            support@flipzy.app
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-5 pt-4 border-top">
                    <p className="text-muted small">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default TermsAndConditions;
