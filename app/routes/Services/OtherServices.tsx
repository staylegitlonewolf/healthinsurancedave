import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './OtherServices.css'
import { initScrollAnimations, addStaggerAnimation } from '../../components/scrollAnimations'

const OtherServices: React.FC = () => {
  const navigate = useNavigate()

  const handleGetCustomQuote = () => {
    navigate('/contact')
  }
  // Initialize animations for OtherServices component
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Re-initialize scroll animations for new elements
      initScrollAnimations()
      // Add stagger animation to other services grid
      addStaggerAnimation('.other-services-grid')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="other-services" className="other-services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Additional Services</h2>
          
              
          <p className="section-subtitle">We build websites, connect you with solar solutions and maximize NIL opportunities. Your success is our mission.</p>
               {/* Blue Divider */}
               <div className="blue-divider"></div>
        </div>
        
        {/* Solar & NIL Services - Side by Side Container */}
        <div className="solar-nil-container">
          {/* Solar Solutions - Standard Card */}
          <div className="solar-section" id="solar-solutions">
            <div className="other-service-card stagger-item">
              <div className="other-service-icon">
                <i className="fas fa-solar-panel"></i>
              </div>
              <h3>Solar Solutions</h3>
              <p>Connect with trusted solar providers to reduce energy costs and contribute to a sustainable future for your home or business.</p>
              <ul className="other-service-features">
                <li>Residential Solar Installation</li>
                <li>Commercial Solar Solutions</li>
                <li>Solar Panel Maintenance</li>
                <li>Energy Efficiency Consulting</li>
                <li>Financing & Tax Incentives</li>
                <li>Solar System Monitoring</li>
              </ul>
              <div className="other-service-pricing">
                <span className="other-service-price">Free Consultation</span>
              </div>
            </div>
          </div>

          {/* Sponsorship/NIL - Standard Card */}
          <div className="nil-section">
            <div className="other-service-card stagger-item">
              <div className="other-service-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Sponsorship & NIL</h3>
              <p>Maximize your Name, Image, and Likeness opportunities with strategic partnerships and professional brand development.</p>
              <ul className="other-service-features">
                <li>NIL Partnership Development</li>
                <li>Brand Sponsorship Deals</li>
                <li>Marketing Strategy</li>
                <li>Legal Guidance & Contracts</li>
                <li>Social Media Management</li>
                <li>Revenue Optimization</li>
              </ul>
              <div className="other-service-pricing">
                <span className="other-service-price">Commission Based</span>
              </div>
            </div>
          </div>
        </div>

        {/* Web Development - Prominent Section (Bottom) */}
        <div className="web-dev-section">
          <div className="web-dev-header">
            <h2>Web Development Solutions</h2>
            <p>Professional website development services tailored to your business needs</p>
          </div>
          
          <div className="web-dev-card">
            <div className="web-dev-badge">Modern Technology</div>
            <div className="web-dev-content">
              <div className="web-dev-icon-section">
                <div className="web-dev-icon">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h3>Web Development</h3>
                <p className="web-dev-description">
                  Professional website development services tailored to your business needs. From simple portfolios to complex e-commerce platforms.
                </p>
              </div>
              
              {/* Technology Stack Section */}
              <div className="tech-stack-section">
                <h4>Powered by Modern Technology</h4>
                <div className="tech-stack-grid">
                  <div className="tech-item">
                                    <img src="/react.webp" alt="React" className="tech-logo" />
                <span>React</span>
              </div>
              <div className="tech-item">
                <img src="/typescript.webp" alt="TypeScript" className="tech-logo" />
                <span>TypeScript</span>
              </div>
              <div className="tech-item">
                <img src="/vite.webp" alt="Vite" className="tech-logo" />
                <span>Vite</span>
              </div>
              <div className="tech-item">
                <img src="/tailwind.webp" alt="Tailwind CSS" className="tech-logo" />
                <span>Tailwind CSS</span>
              </div>
              <div className="tech-item">
                <img src="/react-router.webp" alt="React Router" className="tech-logo" />
                    <span>React Router</span>
                  </div>
                  <div className="tech-item">
                    <i className="fab fa-font-awesome"></i>
                    <span>Font Awesome</span>
                  </div>
                </div>
              </div>
              
              <div className="web-dev-features-section">
                <div className="web-dev-features-grid">
                  <div className="web-dev-feature">
                    <h4>Custom Design</h4>
                    <p>Tailored website designs that perfectly match your brand identity and business goals.</p>
                  </div>
                  <div className="web-dev-feature">
                    <h4>E-commerce Solutions</h4>
                    <p>Complete online store solutions with secure payment processing and inventory management.</p>
                  </div>
                  <div className="web-dev-feature">
                    <h4>Performance Optimized</h4>
                    <p>Lightning-fast websites built with modern tools for optimal user experience and SEO.</p>
                  </div>
                  <div className="web-dev-feature">
                    <h4>Mobile Responsive</h4>
                    <p>Websites that look and work perfectly on all devices, from phones to desktops.</p>
                  </div>
                </div>
                
                <div className="web-dev-results">
                  <h4>Your Results</h4>
                  <ul>
                    <li>Lightning-fast loading times with Vite-powered builds</li>
                    <li>Future-proof code with TypeScript reliability</li>
                    <li>Mobile-first responsive design</li>
                    <li>SEO-optimized for search engine success</li>
                  </ul>
                </div>
              </div>
              
              <div className="web-dev-cta">
                <p>Let's build a website that will help your business grow and succeed online.</p>
                <button className="btn-accent web-dev-btn" onClick={handleGetCustomQuote}>Get Custom Quote</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OtherServices
