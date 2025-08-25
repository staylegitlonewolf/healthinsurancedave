import React from 'react';
import { Link } from 'react-router';
import './privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <div className="privacy-header">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
          <div className="privacy-hero">
            <div className="privacy-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h1>Privacy Policy</h1>
            <p>How we collect, use, and protect your information</p>
          </div>
        </div>

        <div className="privacy-content">
          <div className="policy-section">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you:</p>
            <ul>
              <li>Fill out our contact forms</li>
              <li>Request insurance quotes</li>
              <li>Sign up for our services</li>
              <li>Contact us via phone or email</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Insurance-related information</li>
              <li>Business information (for cannabis business insurance)</li>
              <li>Communication preferences</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide insurance quotes and services</li>
              <li>Communicate with you about our services</li>
              <li>Process your requests and applications</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Send you relevant updates and information</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:</p>
            <ul>
              <li>To insurance carriers and partners to provide quotes and services</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and safety</li>
              <li>With your explicit permission</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information:</p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Secure servers and networks</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal information</li>
              <li>Employee training on data protection</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>5. Cookies and Tracking</h2>
            <p>Our website may use cookies and similar technologies to:</p>
            <ul>
              <li>Improve website functionality</li>
              <li>Analyze website traffic</li>
              <li>Remember your preferences</li>
              <li>Provide personalized content</li>
            </ul>
            <p>You can control cookie settings through your browser preferences.</p>
          </div>

          <div className="policy-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>File a complaint with relevant authorities</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>7. Children's Privacy</h2>
            <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
          </div>

          <div className="policy-section">
            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date.</p>
          </div>

          <div className="policy-section">
            <h2>9. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> ElevatedHealthDavid@gmail.com</p>
              <p><strong>Phone:</strong> (813) 647-1118</p>
            </div>
          </div>

          <div className="policy-footer">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            <p>This Privacy Policy is effective as of the date listed above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
