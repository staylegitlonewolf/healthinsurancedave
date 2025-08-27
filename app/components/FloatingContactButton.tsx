import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FloatingContactButton.css';

export default function FloatingContactButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPage, setPreviousPage] = useState<string>('/');

  // Track the previous page when not on contact page
  useEffect(() => {
    if (location.pathname !== '/contact') {
      setPreviousPage(location.pathname);
    }
  }, [location.pathname]);

  const handleButtonClick = () => {
    // Floating contact button clicked
    
    if (location.pathname === '/contact') {
      // If we're on contact page, go back to previous page
      navigate(previousPage);
    } else {
      // If we're on any other page, go to contact page
      navigate('/contact');
    }
  };

  const isOnContactPage = location.pathname === '/contact';
  const buttonTitle = isOnContactPage ? 'Go Back' : 'Contact Us';
  const buttonAriaLabel = isOnContactPage ? 'Go back to previous page' : 'Contact Us';

  return (
    <button
      onClick={handleButtonClick}
      className="floating-contact-btn"
      title={buttonTitle}
      aria-label={buttonAriaLabel}
      style={{ zIndex: 9999 }}
    >
        {/* Animated ring effect */}
        <div className="floating-contact-ring"></div>
        
        {/* Glow effect */}
        <div className="floating-contact-glow"></div>
        
        {/* Main button content */}
        <div className="floating-contact-content">
          <i className="fas fa-envelope floating-contact-icon"></i>
        </div>
        
        {/* Pulse animation */}
        <div className="floating-contact-pulse"></div>
      </button>
  );
}
