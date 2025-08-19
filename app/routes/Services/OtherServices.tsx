import React, { useEffect } from 'react'
import './OtherServices.css'
import { initScrollAnimations, addStaggerAnimation } from '../../components/scrollAnimations'

const OtherServices: React.FC = () => {
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
          <h2 className="section-title text-4xl font-bold">Additional Services</h2>
          
              
          <p className="section-subtitle">We build websites, connect you with solar solutions and maximize NIL opportunities. Your success is our mission.</p>
               {/* Blue Divider */}
               <div className="blue-divider"></div>
        </div>
        
        
        <div className="other-services-grid">
          {/* Web Development */}
          <div className="other-service-card stagger-item">
            <div className="other-service-icon">
              <i className="fas fa-laptop-code"></i>
            </div>
            
            <p className="hero-title">
          <span className="gradient-text">Want a site like this?</span>              
        </p>
                   {/* Blue Divider */}
                   <div className="blue-divider"></div>
            <h3>Web Development</h3>
            <p>Professional website development services tailored to your business needs. From simple portfolios to complex e-commerce platforms.</p>
            <ul className="other-service-features">
              <li>Custom Website Design</li>
              <li>E-commerce Solutions</li>
              <li>Content Management Systems</li>
              <li>Website Maintenance</li>
              <li>SEO Optimization</li>
              <li>Mobile Responsive Design</li>
            </ul>
            <div className="other-service-pricing">
              <span className="other-service-price">Contact Us</span>
            </div>
          </div>

          {/* Solar Services */}
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

          {/* Sponsorship/NIL */}
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
    </section>
  )
}

export default OtherServices
