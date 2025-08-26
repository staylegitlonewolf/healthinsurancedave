import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import './NILMaster.css';

// Define types for NIL specialist data
interface NILSpecialist {
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

const NILMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useIPhoneDetection();
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const specialistData = location.state?.specialistData as NILSpecialist;
  const returnPath = location.state?.returnPath;
  const specialistId = location.state?.specialistId;
  
  // Add website property specifically for Victoria in NIL master
  const enhancedSpecialistData = useMemo(() => {
    if (specialistData?.name === 'Victoria Whitfield') {
      return {
        ...specialistData,
        website: 'https://www.maxpreps.com/fl/gibsonton/east-bay-indians/athletes/victoria-whitfield/?careerid=9tk4dsmo58bn7'
      };
    }
    return specialistData;
  }, [specialistData]);
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    if (!enhancedSpecialistData) {
      // console.warn('NILMaster: No specialistData provided, redirecting to discover page');
      navigate('/discover', { replace: true });
      return;
    }
  }, [enhancedSpecialistData, navigate]);

  const [imageZoom, setImageZoom] = useState({
    scale: 0.7,
    isZoomed: false,
    position: { x: 0, y: 0 }
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  
  // Photo gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Dynamic gallery images based on specialist
  const galleryImages = useMemo(() => {
    if (enhancedSpecialistData?.name === 'Victoria Whitfield') {
      return [
        { src: enhancedSpecialistData?.image || '/healthinsurancedave/NiL/Vicotoria.png', caption: 'Main Photo' },
                  { src: '/healthinsurancedave/NiL/Vicotoria1.png', caption: 'Game Action' },
          { src: '/healthinsurancedave/NiL/Vicotoria2.png', caption: 'Team Spirit' },
          { src: '/healthinsurancedave/NiL/victoriaAward.png', caption: 'Award Recognition' }
      ];
    } else {
      // Default gallery for other specialists
      return [
        { src: enhancedSpecialistData?.image || '/healthinsurancedave/NiL/comingsoon.png', caption: 'Main Photo' }
      ];
    }
  }, [enhancedSpecialistData]);
  
  const currentImage = galleryImages[currentImageIndex];
  
  const defaultZoomState = {
    scale: 0.7,
    isZoomed: false,
    position: { x: 0, y: 0 }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to top when specialistData changes (when navigating to different specialist)
  useEffect(() => {
    if (enhancedSpecialistData) {
      window.scrollTo(0, 0);
    }
  }, [enhancedSpecialistData]);

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

  const handleImageWheel = useCallback((e: React.WheelEvent) => {
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
      imageContainer.addEventListener('wheel', handleImageWheel as any, { passive: false });
      return () => imageContainer.removeEventListener('wheel', handleImageWheel as any);
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
    if (returnPath && specialistId) {
      navigate(returnPath, {
        state: {
          scrollToSpecialist: specialistId,
          specialistData
        }
      });
    } else {
      navigate(-1);
    }
  }, [returnPath, specialistId, specialistData, navigate]);



  const handleWebsiteClick = useCallback(() => {
    if (enhancedSpecialistData?.website) {
      window.open(enhancedSpecialistData.website, '_blank', 'noopener,noreferrer');
    }
  }, [enhancedSpecialistData?.website]);
  
  const handleGalleryImageClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
    // Reset zoom when switching images
    setImageZoom(defaultZoomState);
  }, []);

  if (!isClient) {
    return (
      <div className="nil-master-container">
        <div className="nil-master-header">
          <div className="nil-master-specialist-info">
            <div className="nil-master-specialist-info-columns">
              <div className="nil-master-specialist-info-left">
                <h2>Loading...</h2>
                <div className="nil-master-specialist-title">Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!specialistData) {
    return (
      <div className="nil-master-container">
        <div className="nil-master-error">
          <h2>No NIL specialist selected</h2>
          <button onClick={() => navigate(-1)} className="nil-return-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="nil-master-container">
      {/* Header spacing to prevent overlap with global header */}
      <div className="nil-master-header-spacing"></div>
      
      {/* Header with specialist info */}
      <div className="nil-master-header">
        <div className="nil-master-specialist-info">
          <div className="nil-master-specialist-info-columns">
            <div className="nil-master-specialist-info-left">
              <h2>{enhancedSpecialistData.name}</h2>
              <div className="nil-master-specialist-title">{enhancedSpecialistData.title}</div>
            </div>
            <div className="nil-master-specialist-info-right">
              <div className="nil-master-specialist-status">
                <span className="nil-master-status-label">Status:</span>
                <span className="nil-master-status-value">Active Specialist</span>
              </div>
              
              {enhancedSpecialistData.website && (
                <button className="nil-master-contact-btn website-btn" onClick={handleWebsiteClick}>
                  <i className="fas fa-globe"></i>
                  <span>Visit MaxPreps Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - Grid layout */}
      <div className="nil-master-content">
        <div className="nil-master-content-grid">
          {/* Details Section */}
          <div className="nil-master-details-section">
            {/* Mobile Header Info - Name and Title */}
            <div className="nil-master-mobile-header-info">
              <h2 className="nil-master-mobile-name">{enhancedSpecialistData.name}</h2>
              <div className="nil-master-mobile-title">{enhancedSpecialistData.title}</div>
              <div className="nil-master-mobile-status">
                <span className="nil-master-status-label">Status:</span>
                <span className="nil-master-status-value">Active Specialist</span>
              </div>
            </div>

            {/* Services section */}
            {enhancedSpecialistData.services && enhancedSpecialistData.services.length > 0 && (
              <div className="nil-master-detail-card">
                <h3 className="nil-master-detail-title">NIL Services & Expertise</h3>
                <div className="nil-master-detail-content">
                  <ul className="nil-master-detail-list">
                    {enhancedSpecialistData.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

                         {/* Description section */}
             {enhancedSpecialistData.description && (
               <div className="nil-master-detail-card">
                 <h3 className="nil-master-detail-title">About {enhancedSpecialistData.name}</h3>
                 <p className="nil-master-detail-content">{enhancedSpecialistData.description}</p>
               </div>
             )}

             {/* Current Endorsement Deal */}
             {enhancedSpecialistData.name === 'Victoria Whitfield' && (
               <div className="nil-master-detail-card">
                 <h3 className="nil-master-detail-title">Current LVA Endorsement Deal</h3>
                 <div className="nil-master-detail-content">
                   <div className="nil-endorsement-info">
                     <div className="nil-endorsement-item">
                       <strong>Company:</strong> LVA S&H LLC
                     </div>
                     <div className="nil-endorsement-item">
                       <strong>Agent:</strong> Al Whitfield
                     </div>
                     <div className="nil-endorsement-item">
                       <strong>Term:</strong> October 1st, 2024 - October 1st, 2025
                     </div>
                     <div className="nil-endorsement-item">
                       <strong>Compensation:</strong> $150 one-time payment + $300 athletic gear + performance bonuses
                     </div>
                     <div className="nil-endorsement-item">
                       <strong>Obligations:</strong> 12 social media posts/month + promotional appearances
                     </div>
                   </div>
                 </div>
               </div>
             )}

                         {/* Athletic Credentials & Logos */}
             <div className="nil-master-detail-card">
               <h3 className="nil-master-detail-title">Athletic Credentials</h3>
               <div className="nil-master-detail-content">
                 <div className="nil-credentials-grid">
                   <div className="nil-credential-item">
                     <img src="/healthinsurancedave/NiL/schoolLogo.png" alt="East Bay High School" className="nil-logo" />
                     <span>East Bay High School</span>
                   </div>
                   <div className="nil-credential-item">
                     <img src="/healthinsurancedave/NiL/maxprep.png" alt="MaxPreps" className="nil-logo" />
                     <span>MaxPreps Profile</span>
                   </div>
                   <div className="nil-credential-item">
                     <img src="/healthinsurancedave/NiL/FHSAA_logo.png" alt="FHSAA" className="nil-logo" />
                     <span>FHSAA Certified</span>
                   </div>
                   <div className="nil-credential-item">
                     <img src="/healthinsurancedave/NiL/NCAA LOGO.png" alt="NCAA" className="nil-logo" />
                     <span>NCAA Compliant</span>
                   </div>
                 </div>
               </div>
             </div>

             
          </div>

                     {/* Image Section */}
           <div className="nil-master-image-section">
             {currentImage ? (
               <>
                 <div
                   ref={imageContainerRef}
                   className={`nil-master-image-container ${imageZoom.isZoomed ? 'zoomed' : ''}`}
                   onClick={handleImageClick}
                   onDoubleClick={handleImageDoubleClick}
                   onMouseDown={handleImageMouseDown}
                   onTouchStart={handleImageTouchStart}
                 >
                   <img
                     ref={imageRef}
                     src={currentImage.src}
                     alt={`${enhancedSpecialistData.name} - ${currentImage.caption}`}
                     className="nil-master-image"
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
                 

                 
                 {/* Photo Gallery Thumbnails */}
                 <div className="nil-master-gallery-thumbnails">
                   <div className="nil-gallery-thumbnails-grid">
                     {galleryImages.map((image, index) => (
                       <div
                         key={index}
                         className={`nil-gallery-thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                         onClick={() => handleGalleryImageClick(index)}
                       >
                         <img
                           src={image.src}
                           alt={`${enhancedSpecialistData.name} - ${image.caption}`}
                           className="nil-thumbnail-image"
                         />
                         <span className="nil-thumbnail-caption">{image.caption}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </>
             ) : (
               <div className="nil-master-image-container">
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
      <button onClick={handleReturn} className="nil-master-return-btn">
        <i className="fas fa-arrow-left"></i>
        Return
      </button>
    </div>
  );
};

export default NILMaster;
