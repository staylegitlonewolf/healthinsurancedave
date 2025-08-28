import React, { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMAGES } from '../../../src/utils/imageUtils'
import './MainServices.css'

const MainServices: React.FC = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('health')

  const handleGetQuote = () => {
    navigate('/contact')
  }

  // Services sections configuration
  const serviceSections = useMemo(() => [
    { id: 'health', name: 'Health', icon: 'fas fa-clipboard-list', target: 'services' },
    { id: 'additional', name: 'Additional', icon: 'fas fa-plus-circle', target: 'solar-solutions' }
  ], [])

  // Handle section navigation with smart retry for dynamically loaded content
  const handleSectionSelect = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    
    const section = serviceSections.find(s => s.id === sectionId);
    if (section) {
      // console.log(`🎯 Scrolling to section: ${sectionId}, target: ${section.target}`);
      
      // Function to attempt scroll with retries for dynamically loaded content
      const attemptScroll = (attempt = 1, maxAttempts = 5) => {
        const targetElement = document.getElementById(section.target);
        
        if (targetElement) {
                  // console.log(`✅ Found target element on attempt ${attempt}:`, targetElement);
        // console.log(`📍 Element position: ${targetElement.offsetTop}px`);
          
          // Enhanced mobile scrolling with multiple fallback methods
          try {
            const isMobile = window.innerWidth <= 768;
            const isIPhone = /iPhone|iPad|iPod/.test(navigator.userAgent);
            const headerHeight = isMobile ? 140 : 100; 
            const elementTop = Math.max(0, targetElement.offsetTop - headerHeight);
            
            // console.log(`🚀 Scrolling to: ${elementTop}px (element: ${targetElement.offsetTop}px - header: ${headerHeight}px, mobile: ${isMobile}, iPhone: ${isIPhone})`);
            
            // Multiple scroll methods for better mobile compatibility
            if (isMobile || isIPhone) {
              // Method 1: Modern smooth scroll (primary)
              window.scrollTo({ 
                top: elementTop, 
                behavior: 'smooth' 
              });
              
              // Method 2: Fallback after short delay for mobile
              setTimeout(() => {
                if (Math.abs(window.scrollY - elementTop) > 50) {
                  // console.log('🔄 Mobile fallback scroll');
                  document.documentElement.scrollTop = elementTop;
                  document.body.scrollTop = elementTop;
                }
              }, 100);
              
              // Method 3: iPhone specific fallback
              if (isIPhone) {
                setTimeout(() => {
                  if (Math.abs(window.scrollY - elementTop) > 50) {
                    // console.log('📱 iPhone fallback scroll');
                    window.scroll(0, elementTop);
                  }
                }, 200);
              }
            } else {
              // Desktop smooth scroll
              window.scrollTo({ 
                top: elementTop, 
                behavior: 'smooth' 
              });
            }
            
          } catch (error) {
            // console.error('❌ Scroll error:', error);
            const elementTop = targetElement.offsetTop - (window.innerWidth <= 768 ? 140 : 100);
            // Emergency fallback
            window.scrollTo(0, Math.max(0, elementTop));
            document.documentElement.scrollTop = Math.max(0, elementTop);
            document.body.scrollTop = Math.max(0, elementTop);
          }
        } else {
          // console.warn(`⚠️ Target element not found on attempt ${attempt}: ${section.target}`);
          
          // Retry with longer delay for dynamically loaded content
          if (attempt < maxAttempts) {
            setTimeout(() => attemptScroll(attempt + 1, maxAttempts), 200 * attempt);
          } else {
            // console.error(`❌ Target element not found after ${maxAttempts} attempts: ${section.target}`);
            // Fallback: scroll to other-services section if solar-solutions fails
            if (section.target === 'solar-solutions') {
              const fallbackElement = document.getElementById('other-services');
              if (fallbackElement) {
                // console.log(`🔄 Fallback to other-services section`);
                const isMobile = window.innerWidth <= 768;
                const isIPhone = /iPhone|iPad|iPod/.test(navigator.userAgent);
                const headerHeight = isMobile ? 140 : 100;
                const elementTop = Math.max(0, fallbackElement.offsetTop - headerHeight);
                
                // Use same enhanced mobile scrolling for fallback
                if (isMobile || isIPhone) {
                  window.scrollTo({ 
                    top: elementTop, 
                    behavior: 'smooth' 
                  });
                  
                  setTimeout(() => {
                    if (Math.abs(window.scrollY - elementTop) > 50) {
                      // console.log('🔄 Mobile fallback scroll (other-services)');
                      document.documentElement.scrollTop = elementTop;
                      document.body.scrollTop = elementTop;
                    }
                  }, 100);
                  
                  if (isIPhone) {
                    setTimeout(() => {
                      if (Math.abs(window.scrollY - elementTop) > 50) {
                        // console.log('📱 iPhone fallback scroll (other-services)');
                        window.scroll(0, elementTop);
                      }
                    }, 200);
                  }
                } else {
                  window.scrollTo({ 
                    top: elementTop, 
                    behavior: 'smooth' 
                  });
                }
              }
            }
          }
        }
      };
      
      // Start the scroll attempt
      attemptScroll();
    } else {
      // console.error(`❌ Section not found: ${sectionId}`);
    }
  }, [serviceSections])
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-header">
         
          <h2>Plans & Pricing</h2>

          <p className="services-subtitle">
            Choose the perfect health insurance plan that fits your budget and coverage needs.             
          </p>
          <div className="blue-divider"></div>
        </div>

        <div className="services-grid">
          {/* Basic Coverage Plans */}
          <div className="service-card individual">
            <div className="service-icon">
              <i className="fas fa-user"></i>
            </div>
            <h3>Basic Coverage Plans</h3>
            <p>Ideal for individuals looking for essential health benefits on a budget with competitive pricing and excellent coverage.</p>
            <ul className="service-features">
              <li>Preventive Care Coverage</li>
              <li>Prescription Drug Coverage</li>
              <li>Emergency Services</li>
              <li>Mental Health Services</li>
              <li>Specialist Consultations</li>
              <li>24/7 Telehealth Access</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $120/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Family Health Plans */}
          <div className="service-card family featured">
            <div className="service-badge">Most Popular</div>
            <div className="service-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Family Health Plans</h3>
            <p>Affordable protection for your entire household, including pediatric care that grows with your family's changing needs.</p>
            <ul className="service-features">
              <li>Family Deductible Options</li>
              <li>Pediatric Care Coverage</li>
              <li>Maternity & Newborn Care</li>
              <li>Dental & Vision Add-ons</li>
              <li>Wellness Programs</li>
              <li>Multi-member Discounts</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">As low as $300/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Self-Employed Packages */}
          <div className="service-card business">
            <div className="service-icon">
              <i className="fas fa-building"></i>
            </div>
            <h3>Self-Employed Packages</h3>
            <p>Flexible, comprehensive options tailored to freelancers and small business owners with affordable coverage.</p>
            <ul className="service-features">
              <li>Individual & Family Options</li>
              <li>Health Savings Account (HSA)</li>
              <li>Flexible Plan Options</li>
              <li>Business Expense Deductions</li>
              <li>Telehealth Services</li>
              <li>Prescription Coverage</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">From only $225/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>
        </div>

        {/* Additional Services Target for Navigation */}
        <div id="web-development" style={{ paddingTop: '2rem' }}>
          {/* This serves as the scroll target for Additional Services navigation */}
          {/* The actual Additional Services content is in the Web Development section above */}
        </div>
      </div>
    </section>
  )
}

export default MainServices
