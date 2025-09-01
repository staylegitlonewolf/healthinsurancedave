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
                  height="100%" 
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
          

        </div>
      </div>
    </div>
  );
}
