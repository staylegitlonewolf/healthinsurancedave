import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
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
      className="floating-contact-btn fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 ease-out hover:scale-125 hover:rotate-12 group"
      title={buttonTitle}
      aria-label={buttonAriaLabel}
      style={{ zIndex: 9999 }}
    >
        {/* Animated ring effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 animate-ping"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        
        {/* Main button content */}
        <div className="relative z-10 flex items-center justify-center">
          <i className="fas fa-envelope text-2xl group-hover:scale-110 transition-transform duration-300"></i>
        </div>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-0 group-hover:opacity-100 animate-pulse"></div>
      </button>
  );
}
