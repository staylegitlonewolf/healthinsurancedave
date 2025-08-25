import type { Route } from "./+types/certifications";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import "./certifications.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Certifications - Health Insurance Dave" },
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
      name: "Colorado",
      status: "Active",
      image: "/media/Certification/Colorado.png",
      flagIcon: "🏔️",
      flagImage: "/Flags/Colorado.svg",
      stateColor: "#002868",
      licenseData: {
        licenseNumber: "890294",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2027"
      }
    },
    {
      id: 2,
      name: "Florida",
      status: "Active",
      image: "/media/Certification/Florida.png",
      flagIcon: "🌴",
      flagImage: "/Flags/Florida.svg",
      stateColor: "#002868",
      pdfUrl: "/media/Certification/Florida_pdf.pdf",
      licenseData: {
        licenseNumber: "G223402",
        npn: "21533411",
        issueDate: "03/25/2025",
        expirationDate: "-"
      },
      galleryImages: [
        { src: "/media/Certification/Florida.png", caption: "Florida License" },
        { src: "/media/Certification/Florida1.png", caption: "View " }
      ]
    },
    { 
      id: 3,
      name: "Georgia",
      status: "Active",
      image: "/media/Certification/Georgia.png",
      flagIcon: "🍑",
      flagImage: "/Flags/Georgia.svg",
      stateColor: "#B31B1B",
      pdfUrl: "/media/Certification/Georgia_pdf.pdf",
      licenseData: {
        licenseNumber: "3800610",
        npn: "21533411",
        issueDate: "04/28/2025",
        expirationDate: "01/31/2027"
      }
    },
    {
      id: 4,
      name: "Maryland",
      status: "Active",
      image: "/media/Certification/Maryland.png",
      flagIcon: "🦀",
      flagImage: "/Flags/Maryland.svg",
      stateColor: "#B31B1B",
      pdfUrl: "/media/Certification/Maryland_pdf.pdf",
      licenseData: {
        licenseNumber: "3003608516",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2028"
      }
    },
    {
      id: 5,
      name: "Nevada",
      status: "Active",
      image: "/media/Certification/Nevada.png",
      flagIcon: "🎰",
      flagImage: "/Flags/Nevada.svg",
      stateColor: "#002868",
      licenseData: {
        licenseNumber: "4104634",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "04/30/2028"
      }
    },
    {
      id: 6,
      name: "Ohio",
      status: "Active",
      image: "/media/Certification/Ohio.png",
      flagIcon: "🌰",
      flagImage: "/Flags/Ohio.svg",
      stateColor: "#B31B1B",
      pdfUrl: "/media/Certification/Ohio_pdf.pdf",
      licenseData: {
        licenseNumber: "1653852",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2027"
      }
    },
    {
      id: 7,
      name: "Tennessee",
      status: "Active",
      image: "/media/Certification/Tennessee.png",
      flagIcon: "🎸",
      flagImage: "/Flags/Tennessee.svg",
      stateColor: "#DC143C",
      pdfUrl: "/media/Certification/Tennessee_pdf.pdf",
      licenseData: {
        licenseNumber: "3003608514",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2028"
      }
    },
    {
      id: 8,
      name: "Texas",
      status: "Active",
      image: "/media/Certification/Texas.png",
      flagIcon: "🤠",
      flagImage: "/Flags/Texas.svg",
      stateColor: "#002868",
      licenseData: {
        licenseNumber: "3323905",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2027"
      }
    },
    {
      id: 9,
      name: "Utah",
      status: "Active",
      image: "/media/Certification/Utah.png",
      flagIcon: "🏔️",
      flagImage: "/Flags/Utah.svg",
      stateColor: "#002868",
      licenseData: {
        licenseNumber: "1070494",
        npn: "21533411",
        issueDate: "04/19/2025",
        expirationDate: "01/31/2028"
      }
    },
    {
      id: 10,
      name: "Virginia",
      status: "Active",
      image: "/media/Certification/Virginia.png",
      flagIcon: "🌊",
      flagImage: "/Flags/Virginia.svg",
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
      
      {/* Coming Soon Message */}
      <div className="coming-soon-section">
        <div className="coming-soon-card">
          <div className="coming-soon-icon">
            <i className="fas fa-rocket"></i>
          </div>
          <div className="coming-soon-content">
            <h3>More Certifications Coming Soon!</h3>
            <p>We're actively expanding our licensing portfolio to include additional states and specialized certifications, including cannabis business insurance licenses. Stay tuned for updates as we continue to grow our service reach.</p>
            <div className="coming-soon-badges">
              <span className="badge cannabis">
                <i className="fas fa-leaf"></i>
                Cannabis Licenses
              </span>
              <span className="badge expansion">
                <i className="fas fa-map-marked-alt"></i>
                More States
              </span>
              <span className="badge specialized">
                <i className="fas fa-certificate"></i>
                Specialized Coverage
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
