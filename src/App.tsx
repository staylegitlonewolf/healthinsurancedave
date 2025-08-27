import { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const teamLayoutRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLElement | null)[]>([]);
  const logosRef = useRef<HTMLDivElement>(null);
  const [isLogosVisible, setIsLogosVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [showCannabisLightbox, setShowCannabisLightbox] = useState(false);
  
  // Animate stats when component mounts
  useEffect(() => {
    const animateStats = () => {
      statRefs.current.forEach((ref, index) => {
        if (ref) {
          const targetAttr = ref.getAttribute('data-target');
          if (targetAttr) {
            const target = parseInt(targetAttr);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              ref.textContent = Math.floor(current).toString();
            }, 16);
          }
        }
      });
    };
    
    // Start animation after a short delay
    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for logos animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLogosVisible(true);
        } else {
          setIsLogosVisible(false);
          setActiveCard(0); // Reset when out of view
        }
      },
      {
        threshold: 0.3, // Trigger when 30% visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (logosRef.current) {
      observer.observe(logosRef.current);
    }

    return () => {
      if (logosRef.current) {
        observer.unobserve(logosRef.current);
      }
    };
  }, []);

  // Card rotation animation
  useEffect(() => {
    if (!isLogosVisible) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 1000); // 1 second per card

    return () => clearInterval(interval);
  }, [isLogosVisible]);

  const handleCannabisServiceClick = () => {
    setShowCannabisLightbox(false);
    // For now, just close the lightbox since we don't have routing
    // You can add routing later if needed
  };

  return (
    <div className="hero-container">
      <section id="home" className="hero">
        <div className="hero-content">
          {/* Top Logos Row */}
          <div ref={logosRef} className="team-top-logos">
            <div className={`logo-item ${activeCard === 0 ? 'active' : ''}`}>
              <i className="fas fa-users"></i>
              <span>EXPERT TEAM</span>
            </div>
            <div className={`logo-item ${activeCard === 1 ? 'active' : ''}`}>
              <i className="fas fa-certificate"></i>
              <span>LICENSED</span>
            </div>
            <div className={`logo-item ${activeCard === 2 ? 'active' : ''}`}>
              <i className="fas fa-handshake"></i>
              <span>PARTNERSHIP</span>
            </div>
            <div className={`logo-item ${activeCard === 3 ? 'active' : ''}`}>
              <i className="fas fa-shield-alt"></i>
              <span>VERIFIED</span>
            </div>
          </div>
          
          <h1 className="hero-title">
            Finding the right health plan shouldn't be complicated..
          </h1>
      
          <div className="hero-buttons">
            <button className="btn-outline-accent">
              Explore Services
            </button>
            
            <button className="btn-outline-accent">
              View Certifications
            </button>
          </div>

          {/* New Service Announcement */}
          <div className="new-service-announcement">
            <button 
              onClick={() => setShowCannabisLightbox(true)}
              className="new-service-btn"
            >
              <img src="/healthinsurancedave/cannabisLogo.png" alt="Cannabis" className="cannabis-icon-img" />
              <span>New: Cannabis Business Insurance</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          {/* Powered By Section */}
          <div className="powered-by" aria-label="Powered by technologies">
            <div className="powered-by-inner">
              <h2 className="powered-by-title">Powered by</h2>
              <div className="powered-by-logos">
                <div className="powered-by-item" title="React">
                  <img src="/healthinsurancedave/react.webp" alt="React" className="powered-by-logo" loading="lazy" decoding="async" width={28} height={28} />
                  <span>React</span>
                </div>
                <div className="powered-by-item" title="React Router">
                  <img src="/healthinsurancedave/react-router.webp" alt="React Router" className="powered-by-logo" loading="lazy" decoding="async" width={28} height={28} />
                  <span>React Router</span>
                </div>
                <div className="powered-by-item" title="Vite">
                  <img src="/healthinsurancedave/vite.webp" alt="Vite" className="powered-by-logo" loading="lazy" decoding="async" width={28} height={28} />
                  <span>Vite</span>
                </div>
                <div className="powered-by-item" title="TypeScript">
                  <img src="/healthinsurancedave/typescript.webp" alt="TypeScript" className="powered-by-logo" loading="lazy" decoding="async" width={28} height={28} />
                  <span>TypeScript</span>
                </div>
                <div className="powered-by-item" title="Tailwind CSS">
                  <img src="/healthinsurancedave/tailwind.webp" alt="Tailwind CSS" className="powered-by-logo" loading="lazy" decoding="async" width={28} height={28} />
                  <span>Tailwind CSS</span>
                </div>
                <div className="powered-by-item" title="Font Awesome">
                  <i className="fab fa-font-awesome"></i>
                  <span>Font Awesome</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cannabis Service Lightbox */}
      {showCannabisLightbox && (
        <div className="lightbox-overlay" onClick={() => setShowCannabisLightbox(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close"
              onClick={() => setShowCannabisLightbox(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="lightbox-header">
              <div className="lightbox-icon">
                <img src="/healthinsurancedave/cannabisLogo.png" alt="Cannabis" className="lightbox-cannabis-icon" />
              </div>
              <h2>A New Service is Available</h2>
              <p>Cannabis Business Insurance</p>
            </div>
            
            <div className="lightbox-body">
              <div className="service-highlights">
                <div className="highlight-item">
                  <i className="fas fa-shield-alt"></i>
                  <span>Comprehensive Protection</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Florida Focused</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-certificate"></i>
                  <span>Licensed & Compliant</span>
                </div>
              </div>
              
              <p className="lightbox-description">
                Navigate the complex insurance requirements for Florida's cannabis industry. 
                From medical marijuana treatment centers (MMTCs) to CBD businesses, we provide 
                specialized coverage including performance bonds, product liability, and comprehensive 
                business protection.
              </p>
            </div>
            
            <div className="lightbox-footer">
              <button 
                onClick={handleCannabisServiceClick}
                className="lightbox-cta-btn"
              >
                <i className="fas fa-arrow-right"></i>
                Learn More About Cannabis Insurance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
