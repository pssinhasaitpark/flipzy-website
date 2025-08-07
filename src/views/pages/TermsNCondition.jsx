import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-5">
                  <h1 className="display-5 fw-bold mb-3" style={{color: '#00c853'}}>Terms and Conditions</h1>
                  <p className="lead text-muted">
                    Welcome to Flipzy! These Terms and Conditions outline the rules and regulations for the use of our mobile app and website.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-semibold mb-3" style={{color: '#00c853'}}>1. Acceptance of Terms</h2>
                  <p className="text-muted lh-lg">
                    By accessing or using Flipzy, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-semibold mb-3" style={{color: '#00c853'}}>2. Eligibility</h2>
                  <p className="text-muted lh-lg">
                    To use Flipzy, you must be at least 18 years old or the age of majority in your jurisdiction.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-semibold mb-3" style={{color: '#00c853'}}>3. User Responsibilities</h2>
                  <ul className="list-unstyled">
                    <li className="mb-2 text-muted lh-lg">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      You are responsible for the accuracy of the information you provide.
                    </li>
                    <li className="mb-2 text-muted lh-lg">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Items posted for sale must be legally owned and described accurately.
                    </li>
                    <li className="mb-2 text-muted lh-lg">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Fraudulent activity or scams will result in account suspension and legal action.
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-semibold mb-3" style={{color: '#00c853'}}>4. Prohibited Items</h2>
                  <p className="text-muted lh-lg mb-3">
                    You may not list or sell illegal, counterfeit, or restricted items, including but not limited to:
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
                  <h2 className="h4 fw-semibold mb-3" style={{color: '#00c853'}}>5. Flipzy Rights</h2>
                  <ul className="list-unstyled">
                    <li className="mb-2 text-muted lh-lg">
                      <i className="bi bi-shield-fill-check text-warning me-2"></i>
                      We reserve the right to remove any listing without notice.
                    </li>
                    <li className="mb-2 text-muted lh-lg">
                      <i className="bi bi-shield-fill-check text-warning me-2"></i>
                      We may suspend or terminate accounts that violate our policies.
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-semibold mb-3" style={{color: '#00c853'}}>6. Limitation of Liability</h2>
                  <div className="alert alert-warning border-0 shadow-sm">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>Important:</strong> Flipzy is a platform for peer-to-peer selling. We are not responsible for any direct or indirect damages resulting from user transactions.
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-semibold mb-3" style={{color: '#00c853'}}>7. Changes to Terms</h2>
                  <p className="text-muted lh-lg">
                    We reserve the right to update these Terms at any time. Changes will be communicated via the app or website.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-semibold mb-3" style={{color: '#00c853'}}>8. Contact Us</h2>
                  <div className="card bg-primary bg-opacity-10 border-primary border-opacity-25">
                    <div className="card-body text-center">
                      <i className="bi bi-envelope-fill text-primary fs-3 mb-3"></i>
                      <p className="text-muted mb-3">
                        If you have any questions about these Terms, please contact us at:
                      </p>
                      <a 
                        href="mailto:support@flipzy.app" 
                        className="btn btn-primary btn-lg rounded-pill px-4"
                      >
                        <i className="bi bi-envelope me-2"></i>
                        support@flipzy.app
                      </a>
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
    </div>
  );
};

export default TermsAndConditions;
