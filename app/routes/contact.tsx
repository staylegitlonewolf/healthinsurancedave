import React from 'react';
import { Link } from 'react-router-dom';
import './contact.css';

export default function Contact() {


  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-form-section">
            <div className="contact-form-container">
              <div className="form-iframe-container">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfyyonAGZRSOOeEMSZbZo5Bn7Z95KxZIORmAPggF6IZLnVO9A/viewform?embedded=true" 
                  width="100%" 
                  height={800} 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  title="Contact Form"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
          
          <div className="contact-info-section">
            <div className="contact-info-card">
              <div className="contact-hero">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
              </div>
              
              <h3>Get In Touch</h3>
              <p>Send us a message and we'll get back to you as soon as possible</p>
              <p>We're here to help you find the perfect health insurance solutions for your needs. Our team of experts is ready to assist you with individual plans, family coverage, Medicare, Medicaid, and group insurance.</p>
              
              <div className="contact-methods">
                <div className="method-item">
                  <i className="fas fa-phone"></i>
                  <span>Call us anytime</span>
                </div>
                <div className="method-item">
                  <i className="fas fa-envelope"></i>
                  <span>Email us directly</span>
                </div>
                <div className="method-item">
                  <i className="fas fa-clock"></i>
                  <span>Quick response time</span>
                </div>
              </div>
              
              <div className="contact-note">
                <h4>What to expect:</h4>
                <ul>
                  <li>Personalized consultation</li>
                  <li>Expert guidance</li>
                  <li>Competitive quotes</li>
                  <li>Ongoing support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
