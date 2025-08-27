import React, { useState, useEffect, useRef } from 'react';
import { IMAGES } from '../../../src/utils/imageUtils';
import './PromoThumbnail.css';

const PromoThumbnail: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const location = useLocation();
  
  // Only hide promo thumbnail on contact page where it would conflict with the form
  const shouldHidePromo = location.pathname === '/contact';

  const handleThumbnailClick = () => {
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
  };

  // Simple body scroll management when lightbox opens/closes
  useEffect(() => {
    if (isLightboxOpen) {
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when lightbox is closed
      document.body.style.overflow = '';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Don't render promo thumbnail on master pages
  if (shouldHidePromo) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleLightboxClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleLightboxClose();
    }
  };

  return (
    <>
      {/* Promotional Thumbnail */}
      <div 
        className="promo-thumbnail"
        onClick={handleThumbnailClick}
        role="button"
        tabIndex={0}
        aria-label="View promotional flyer"
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleThumbnailClick();
          }
        }}
      >
        <img
          src={IMAGES.DAVID_PROMO}
          alt="David Brown Health Insurance Promotion"
          className="promo-thumbnail-image"
        />
        <div className="promo-thumbnail-overlay">
          <i className="fas fa-expand-alt"></i>
        </div>
        <div className="promo-pulse"></div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="promo-lightbox-overlay"
          onClick={handleOverlayClick}
          onKeyDown={handleKeyPress}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-lightbox-title"
        >
          <div className="promo-lightbox-container">
            <button 
              className="promo-lightbox-close"
              onClick={handleLightboxClose}
              aria-label="Close promotional flyer"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="promo-lightbox-content">
         
              <img
                src={IMAGES.DAVID_PROMO}
                alt="David Brown Health Insurance Promotion - Full Size"
                className="promo-lightbox-image"
              />
              <p className="promo-lightbox-description">
                Contact David today for personalized health insurance solutions!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromoThumbnail;
