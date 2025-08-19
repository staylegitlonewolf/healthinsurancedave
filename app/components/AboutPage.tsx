import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  const statRefs = useRef<Array<HTMLDivElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetEl = entry.target as HTMLDivElement;
            const finalValueAttr = targetEl.getAttribute('data-target');
            if (!finalValueAttr) return;
            const finalValue = parseInt(finalValueAttr, 10);
            const duration = 2000;
            const increment = finalValue / (duration / 16);
            let currentValue = 0;

            const timer = setInterval(() => {
              currentValue += increment;
              if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
              }
              targetEl.textContent = String(Math.floor(currentValue));
            }, 16);
          }
        });
      },
      { threshold: 0.5 }
    );

    statRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <div className="about-content">
        <div className="container">
          <div className="about-section">
            <div className="about-text">
              <h1>LIVING VICTORIOUS ALWAYS™</h1>
              <p>
                LVA was founded with a vision to provide comprehensive solutions while ensuring our
                clients have access to the best health coverage options available. Our founder, David
                Brown, is a licensed health coverage expert with access to all options, ensuring our
                clients receive the best possible solutions across all our services.
              </p>

              <div className="blue-divider"></div>

              <h3>Our Mission</h3>
              <p>
                We are committed to delivering innovative digital solutions while providing expert
                guidance in health insurance coverage. Our team combines technical expertise with deep
                industry knowledge to create value for our clients.
              </p>

              <div className="impact-values-container">
                <div className="stats-section">
                  <h3>Our Impact</h3>
                  <div className="about-stats">
                    <div className="stat">
                      <div
                        className="stat-number"
                        data-target="500"
                        ref={(el) => {
                          statRefs.current[0] = el;
                        }}
                      >
                        0
                      </div>
                      <div className="stat-label">Happy Clients</div>
                    </div>
                    <div className="stat">
                      <div
                        className="stat-number"
                        data-target="50"
                        ref={(el) => {
                          statRefs.current[1] = el;
                        }}
                      >
                        0
                      </div>
                      <div className="stat-label">States Covered</div>
                    </div>
                    <div className="stat">
                      <div
                        className="stat-number"
                        data-target="1000"
                        ref={(el) => {
                          statRefs.current[2] = el;
                        }}
                      >
                        0
                      </div>
                      <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat">
                      <div
                        className="stat-number"
                        data-target="6"
                        ref={(el) => {
                          statRefs.current[3] = el;
                        }}
                      >
                        0
                      </div>
                      <div className="stat-label">States Licensed</div>
                    </div>
                  </div>
                </div>

                <div className="values-section">
                  <h3>Our Values</h3>
                  <div className="values-grid">
                    <div className="value-item">
                      <h4>Trust</h4>
                      <p>Building lasting relationships through transparency and reliability.</p>
                    </div>
                    <div className="value-item">
                      <h4>Innovation</h4>
                      <p>Staying ahead with cutting-edge solutions and technology.</p>
                    </div>
                    <div className="value-item">
                      <h4>Excellence</h4>
                      <p>Delivering the highest quality service in everything we do.</p>
                    </div>
                    <div className="value-item">
                      <h4>Care</h4>
                      <p>Putting our clients' needs first with personalized attention.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="blue-divider"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


