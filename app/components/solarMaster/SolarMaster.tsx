import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SolarMaster.css';

// Define types for solar partner data
interface SolarPartner {
  id: string;
  name: string;
  title: string;
  category: string;
  image: string;
  phone: string;
  email: string;
  website?: string;
  description: string;
  services: string[];
  featured: boolean;
}

const useIPhoneDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isIPhone = /iPhone|iPod/.test(userAgent);
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isIPhone || isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return { isMobile };
};

const SolarMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useIPhoneDetection();
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const partnerData = location.state?.partnerData as SolarPartner;
  const returnPath = location.state?.returnPath;
  const partnerId = location.state?.partnerId;
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    if (!partnerData) {
      // console.warn('SolarMaster: No partnerData provided, redirecting to discover page');
      navigate('/discover', { replace: true });
      return;
    }
  }, [partnerData, navigate]);

  const [imageZoom, setImageZoom] = useState({
    scale: 0.7,
    isZoomed: false,
    position: { x: 0, y: 0 }
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  
  const defaultZoomState = {
    scale: 0.7,
    isZoomed: false,
    position: { x: 0, y: 0 }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to top when partnerData changes (when navigating to different partner)
  useEffect(() => {
    if (partnerData) {
      window.scrollTo(0, 0);
    }
  }, [partnerData]);

  useEffect(() => {
    if (imageRef.current) {
      const { scale, position } = imageZoom;
      imageRef.current.style.transform = `scale(${scale}) translate(${position.x}px, ${position.y}px)`;
    }
  }, [imageZoom]);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    if (isDragging || hasDragged) return;
    
    setImageZoom(prev => {
      if (prev.isZoomed) {
        return defaultZoomState;
      } else {
        return {
          scale: 2,
          isZoomed: true,
          position: prev.position
        };
      }
    });
  }, [isDragging, hasDragged]);

  const handleImageDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setImageZoom(defaultZoomState);
  }, []);

  const handleImageWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(5, imageZoom.scale + delta));
    
    setImageZoom(prev => ({
      ...prev,
      scale: newScale,
      isZoomed: newScale > 1
    }));
  }, [imageZoom.scale]);

  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    if (imageContainer && !isMobile) {
      imageContainer.addEventListener('wheel', handleImageWheel, { passive: false });
      return () => imageContainer.removeEventListener('wheel', handleImageWheel);
    }
  }, [handleImageWheel, isMobile]);

  const handleImageMouseDown = useCallback((e: React.MouseEvent) => {
    if (imageZoom.isZoomed) {
      e.preventDefault();
      setIsDragging(true);
      setHasDragged(false);
      
      const startX = e.clientX;
      const startY = e.clientY;
      const startPositionX = imageZoom.position.x;
      const startPositionY = imageZoom.position.y;
      
      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (moveDistance > 5) {
          setHasDragged(true);
        }
        
        setImageZoom(prev => ({
          ...prev,
          position: {
            x: startPositionX + deltaX,
            y: startPositionY + deltaY
          }
        }));
      };
      
      const handleMouseUp = () => {
        setTimeout(() => {
          setIsDragging(false);
          setHasDragged(false);
        }, 10);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }, [imageZoom.isZoomed, imageZoom.position]);

  const handleImageTouchStart = useCallback((e: React.TouchEvent) => {
    if (imageZoom.isZoomed && e.touches.length === 1) {
      // Don't prevent default here to avoid the error
      setIsDragging(true);
      setHasDragged(false);
      
      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      const startPositionX = imageZoom.position.x;
      const startPositionY = imageZoom.position.y;
      
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          e.preventDefault();
          const touch = e.touches[0];
          const deltaX = touch.clientX - startX;
          const deltaY = touch.clientY - startY;
          const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          
          if (moveDistance > 5) {
            setHasDragged(true);
          }
          
          setImageZoom(prev => ({
            ...prev,
            position: {
              x: startPositionX + deltaX,
              y: startPositionY + deltaY
            }
          }));
        }
      };
      
      const handleTouchEnd = () => {
        setTimeout(() => {
          setIsDragging(false);
          setHasDragged(false);
        }, 10);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    } else if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const initialDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 2) {
          e.preventDefault();
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const currentDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
          );
          
          const scaleFactor = currentDistance / initialDistance;
          const newScale = Math.max(0.5, Math.min(5, imageZoom.scale * scaleFactor));
          
          setImageZoom(prev => ({
            ...prev,
            scale: newScale,
            isZoomed: newScale > 1
          }));
        }
      };
      
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }
  }, [imageZoom.isZoomed, imageZoom.position, imageZoom.scale]);

  const handleReturn = useCallback(() => {
    if (returnPath && partnerId) {
      navigate(returnPath, {
        state: {
          scrollToPartner: partnerId,
          partnerData
        }
      });
    } else {
      navigate(-1);
    }
  }, [returnPath, partnerId, partnerData, navigate]);



  const handleWebsiteClick = useCallback(() => {
    if (partnerData?.website) {
      window.open(partnerData.website, '_blank', 'noopener,noreferrer');
    }
  }, [partnerData?.website]);

  if (!isClient) {
    return (
      <div className="solar-master-container">
        <div className="solar-master-header">
          <div className="solar-partner-info">
            <div className="solar-partner-info-columns">
              <div className="solar-partner-info-left">
                <h2>Loading...</h2>
                <div className="solar-partner-title">Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!partnerData) {
    return (
      <div className="solar-master-container">
        <div className="solar-master-error">
          <h2>No solar partner selected</h2>
          <button onClick={() => navigate(-1)} className="solar-return-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="solar-master-page-container">
      {/* Header spacing to prevent overlap with global header */}
      <div className="solar-master-header-spacing"></div>
      
      {/* Header with partner info */}
      <div className="solar-master-page-header">
        <div className="solar-master-partner-info">
          <div className="solar-master-partner-info-columns">
            <div className="solar-master-partner-info-left">
              <h2>{partnerData.name}</h2>
              <div className="solar-master-partner-title">{partnerData.title}</div>
            </div>
            <div className="solar-master-partner-info-right">
              <div className="solar-master-partner-status">
                <span className="solar-master-status-label">Status:</span>
                <span className="solar-master-status-value">Active Partner</span>
              </div>
              
              {partnerData.website && (
                <button className="solar-master-contact-btn website-btn" onClick={handleWebsiteClick}>
                  <i className="fas fa-globe"></i>
                  <span>Visit Website</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - Grid layout */}
      <div className="solar-master-content">
        <div className="solar-master-content-grid">
          {/* Details Section */}
          <div className="solar-master-details-section">
            {/* Services section */}
            {partnerData.services && partnerData.services.length > 0 && (
              <div className="solar-master-detail-card">
                <h3 className="solar-master-detail-title">Services & Solutions</h3>
                <div className="solar-master-detail-content">
                  <ul className="solar-master-detail-list">
                    {partnerData.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Description section */}
            {partnerData.description && (
              <div className="solar-master-detail-card">
                <h3 className="solar-master-detail-title">About {partnerData.name}</h3>
                <p className="solar-master-detail-content">{partnerData.description}</p>
              </div>
            )}
          </div>

          {/* Image Section */}
          <div className="solar-master-image-section">
            {partnerData && partnerData.image ? (
              <>
                <div
                  ref={imageContainerRef}
                  className={`solar-master-image-container ${imageZoom.isZoomed ? 'zoomed' : ''}`}
                  onClick={handleImageClick}
                  onDoubleClick={handleImageDoubleClick}
                  onMouseDown={handleImageMouseDown}
                  onTouchStart={handleImageTouchStart}
                >
                  <img
                    ref={imageRef}
                    src={partnerData.image}
                    alt={partnerData.name}
                    className="solar-master-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      maxWidth: '90%',
                      maxHeight: '90%',
                      cursor: imageZoom.isZoomed ? 'grab' : 'zoom-in'
                    }}
                  />
                </div>
                
                {/* Zoom Controls - Hidden for SolarMaster */}
                {/* <div className="solar-master-zoom-controls">
                  <div className="solar-master-zoom-indicator">
                    <span className="solar-master-zoom-text">
                      {imageZoom.isZoomed 
                        ? `Drag to pan • ${Math.round(imageZoom.scale * 100)}%`
                        : 'Click to zoom • Scroll to adjust'
                      }
                    </span>
                  </div>
                </div> */}
              </>
            ) : (
              <div className="solar-master-image-container">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--text-secondary)',
                  fontSize: '1.1rem'
                }}>
                  No image available
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Return button fixed at bottom */}
      <button onClick={handleReturn} className="solar-master-return-btn">
        <i className="fas fa-arrow-left"></i>
        Return
      </button>
    </div>
  );
};

export default SolarMaster;
