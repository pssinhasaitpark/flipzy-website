import React from 'react';


const PrivacyPolicy = () => {
  return (
    <div className="container my-4" style={{ maxWidth: '900px', backgroundColor: '#f9f9f9', padding: '20px' }}>
      <h1 className="text-center mb-4" style={{ color: '#00c853' }}>Privacy Policy</h1>
      <p>At Flipzy, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.</p>

      <h2 style={{ color: '#00c853' }}>1. Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> Name, email, phone number, address (for delivery or contact purposes).</li>
        <li><strong>Usage Data:</strong> App activity, IP address, device information, and browser type.</li>
        <li><strong>Uploaded Content:</strong> Product images, descriptions, and messages between users.</li>
      </ul>

      <h2 style={{ color: '#00c853' }}>2. How We Use Your Information</h2>
      <ul>
        <li>To create and manage user accounts</li>
        <li>To facilitate buying and selling between users</li>
        <li>To improve our services and provide personalized content</li>
        <li>To send notifications, updates, or promotional offers (opt-in only)</li>
      </ul>

      <h2 style={{ color: '#00c853' }}>3. Sharing of Information</h2>
      <p>We do <strong>not sell</strong> or rent your personal data to third parties. We may share limited data with:</p>
      <ul>
        <li>Service providers (e.g., payment gateways, hosting services)</li>
        <li>Law enforcement, if required by law</li>
        <li>Other users (e.g., buyers and sellers during transactions)</li>
      </ul>

      <h2 style={{ color: '#00c853' }}>4. Data Security</h2>
      <p>We implement appropriate security measures to protect your data against unauthorized access, alteration, or destruction. However, no system is 100% secure.</p>

      <h2 style={{ color: '#00c853' }}>5. Your Rights</h2>
      <ul>
        <li>You can access, update, or delete your information via your profile settings.</li>
        <li>You can opt out of promotional messages anytime.</li>
        <li>You may request deletion of your account at: <a href="mailto:support@flipzy.app">support@flipzy.app</a></li>
      </ul>

      <h2 style={{ color: '#00c853' }}>6. Children's Privacy</h2>
      <p>Flipzy is not intended for users under the age of 13. We do not knowingly collect data from children.</p>

      <h2 style={{ color: '#00c853' }}>7. Cookies and Tracking</h2>
      <p>We may use cookies or similar tracking technologies to enhance user experience and analyze traffic.</p>

      <h2 style={{ color: '#00c853' }}>8. Third-Party Links</h2>
      <p>Our app or website may contain links to external sites. We are not responsible for the privacy practices of those sites.</p>

      <h2 style={{ color: '#00c853' }}>9. Changes to This Policy</h2>
      <p>We may update this policy from time to time. Changes will be reflected here with an updated revision date.</p>

      <h2 style={{ color: '#00c853' }}>10. Contact Us</h2>
      <p>If you have any questions regarding this policy, please contact:</p>
      <p><strong>Email:</strong> <a href="mailto:support@flipzy.app">support@flipzy.app</a></p>
    </div>
  );
};

export default PrivacyPolicy;
