import React, { useState } from 'react';
import { Link } from 'react-router';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    preferredContact: '',
    bestTime: '',
    referral: '',
    referralName: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare data for EmailJS
      const templateParams = {
        to_email: 'staylegitdev@gmail.com',
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject,
        preferredContact: formData.preferredContact || 'Not specified',
        bestTime: formData.bestTime || 'Not specified',
        referral: formData.referral || 'Not specified',
        referralName: formData.referralName || 'Not provided',
        message: formData.message,
        time: new Date().toLocaleString(),
        reply_to: formData.email
      };

      // Send email using EmailJS
      const response = await (window as any).emailjs.send(
        "service_nxmoxvo",  // Your EmailJS Service ID
        "template_hdu8n2e", // Your EmailJS Template ID
        templateParams
      );
      
              // Email sent successfully
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          preferredContact: '',
          bestTime: '',
          referral: '',
          referralName: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {submitStatus === 'success' ? (
          <div className="contact-success">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Message Sent Successfully!</h2>
            <p>Thank you for reaching out. We'll get back to you soon.</p>
            <Link to="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        ) : (
          <div className="contact-content">
            <div className="contact-form-section">
              <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="health-insurance">Health Insurance</option>
                  <option value="cannabis-business">Cannabis Business Insurance</option>
                  <option value="solar-solutions">Solar Solutions</option>
                  <option value="nil-partnerships">NIL Partnerships</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredContact">Preferred Contact Method</label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                >
                  <option value="">Select preferred method</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="text">Text Message</option>
                  <option value="any">Any Method</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bestTime">Best Time to Reach You</label>
                <select
                  id="bestTime"
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={handleInputChange}
                >
                  <option value="">Select best time</option>
                  <option value="morning">Morning (8 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="referral">How did you hear about us?(Optional)</label>
              <select
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleInputChange}
              >
                <option value="">Select referral source</option>
                <option value="search">Search Engine (Google, Bing, etc.)</option>
                <option value="social-media">Social Media</option>
                <option value="friend-family">Friend or Family</option>
                <option value="business-partner">Business Partner</option>
                <option value="advertisement">Advertisement</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Conditional referral name input */}
            {(formData.referral === 'friend-family' || formData.referral === 'business-partner') && (
              <div className="form-group">
                <label htmlFor="referralName">Referral Name</label>
                <input
                  type="text"
                  id="referralName"
                  name="referralName"
                  value={formData.referralName}
                  onChange={handleInputChange}
                  placeholder="Enter the name of who referred you"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Tell us how we can help you..."
              />
            </div>

            {submitStatus === 'error' && (
              <div className="form-error">
                <i className="fas fa-exclamation-circle"></i>
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <div className="form-actions">
              <Link to="/" className="btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>
                          </div>
            </form>
            </div>
            <div className="contact-info-section">
              <div className="contact-info-card">
                <div className="contact-hero">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                 
                </div>
               
                <h3>Get In Touch</h3>
                <p>Send us a message and we'll get back to you as soon as possible</p>
                <p>We're here to help you find the perfect solutions for your needs. Whether you're looking for health insurance, cannabis business insurance, solar solutions, or NIL partnerships, our team of experts is ready to assist you.</p>
                
                <div className="contact-methods">
                  <div className="method-item">
                    <i className="fas fa-phone"></i>
                    <span>Call us anytime</span>
                  </div>
                  <div className="method-item">
                    <i className="fas fa-envelope"></i>
                    <span>Email us directly</span>
                  </div>
                  <div className="method-item">
                    <i className="fas fa-clock"></i>
                    <span>Quick response time</span>
                  </div>
                </div>
                
                <div className="contact-note">
                  <h4>What to expect:</h4>
                  <ul>
                    <li>Personalized consultation</li>
                    <li>Expert guidance</li>
                    <li>Competitive quotes</li>
                    <li>Ongoing support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
