import type { Route } from "./+types/about";
import { useState, useEffect } from 'react';
import "./about.css";

// Custom hook for counting animation
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return count;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Health Insurance Dave" },
    { name: "description", content: "Learn more about Health Insurance Dave" },
  ];
}

export default function About() {
  // Initialize counting animations
  const statesCovered = useCountUp(30);

  // Hide floating particles on About page
  useEffect(() => {
    const floatingParticles = document.querySelector('.floating-particles') as HTMLElement;
    if (floatingParticles) {
      floatingParticles.style.display = 'none';
    }

    // Cleanup function to show particles again when leaving the page
    return () => {
      if (floatingParticles) {
        floatingParticles.style.display = 'block';
      }
    };
  }, []);

  return (
    <div className="page-layout route-about">
      {/* Mission Section - Top */}
      <div className="mission-section">
    
        <div className="mission-container">
          <h2 className="mission-title">Our Mission</h2>
          <p className="mission-text">
            At Health Insurance Dave, we are committed to providing exceptional health insurance solutions and services to individuals and families across multiple states. Our mission is to ensure that everyone has access to quality healthcare coverage that fits their needs.
          </p>
        </div>
        <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">{statesCovered}</div>
                    <div className="stat-label">States Covered</div>
                  </div>
                </div>
      </div>

      {/* David Brown Profile and Statistics Section - Middle */}
      <div className="page-content">
        <div className="container-root">
          <div className="profile-stats-section">
            {/* Statistics Section */}
            <div className="stats-section">
              <div className="stats-content">
                <h2 className="stats-headline">
                   Let us guide you to affordable, reliable coverage that fits your lifestyle.
                </h2>
                
                <p className="stats-description">
                  Our founder, David Brown, is a licensed health coverage expert with access to all options, ensuring our clients receive the best possible solutions across all our services.
                </p>
                
               
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="mission-section">
        <div className="mission-container">
          <h2 className="mission-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3 className="value-title">Integrity</h3>
              <p className="value-text">
                We conduct business with the highest ethical standards and transparency.
              </p>
            </div>
            <div className="value-item">
              <h3 className="value-title">Excellence</h3>
              <p className="value-text">
                We strive for excellence in everything we do, from customer service to solutions.
              </p>
            </div>
            <div className="value-item">
              <h3 className="value-title">Innovation</h3>
              <p className="value-text">
                We continuously innovate to provide better healthcare solutions for our clients.
              </p>
            </div>
            <div className="value-item">
              <h3 className="value-title">Compassion</h3>
              <p className="value-text">
                We care deeply about the health and well-being of our clients and communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our Health Insurance Services Section - Bottom */}
      <div className="mission-section">
        <div className="mission-container">
          <h2 className="mission-title">Why Choose Our Health Insurance Services?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <i className="fas fa-certificate"></i>
              <h4>Same-Day Coverage</h4>
              <p>Get covered instantly! Most of our clients receive active coverage within hours, not weeks. No waiting periods for essential health services.</p>
            </div>
            <div className="benefit-item">
              <i className="fas fa-handshake"></i>
              <h4>Zero Consultation Fees</h4>
              <p>100% free consultations with no hidden costs or obligations. We're here to help you find the perfect plan, period.</p>
            </div>
            <div className="benefit-item">
              <i className="fas fa-shield-alt"></i>
              <h4>30+ States Covered</h4>
              <p>Licensed to serve residents across 30+ states with active certifications. Wherever you are, we can help protect your health.</p>
            </div>
            <div className="benefit-item">
              <i className="fas fa-dollar-sign"></i>
              <h4>Save Up to 40%</h4>
              <p>Our clients typically save 20-40% compared to direct insurance purchases. We negotiate better rates through our provider partnerships.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
