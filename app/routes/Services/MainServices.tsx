import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IMAGES } from '../../../src/utils/imageUtils'
import './MainServices.css'

const MainServices: React.FC = () => {
  const navigate = useNavigate()


  const handleGetQuote = () => {
    navigate('/contact')
  }




  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-header">
         
          <h2>Our Services</h2>

          <p className="services-subtitle">
            Comprehensive Health and Life Insurance solutions tailored to your needs.             
          </p>
          <div className="blue-divider"></div>
        </div>

        <div className="services-grid">
          {/* Health Insurance */}
          <div className="service-card individual">
            <div className="service-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h3>Health Insurance</h3>
            <p>Comprehensive health coverage for individuals and families with access to quality healthcare providers.</p>
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

          {/* Medicare */}
          <div className="service-card family featured">
            <div className="service-badge">Most Popular</div>
            <div className="service-icon">
              <i className="fas fa-user-md"></i>
            </div>
            <h3>Medicare</h3>
            <p>Comprehensive Medicare plans including Parts A, B, C, and D with supplemental coverage options.</p>
            <ul className="service-features">
              <li>Medicare Part A & B</li>
              <li>Medicare Advantage Plans</li>
              <li>Medicare Supplement Plans</li>
              <li>Prescription Drug Coverage</li>
              <li>Vision & Dental Add-ons</li>
              <li>Wellness Programs</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">As low as $0/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Medicaid */}
          <div className="service-card business">
            <div className="service-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Medicaid</h3>
            <p>Low-cost or free health coverage for eligible individuals and families with limited income.</p>
            <ul className="service-features">
              <li>Free or Low-Cost Coverage</li>
              <li>Essential Health Benefits</li>
              <li>Preventive Care Services</li>
              <li>Emergency Services</li>
              <li>Prescription Coverage</li>
              <li>Mental Health Services</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Free to Low-Cost</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Group Life Insurance */}
          <div className="service-card individual">
            <div className="service-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Group Life Insurance</h3>
            <p>Affordable life insurance coverage for employees through employer-sponsored group plans.</p>
            <ul className="service-features">
              <li>Employer-Sponsored Plans</li>
              <li>Low Premium Rates</li>
              <li>No Medical Exam Required</li>
              <li>Guaranteed Coverage</li>
              <li>Portable Benefits</li>
              <li>Additional Coverage Options</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $5/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Term Life Insurance */}
          <div className="service-card family">
            <div className="service-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Term Life Insurance</h3>
            <p>Affordable temporary life insurance coverage for a specific period with guaranteed death benefits.</p>
            <ul className="service-features">
              <li>Fixed Premium Rates</li>
              <li>Guaranteed Death Benefit</li>
              <li>Flexible Term Lengths</li>
              <li>Convertible Options</li>
              <li>No Cash Value</li>
              <li>Affordable Premiums</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $15/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Whole Life Insurance */}
          <div className="service-card business">
            <div className="service-icon">
              <i className="fas fa-infinity"></i>
            </div>
            <h3>Whole Life Insurance</h3>
            <p>Permanent life insurance with guaranteed death benefits and cash value accumulation.</p>
            <ul className="service-features">
              <li>Lifetime Coverage</li>
              <li>Cash Value Growth</li>
              <li>Guaranteed Premiums</li>
              <li>Dividend Options</li>
              <li>Loan Provisions</li>
              <li>Estate Planning Benefits</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $50/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Universal Life (UL) */}
          <div className="service-card individual">
            <div className="service-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Universal Life (UL)</h3>
            <p>Flexible permanent life insurance with adjustable premiums and death benefits.</p>
            <ul className="service-features">
              <li>Flexible Premiums</li>
              <li>Adjustable Death Benefits</li>
              <li>Cash Value Growth</li>
              <li>Interest Rate Crediting</li>
              <li>Policy Loans Available</li>
              <li>Tax-Deferred Growth</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $40/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Indexed Universal Life (IUL) */}
          <div className="service-card family">
            <div className="service-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3>Indexed Universal Life (IUL)</h3>
            <p>Universal life insurance with cash value growth tied to market index performance.</p>
            <ul className="service-features">
              <li>Market Index Participation</li>
              <li>Downside Protection</li>
              <li>Flexible Premiums</li>
              <li>Cash Value Growth</li>
              <li>Tax Advantages</li>
              <li>Retirement Planning</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $60/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Variable Universal Life (VUL) */}
          <div className="service-card business">
            <div className="service-icon">
              <i className="fas fa-chart-pie"></i>
            </div>
            <h3>Variable Universal Life (VUL)</h3>
            <p>Universal life insurance with investment options for cash value growth potential.</p>
            <ul className="service-features">
              <li>Investment Options</li>
              <li>Market Growth Potential</li>
              <li>Flexible Premiums</li>
              <li>Adjustable Death Benefits</li>
              <li>Tax-Deferred Growth</li>
              <li>Professional Management</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $75/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Survivorship Second-to-Die Life */}
          <div className="service-card individual">
            <div className="service-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Survivorship Second-to-Die Life</h3>
            <p>Life insurance that pays benefits after the death of the second insured person, ideal for estate planning.</p>
            <ul className="service-features">
              <li>Estate Planning Focus</li>
              <li>Lower Premiums</li>
              <li>Tax Benefits</li>
              <li>Business Succession</li>
              <li>Charitable Giving</li>
              <li>Wealth Transfer</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $100/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Final Expense / Burial Insurance */}
          <div className="service-card family">
            <div className="service-icon">
              <i className="fas fa-cross"></i>
            </div>
            <h3>Final Expense / Burial Insurance</h3>
            <p>Small whole life insurance policies designed to cover funeral and burial expenses.</p>
            <ul className="service-features">
              <li>Small Face Amounts</li>
              <li>Simplified Underwriting</li>
              <li>Guaranteed Acceptance</li>
              <li>No Medical Exam</li>
              <li>Immediate Coverage</li>
              <li>Affordable Premiums</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $20/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Mortgage / Decreasing Term */}
          <div className="service-card business">
            <div className="service-icon">
              <i className="fas fa-home"></i>
            </div>
            <h3>Mortgage / Decreasing Term</h3>
            <p>Term life insurance with decreasing death benefits that match your mortgage balance.</p>
            <ul className="service-features">
              <li>Decreasing Coverage</li>
              <li>Mortgage Protection</li>
              <li>Lower Premiums</li>
              <li>Fixed Term Length</li>
              <li>Family Protection</li>
              <li>Convertible Options</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $25/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Juvenile Life Insurance */}
          <div className="service-card individual">
            <div className="service-icon">
              <i className="fas fa-child"></i>
            </div>
            <h3>Juvenile Life Insurance</h3>
            <p>Life insurance coverage for children with guaranteed insurability and cash value growth.</p>
            <ul className="service-features">
              <li>Child Protection</li>
              <li>Guaranteed Insurability</li>
              <li>Cash Value Growth</li>
              <li>Low Premiums</li>
              <li>Education Funding</li>
              <li>Future Coverage Options</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $10/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default MainServices
