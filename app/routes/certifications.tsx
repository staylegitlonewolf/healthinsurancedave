
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IMAGES } from '../../src/utils/imageUtils';
import "./certifications.css";

export function meta() {
  return [
    { title: "Certifications - Insurance Dave" },
    { name: "description", content: "View our licenses and certifications" },
  ];
}

export default function Certifications() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll to photo when returning from CertificationMaster
  useEffect(() => {
    if (location.state?.scrollToCert) {
      const certId = location.state.scrollToCert;
      const photoElement = document.getElementById(`cert-${certId}`);
      if (photoElement) {
        setTimeout(() => {
          photoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight the photo briefly
          photoElement.style.boxShadow = '0 0 20px var(--accent)';
          setTimeout(() => {
            photoElement.style.boxShadow = '';
          }, 2000);
        }, 500);
      }
    }
  }, [location.state]);

  // Memoize certifications data to prevent unnecessary re-renders
  // ✨ ORGANIZED IN ALPHABETICAL ORDER ✨
  const allCertifications = useMemo(() => [
    {
      id: 1,
      name: "Alabama",
      status: "Active",
      image: IMAGES.CERT_ALABAMA,
      flagIcon: "🏛️",
      flagImage: IMAGES.FLAG_ALABAMA,
      stateColor: "#B31B1B",
      pdfUrl: IMAGES.PDF_ALABAMA,
      licenseData: {
        licenseNumber: "TBD",
        npn: "21533411",
        issueDate: "TBD",
        expirationDate: "TBD"
      }
    },
    {
      id: 2,
      name: "Colorado",
      status: "Active",
      image: IMAGES.CERT_COLORADO,
      flagIcon: "🏔️",
      flagImage: IMAGES.FLAG_COLORADO,
      stateColor: "#002868",
      licenseData: {
        licenseNumber: "890294",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2027"
      }
    },
    {
      id: 3,
      name: "Florida",
      status: "Active",
      image: IMAGES.CERT_FLORIDA,
      flagIcon: "🌴",
      flagImage: IMAGES.FLAG_FLORIDA,
      stateColor: "#002868",
      pdfUrl: IMAGES.PDF_FLORIDA,
      licenseData: {
        licenseNumber: "G223402",
        npn: "21533411",
        issueDate: "03/25/2025",
        expirationDate: "-"
      },
      galleryImages: [
        { src: IMAGES.CERT_FLORIDA, caption: "Florida License" },
        { src: IMAGES.CERT_FLORIDA1, caption: "View " }
      ]
    },
    { 
      id: 4,
      name: "Georgia",
      status: "Active",
      image: IMAGES.CERT_GEORGIA,
      flagIcon: "🍑",
      flagImage: IMAGES.FLAG_GEORGIA,
      stateColor: "#B31B1B",
      pdfUrl: IMAGES.PDF_GEORGIA,
      licenseData: {
        licenseNumber: "3800610",
        npn: "21533411",
        issueDate: "04/28/2025",
        expirationDate: "01/31/2027"
      }
    },
    {
      id: 5,
      name: "Maryland",
      status: "Active",
      image: IMAGES.CERT_MARYLAND,
      flagIcon: "🦀",
      flagImage: IMAGES.FLAG_MARYLAND,
      stateColor: "#B31B1B",
      pdfUrl: IMAGES.PDF_MARYLAND,
      licenseData: {
        licenseNumber: "3003608516",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2028"
      }
    },
    {
      id: 6,
      name: "Nevada",
      status: "Active",
      image: IMAGES.CERT_NEVADA,
      flagIcon: "🎰",
      flagImage: IMAGES.FLAG_NEVADA,
      stateColor: "#002868",
      licenseData: {
        licenseNumber: "4104634",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "04/30/2028"
      }
    },
    {
      id: 7,
      name: "Ohio",
      status: "Active",
      image: IMAGES.CERT_OHIO,
      flagIcon: "🌰",
      flagImage: IMAGES.FLAG_OHIO,
      stateColor: "#B31B1B",
      pdfUrl: IMAGES.PDF_OHIO,
      licenseData: {
        licenseNumber: "1653852",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2027"
      }
    },
    {
      id: 8,
      name: "South Carolina",
      status: "Active",
      image: IMAGES.CERT_SOUTH_CAROLINA,
      flagIcon: "🌴",
      flagImage: IMAGES.FLAG_SOUTH_CAROLINA,
      stateColor: "#B31B1B",
      pdfUrl: IMAGES.PDF_SOUTH_CAROLINA,
      licenseData: {
        licenseNumber: "TBD",
        npn: "21533411",
        issueDate: "TBD",
        expirationDate: "TBD"
      }
    },
    {
      id: 9,
      name: "Tennessee",
      status: "Active",
      image: IMAGES.CERT_TENNESSEE,
      flagIcon: "🎸",
      flagImage: IMAGES.FLAG_TENNESSEE,
      stateColor: "#DC143C",
      pdfUrl: IMAGES.PDF_TENNESSEE,
      licenseData: {
        licenseNumber: "3003608514",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2028"
      }
    },
    {
      id: 10,
      name: "Texas",
      status: "Active",
      image: IMAGES.CERT_TEXAS,
      flagIcon: "🤠",
      flagImage: IMAGES.FLAG_TEXAS,
      stateColor: "#002868",
      licenseData: {
        licenseNumber: "3323905",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2027"
      }
    },
    {
      id: 11,
      name: "Utah",
      status: "Active",
      image: IMAGES.CERT_UTAH,
      flagIcon: "🏔️",
      flagImage: IMAGES.FLAG_UTAH,
      stateColor: "#002868",
      licenseData: {
        licenseNumber: "1070494",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2028"
      }
    },
    {
      id: 12,
      name: "Virginia",
      status: "Active",
      image: IMAGES.CERT_VIRGINIA,
      flagIcon: "🌊",
      flagImage: IMAGES.FLAG_VIRGINIA,
      stateColor: "#B31B1B",
      licenseData: {
        licenseNumber: "1505466",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2027"
      }
    }
  ], []);

  // Memoize the handler to prevent unnecessary re-renders
  const handleOpenMasterPhoto = useCallback((cert: any) => {
    navigate('/certification_master', {
      state: {
        certData: {
          image: cert.image,
          name: cert.name,
          status: cert.status,
          flagIcon: cert.flagIcon,
          flagImage: cert.flagImage,
          stateColor: cert.stateColor,
          licenseData: cert.licenseData,
          pdfUrl: cert.pdfUrl, // Pass PDF URL to master page
          galleryImages: cert.galleryImages // Pass gallery images for multi-image view
        },
        returnPath: '/certifications',
        certId: cert.id
      }
    });
  }, [navigate]);

  // Memoize the image error handler
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const fallback = target.nextSibling as HTMLElement;
    if (fallback) fallback.style.display = 'block';
  }, []);

  return (
    <div className="page-layout certification-page">
      <div className="certification-hero">
        <h1>Licensed to provide services</h1>
        <p>We maintain active licenses and certifications across multiple states to ensure we can serve our clients wherever they are located.</p>
        <div className="certification-instruction">
          <i className="fas fa-mouse-pointer"></i>
          <span>Click any state to view details</span>
        </div>
      </div>
      
      <div className="certifications-grid">
        {allCertifications.map(cert => (
          <div 
            key={cert.id} 
            id={`cert-${cert.id}`} 
            className="certification-card"
            onClick={() => handleOpenMasterPhoto(cert)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenMasterPhoto(cert);
              }
            }}
            aria-label={`View ${cert.name} certification details`}
          >
            <div className="certification-icon">
              <img 
                src={cert.flagImage} 
                alt={`${cert.name} flag`} 
                loading="lazy"
                onError={handleImageError}
              />
              <span style={{ display: 'none' }}>{cert.flagIcon}</span>
            </div>
            <h3 className="certification-title">{cert.name}</h3>
            <div className="certification-status active">
              {cert.status}
            </div>
          </div>
        ))}
      </div>
      

    </div>
  );
}
