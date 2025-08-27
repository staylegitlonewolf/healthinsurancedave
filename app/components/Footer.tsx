import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  const [isFooterCollapsed, setIsFooterCollapsed] = useState(false);

  // Auto-collapse footer on contact page
  useEffect(() => {
    if (pathname === '/contact') {
      setIsFooterCollapsed(true);
    } else {
      setIsFooterCollapsed(false);
    }
  }, [pathname]);

  return (
    <footer className={`global-footer ${isFooterCollapsed ? 'collapsed' : 'normal'}`}>
      {/* Top glow effect */}
      <div className="global-footer-glow"></div>
      
      <div className="global-footer-content">
        <div className={`global-footer-grid ${isFooterCollapsed ? 'collapsed' : 'expanded'}`}>
          {/* Company Info */}
          <div className="global-footer-company">
            <div className="global-footer-company-header">
              <div className="global-footer-company-logo">
                <img 
                  src="/mainPhoto3.jpg" 
                  alt="Health Insurance Dave" 
                  draggable={false}
                />
                <div className="global-footer-company-logo-glow"></div>
              </div>
              <div className="global-footer-company-info">
                <h3 className="global-footer-company-title">
                  Health Insurance Dave
                </h3>
                <p className="global-footer-company-subtitle">
                  Your #1 Trusted Insurance Partner
                </p>
              </div>
            </div>
            <p className="global-footer-company-description">
              Dedicated to providing comprehensive health insurance solutions, cannabis business insurance, 
              solar solutions, and NIL partnerships. We're committed to helping you live victorious always.
            </p>
            <div className="global-footer-contact-links">
              <a 
                href="tel:+18136471118" 
                className="global-footer-contact-link"
                aria-label="Call us"
              >
                <div className="global-footer-contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <span>(813) 647-1118</span>
              </a>
              <a 
                href="mailto:ElevatedHealthDavid@gmail.com" 
                className="global-footer-contact-link"
                aria-label="Email us"
              >
                <div className="global-footer-contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <span>ElevatedHealthDavid@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="global-footer-section-header">
              <span className="global-footer-section-accent"></span>
              Quick Links
            </h4>
            <ul className="global-footer-section-list">
              {[
                { to: "/services", label: "Services" },
                { to: "/about", label: "About Us" },
                { to: "/certifications", label: "Certifications" },
                { to: "/discover", label: "Our Team" },
                { to: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.to} className="global-footer-section-item">
                  <Link 
                    to={link.to} 
                    className="global-footer-section-link"
                  >
                    <span className="global-footer-section-bullet"></span>
                    <span>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="global-footer-section-header">
              <span className="global-footer-section-accent"></span>
              Our Services
            </h4>
            <ul className="global-footer-section-list">
              {[
                "Health Insurance",
                "Cannabis Business Insurance", 
                "Solar Solutions",
                "NIL Partnerships"
              ].map((service) => (
                <li key={service} className="global-footer-service-item">
                  <span className="global-footer-service-bullet"></span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`global-footer-bottom ${isFooterCollapsed ? 'collapsed' : 'expanded'}`}>
          <div className="global-footer-bottom-content">
            <div className="global-footer-copyright">
              <p className="global-footer-copyright-text">
                © {currentYear} <span className="global-footer-copyright-brand">Living Victorious Always™</span> All Rights Reserved.
              </p>
              <p className="global-footer-copyright-subtext">
                Health Insurance Dave is a registered service provider.
              </p>
            </div>
            <div className="global-footer-legal-links">
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
                { to: "/disclaimer", label: "Disclaimer" }
              ].map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="global-footer-legal-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
