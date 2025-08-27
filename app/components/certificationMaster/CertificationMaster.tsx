import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// Simple mobile detection hook
const useIPhoneDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isIPhone = /iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);
      const isMobileDevice = isIPhone || isAndroid || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return { isMobile };
};
import './CertificationMaster.css'

const CertificationMaster = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isMobile } = useIPhoneDetection()
  
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Get certification data from location state
  const certData = location.state?.certData
  const returnPath = location.state?.returnPath
  const certId = location.state?.certId

  // State for hydration consistency
  const [isClient, setIsClient] = useState(false)

  // If no certData is provided, redirect back to certification page
  useEffect(() => {
    setIsClient(true)
    if (!certData) {
      // console.warn('CertificationMaster: No certData provided, redirecting to certification page')
      navigate('/certifications', { replace: true })
      return
    }
  }, [certData, navigate])

  const [imageZoom, setImageZoom] = useState({
    scale: 0.7,
    isZoomed: false,
    position: { x: 0, y: 0 }
  })
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  
  // Photo gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Memoized zoom state to prevent unnecessary re-renders
  const defaultZoomState = {
    scale: 0.7,
    isZoomed: false,
    position: { x: 0, y: 0 }
  }

  // Force scroll to top with multiple approaches
  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Use requestAnimationFrame to ensure scroll happens after layout
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      // Double requestAnimationFrame for extra safety
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
    })
    
    // Additional delayed scroll
    setTimeout(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 100)
  }, [])

  // Scroll to top when certData changes (when navigating to different certification)
  useEffect(() => {
    if (certData) {
      // Immediate scroll
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      // Reset image index when certData changes
      setCurrentImageIndex(0)
      setImageZoom(defaultZoomState)
      
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        
        // Double requestAnimationFrame for extra safety
        requestAnimationFrame(() => {
          window.scrollTo(0, 0)
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        })
      })
      
      // Delayed scroll to ensure it happens after content loads
      setTimeout(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 100)
    }
  }, [certData])

  // Additional scroll to top when component mounts on client
  useEffect(() => {
    if (isClient) {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      // Use requestAnimationFrame for client hydration
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
      
      // Additional delayed scroll for client hydration
      setTimeout(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 200)
    }
  }, [isClient])

  // Gallery images logic
  const galleryImages = certData?.galleryImages || [
    { src: certData?.image || '', caption: `${certData?.name || ''} License` }
  ]
  
  const currentImage = galleryImages[currentImageIndex]
  
  const handleGalleryImageClick = useCallback((index: number) => {
    setCurrentImageIndex(index)
    setImageZoom(defaultZoomState)
  }, [])



  // Apply zoom to image with useCallback for better performance
  useEffect(() => {
    if (imageRef.current) {
      const { scale, position } = imageZoom
      imageRef.current.style.transform = `scale(${scale}) translate(${position.x}px, ${position.y}px)`
    }
  }, [imageZoom])

  // Memoized handlers for better performance
  const handleImageClick = useCallback((e: React.MouseEvent) => {
    if (isDragging || hasDragged) return
    
    setImageZoom(prev => {
      if (prev.isZoomed) {
        return defaultZoomState
      } else {
        return {
          scale: 2,
          isZoomed: true,
          position: prev.position
        }
      }
    })
  }, [isDragging, hasDragged])

  const handleImageDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setImageZoom(defaultZoomState)
  }, [])

  const handleImageWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newScale = Math.max(0.5, Math.min(5, imageZoom.scale + delta))
    
    setImageZoom(prev => ({
      ...prev,
      scale: newScale,
      isZoomed: newScale > 1
    }))
  }, [imageZoom.scale])

  // Optimized wheel event listener
  useEffect(() => {
    const imageContainer = imageContainerRef.current
    if (imageContainer && !isMobile) {
      imageContainer.addEventListener('wheel', handleImageWheel, { passive: false })
      return () => imageContainer.removeEventListener('wheel', handleImageWheel)
    }
  }, [handleImageWheel, isMobile])

  const handleImageMouseDown = useCallback((e: React.MouseEvent) => {
    if (imageZoom.isZoomed) {
      e.preventDefault()
      setIsDragging(true)
      setHasDragged(false)
      
      const startX = e.clientX
      const startY = e.clientY
      const startPositionX = imageZoom.position.x
      const startPositionY = imageZoom.position.y
      
             const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        
        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY
        const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        
        if (moveDistance > 5) {
          setHasDragged(true)
        }
        
        setImageZoom(prev => ({
          ...prev,
          position: {
            x: startPositionX + deltaX,
            y: startPositionY + deltaY
          }
        }))
      }
      
      const handleMouseUp = () => {
        setTimeout(() => {
          setIsDragging(false)
          setHasDragged(false)
        }, 10)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }, [imageZoom.isZoomed, imageZoom.position])

    const handleImageTouchStart = useCallback((e: React.TouchEvent) => {
    if (imageZoom.isZoomed && e.touches.length === 1) {
      // Don't prevent default here to avoid the error
      setIsDragging(true)
      setHasDragged(false)
      
      const touch = e.touches[0]
      const startX = touch.clientX
      const startY = touch.clientY
      const startPositionX = imageZoom.position.x
      const startPositionY = imageZoom.position.y
      
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          e.preventDefault()
          const touch = e.touches[0]
          
          const deltaX = touch.clientX - startX
          const deltaY = touch.clientY - startY
          const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
          
          if (moveDistance > 5) {
            setHasDragged(true)
          }
          
          setImageZoom(prev => ({
            ...prev,
            position: {
              x: startPositionX + deltaX,
              y: startPositionY + deltaY
            }
          }))
        }
      }
      
      const handleTouchEnd = () => {
        setTimeout(() => {
          setIsDragging(false)
          setHasDragged(false)
        }, 10)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    } else if (e.touches.length === 2) {
      // Handle pinch zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const initialDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
      
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 2) {
          e.preventDefault()
          const touch1 = e.touches[0]
          const touch2 = e.touches[1]
          const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
          const scaleFactor = currentDistance / initialDistance
          const newScale = Math.max(0.5, Math.min(5, imageZoom.scale * scaleFactor))
          
          setImageZoom(prev => ({
            ...prev,
            scale: newScale,
            isZoomed: newScale > 1
          }))
        }
      }
      
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }
  }, [imageZoom.isZoomed, imageZoom.position, imageZoom.scale])

  // Use license data from certification object or fallback to default
  const licenseData = certData?.licenseData || {
    licenseNumber: '-',
    npn: '-',
    issueDate: '-',
    expirationDate: '-'
  }

  // Ensure we have valid license data
  const safeLicenseData = {
    licenseNumber: licenseData.licenseNumber || licenseData.LicenseNumber || '-',
    npn: licenseData.npn || '-',
    issueDate: licenseData.issueDate || '-',
    expirationDate: licenseData.expirationDate || '-'
  }

  // Debug logging for development
  useEffect(() => {
    if (certData && process.env.NODE_ENV === 'development') {
          // console.log('CertificationMaster - certData:', certData)
    // console.log('CertificationMaster - licenseData:', licenseData)
    // console.log('CertificationMaster - safeLicenseData:', safeLicenseData)
    }
  }, [certData, licenseData, safeLicenseData])

  const handleReturn = useCallback(() => {
    if (returnPath && certId) {
      navigate(returnPath, { 
        state: { 
          scrollToCert: certId,
          certData: certData 
        } 
      })
    } else {
      navigate(-1)
    }
  }, [returnPath, certId, certData, navigate])

  // Print functionality
  const handlePrint = useCallback(() => {
    // Reset zoom for printing
    const originalTransform = imageRef.current?.style.transform
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1) translate(0px, 0px)'
    }
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${certData?.name || 'License'} - Print</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              background: white;
            }
            .print-header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .print-header h1 {
              color: #333;
              margin: 0;
              font-size: 24px;
            }
            .print-header p {
              color: #666;
              margin: 5px 0;
            }
            .certification-image {
              max-width: 100%;
              height: auto;
              border: 1px solid #ddd;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .print-footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            @media print {
              body { margin: 0; }
              .print-header, .print-footer { display: block; }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>${certData?.name || 'License'} License</h1>
            <p>License Number: ${licenseData.licenseNumber}</p>
            <p>NPN: ${licenseData.npn}</p>
            <p>Issue Date: ${licenseData.issueDate}</p>
            <p>Expiration Date: ${licenseData.expirationDate}</p>
          </div>
          <img src="${certData?.image || ''}" alt="${certData?.name || 'License'} License" class="certification-image" />
          <div class="print-footer">
            <p>Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p>Living Victorious Always™</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    
    // Wait for image to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }
    
    // Restore original transform
    setTimeout(() => {
      if (imageRef.current) {
        if (imageRef.current && originalTransform) {
          imageRef.current.style.transform = originalTransform
        }
      }
    }, 1000)
  }, [certData, licenseData])

  // Download functionality
  const handleDownload = useCallback(async () => {
    try {
      // Create a canvas to capture the image
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const img = new Image()
      
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        // Set canvas size to match image
        canvas.width = img.width
        canvas.height = img.height
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0)
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (!blob) return
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `${certData?.name || 'License'}_License_${new Date().toISOString().split('T')[0]}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }, 'image/png')
      }
      
      img.onerror = () => {
        // Fallback: direct download if canvas method fails
        const a = document.createElement('a')
        a.href = certData?.image || ''
        a.download = `${certData?.name || 'License'}_License_${new Date().toISOString().split('T')[0]}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
      
      img.src = certData?.image || ''
    } catch (error) {
      // Download failed silently
      // Fallback: direct download
      const a = document.createElement('a')
      a.href = certData?.image || ''
      a.download = `${certData?.name || 'License'}_License_${new Date().toISOString().split('T')[0]}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }, [certData])

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="certification-master-container">
        <div className="certification-master-sidebar">
          <div className="sidebar-header">
            <h2>Loading...</h2>
            <div className="certification-status">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  // Early return for no data
  if (!certData) {
    return (
      <div className="certification-master-container">
        <div className="certification-master-error">
          <h2>No certification selected</h2>
          <button onClick={() => navigate(-1)} className="return-btn">
            Go Back
          </button>
        </div>
      </div>
    )
  }



  return (
    <div className="certification-master-container">
      {/* Sidebar with license information */}
      <div className="certification-master-sidebar">
        {/* Photo Gallery Section - Moved to top of sidebar */}
        {galleryImages.length > 1 && (
          <div className="certification-photo-gallery">
            <h3 className="gallery-title">Photo Gallery</h3>
            <div className="certification-gallery-thumbnails">
              <div className="certification-gallery-thumbnails-grid">
                {galleryImages.map((image: any, index: number) => (
                  <div 
                    key={index}
                    className={`certification-gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleGalleryImageClick(index)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.caption} 
                      className="certification-thumbnail-image"
                    />
                    <div className="certification-thumbnail-caption">{image.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* License Details Section */}
        <div className="license-details-section">
          <div className="license-details-container">
            <div className="license-header">
              <h3 className="license-details-title">{certData.name} License</h3>
              <div className="certification-status">{certData.status}</div>
            </div>
            <div className="license-details">
              <div className="license-info-row">
                <span className="license-label">License Type:</span>
                <span className="license-status">Health Insurance</span>
              </div>
              <div className="license-info-row">
                <span className="license-label">License Number:</span>
                <span className="license-value">{safeLicenseData.licenseNumber}</span>
              </div>
              <div className="license-info-row">
                <span className="license-label">NPN:</span>
                <span className="license-value">{safeLicenseData.npn}</span>
              </div>
              <div className="license-info-row">
                <span className="license-label">Issue Date:</span>
                <span className="license-value">{safeLicenseData.issueDate}</span>
              </div>
              <div className="license-info-row">
                <span className="license-label">Expiration Date:</span>
                <span className="license-value">{safeLicenseData.expirationDate}</span>
              </div>
              {(certData.flagIcon || certData.flagImage) && (
                <div className="license-info-row">
                  <span className="license-label">State:</span>
                  <span className="license-value">
                    <div className="state-flag-container">
                      {certData.flagImage && (
                        <img 
                          src={certData.flagImage} 
                          alt={`${certData.name} flag`}
                          className="state-flag-image"
                        />
                      )}
                      <span className="state-name">{certData.name}</span>
                    </div>
                  </span>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="certification-actions">
                <button onClick={handlePrint} className="action-btn print-btn" title="Print License">
                  <i className="fas fa-print"></i>
                  <span>Print</span>
                </button>
                {certData?.pdfUrl && (
                  <a 
                    href={certData.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="action-btn pdf-btn" 
                    title="View PDF"
                  >
                    <i className="fas fa-file-pdf"></i>
                    <span>PDF</span>
                  </a>
                )}
                               <button onClick={handleDownload} className="action-btn download-btn" title="Download License">
                 <i className="fas fa-download"></i>
                 <span>Download</span>
               </button>
               <button onClick={handleReturn} className="action-btn return-btn" title="Return to previous page">
                 <i className="fas fa-arrow-left"></i>
                 <span>Return</span>
               </button>
             </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main certification display */}
      <div className="certification-master-content">
        {certData && certData.image ? (
          <>
            <div 
              ref={imageContainerRef}
              className={`certification-master-image-container ${imageZoom.isZoomed ? 'zoomed' : ''}`}
              onClick={handleImageClick}
              onDoubleClick={handleImageDoubleClick}
              onMouseDown={handleImageMouseDown}
              onTouchStart={handleImageTouchStart}
            >
              <img 
                ref={imageRef}
                src={currentImage.src} 
                alt={`${certData.name} License`} 
                className="certification-master-image"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  maxWidth: '90%',
                  maxHeight: '90%',
                  cursor: imageZoom.isZoomed ? 'grab' : 'zoom-in'
                }}
              />
            
            {/* Zoom indicator */}
            <div className="certification-master-zoom-indicator">
              <span className="zoom-text">
                {imageZoom.isZoomed 
                  ? `Drag to pan • ${Math.round(imageZoom.scale * 100)}%`
                  : 'Click to zoom • Scroll to adjust'
                }
              </span>
            </div>
            
            {/* Tap to zoom message */}
            <div className="certification-master-tap-to-zoom-message">
              <span>tap to zoom</span>
            </div>
          </div>
          </>
        ) : (
          <div className="certification-master-image-container">
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
  )
}

export default CertificationMaster 