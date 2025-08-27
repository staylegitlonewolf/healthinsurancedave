import React from 'react';
import { Link } from 'react-router-dom';
import './terms.css';

export default function Terms() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <div className="terms-header">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
          <div className="terms-hero">
            <div className="terms-icon">
              <i className="fas fa-file-contract"></i>
            </div>
            <h1>Terms of Service</h1>
            <p>Please read these terms carefully before using our services</p>
          </div>
        </div>

        <div className="terms-content">
          <div className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the Health Insurance Dave website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </div>

          <div className="terms-section">
            <h2>2. Description of Service</h2>
            <p>Health Insurance Dave provides insurance brokerage services including:</p>
            <ul>
              <li>Health insurance quotes and enrollment</li>
              <li>Cannabis business insurance solutions</li>
              <li>Solar energy consultation and partnerships</li>
              <li>NIL (Name, Image, Likeness) partnership services</li>
              <li>Insurance consultation and advisory services</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>3. User Responsibilities</h2>
            <p>As a user of our services, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account information</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>4. Insurance Services</h2>
            <p>Our insurance services are subject to the following terms:</p>
            <ul>
              <li>Quotes provided are estimates and subject to change</li>
              <li>Final rates depend on underwriting approval</li>
              <li>Coverage is subject to policy terms and conditions</li>
              <li>We act as an independent insurance broker</li>
              <li>We do not guarantee coverage or rates</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>5. Privacy and Data Protection</h2>
            <p>Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.</p>
          </div>

          <div className="terms-section">
            <h2>6. Intellectual Property</h2>
            <p>The content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Health Insurance Dave and is protected by copyright and other intellectual property laws.</p>
          </div>

          <div className="terms-section">
            <h2>7. Limitation of Liability</h2>
            <p>Health Insurance Dave shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, incurred by you or any third party, whether in an action in contract or tort, even if we have been advised of the possibility of such damages.</p>
          </div>

          <div className="terms-section">
            <h2>8. Disclaimers</h2>
            <p>Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted or error-free.</p>
          </div>

          <div className="terms-section">
            <h2>9. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Health Insurance Dave, its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of our services.</p>
          </div>

          <div className="terms-section">
            <h2>10. Termination</h2>
            <p>We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms of Service.</p>
          </div>

          <div className="terms-section">
            <h2>11. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the state where Health Insurance Dave is registered, without regard to its conflict of law provisions.</p>
          </div>

          <div className="terms-section">
            <h2>12. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new terms on our website. Your continued use of our services after such changes constitutes acceptance of the new terms.</p>
          </div>

          <div className="terms-section">
            <h2>13. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> ElevatedHealthDavid@gmail.com</p>
              <p><strong>Phone:</strong> (813) 647-1118</p>
            </div>
          </div>

          <div className="terms-footer">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            <p>These Terms of Service are effective as of the date listed above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
