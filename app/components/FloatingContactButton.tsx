import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './FloatingContactButton.css';

export default function FloatingContactButton() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleButtonClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const buttonTitle = isOpen ? 'Go Back' : 'Contact Me';
  const buttonAriaLabel = isOpen ? 'Go Back' : 'Contact Me';

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="floating-contact-btn"
        title={buttonTitle}
        aria-label={buttonAriaLabel}
        style={{ zIndex: 2147483647 }}
      >
          {/* Animated ring effect */}
          <div className="floating-contact-ring"></div>
          
          {/* Glow effect */}
          <div className="floating-contact-glow"></div>
          
          {/* Main button content */}
          <div className="floating-contact-content">
            <i className="fas fa-envelope floating-contact-icon"></i>
            <span className="floating-contact-text">{isOpen ? 'Go Back' : 'Contact Me'}</span>
          </div>
          
          {/* Pulse animation */}
          <div className="floating-contact-pulse"></div>
      </button>

      {isOpen && (
        <div className="lightbox-overlay" style={{ zIndex: 2147483000 }} onClick={() => setIsOpen(false)}>
          <div className="lightbox-content" style={{ maxWidth: '100%', width: '100%', height: '100vh', borderRadius: 0, padding: 0, display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" aria-label="Close" onClick={() => setIsOpen(false)}>
              ×
            </button>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', flex: 1 }}>
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLScXz9RYMIQYnIHOBM7m33phIeR-z9FBiPBo8dM08KxIkZFcow/viewform?embedded=true"
                width="100%"
                height="90vh"
                frameBorder={0}
                title="Contact Form"
                style={{ background: 'white' }}
              >
              </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
