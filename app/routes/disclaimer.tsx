
import { Link } from 'react-router-dom';
import "./disclaimer.css";

export function meta() {
  return [
    { title: "Disclaimer - Health Insurance Dave" },
    { name: "description", content: "Legal disclaimers and terms for Health Insurance Dave services" },
  ];
}

export default function Disclaimer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="disclaimer-page">
      <div className="disclaimer-container">
        <header className="disclaimer-header">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
          <div className="disclaimer-hero">
            <div className="disclaimer-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h1>Disclaimer</h1>
            <p>Important legal information about our services and your rights</p>
          </div>
        </header>

        <div className="disclaimer-content">
          <div className="disclaimer-section">
            <h2>1. General Information</h2>
            <p>This disclaimer applies to all services provided by Health Insurance Dave ("we," "us," or "our") and our website. By using our services, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.</p>
          </div>

          <div className="disclaimer-section">
            <h2>2. Insurance Services Disclaimer</h2>
            <p>Health Insurance Dave is a licensed insurance broker and consultant. We provide information, guidance, and assistance in selecting health insurance plans, but we do not:</p>
            <ul>
              <li>Guarantee approval for any insurance policy</li>
              <li>Ensure specific coverage or benefits</li>
              <li>Promise specific premium rates or discounts</li>
              <li>Guarantee claims approval or processing</li>
            </ul>
            <p>All insurance decisions are subject to underwriting approval and policy terms.</p>
          </div>

          <div className="disclaimer-section">
            <h2>3. Information Accuracy</h2>
            <p>While we strive to provide accurate and up-to-date information, we cannot guarantee that all information on our website or provided through our services is:</p>
            <ul>
              <li>Completely accurate or current</li>
              <li>Comprehensive or complete</li>
              <li>Suitable for your specific situation</li>
              <li>Free from errors or omissions</li>
            </ul>
            <p>We recommend verifying all information with insurance carriers and consulting with qualified professionals for your specific needs.</p>
          </div>

          <div className="disclaimer-section">
            <h2>4. Professional Advice</h2>
            <p>The information provided through our services is for general informational purposes only and should not be considered as:</p>
            <ul>
              <li>Legal advice</li>
              <li>Medical advice</li>
              <li>Financial advice</li>
              <li>Tax advice</li>
            </ul>
            <p>For specific legal, medical, financial, or tax matters, please consult with qualified professionals in those fields.</p>
          </div>

          <div className="disclaimer-section">
            <h2>5. Third-Party Services</h2>
            <p>We may provide links to third-party websites, services, or resources. We do not:</p>
            <ul>
              <li>Endorse or guarantee third-party services</li>
              <li>Control third-party content or practices</li>
              <li>Accept responsibility for third-party actions</li>
              <li>Guarantee third-party website availability or accuracy</li>
            </ul>
            <p>Use of third-party services is at your own risk.</p>
          </div>

          <div className="disclaimer-section">

          </div>

          <div className="disclaimer-section">
            <h2>7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Health Insurance Dave shall not be liable for:</p>
            <ul>
              <li>Direct, indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages arising from use of our services</li>
              <li>Third-party actions or omissions</li>
            </ul>
            <p>Our total liability shall not exceed the amount paid for our services.</p>
          </div>

          <div className="disclaimer-section">
            <h2>8. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Health Insurance Dave from any claims, damages, or expenses arising from:</p>
            <ul>
              <li>Your use of our services</li>
              <li>Your violation of our terms</li>
              <li>Your provision of false information</li>
              <li>Your failure to comply with applicable laws</li>
            </ul>
          </div>

          <div className="disclaimer-section">
            <h2>9. Governing Law</h2>
            <p>This disclaimer is governed by the laws of the State of Florida. Any disputes shall be resolved in the courts of Florida, and you consent to personal jurisdiction in such courts.</p>
          </div>

          <div className="disclaimer-section">
            <h2>10. Changes to Disclaimer</h2>
            <p>We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of any changes.</p>
          </div>

          <div className="disclaimer-section">
            <h2>11. Contact Information</h2>
            <p>If you have questions about this disclaimer, please contact us:</p>
            <div className="contact-info">
              <p><strong>Health Insurance Dave</strong></p>
              <p>Email: ElevatedHealthDavid@gmail.com</p>
              <p>Phone: (813) 647-1118</p>
            </div>
          </div>

          <div className="disclaimer-footer">
            <p><strong>Last Updated:</strong> {currentYear}</p>
            <p>This disclaimer is effective as of the date listed above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
