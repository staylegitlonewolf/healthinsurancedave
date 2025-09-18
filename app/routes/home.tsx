
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../src/utils/imageUtils';
import "./home.css";

export function meta() {
  return [
    { title: "Health Insurance Dave - Health Plan Solutions" },
    { name: "description", content: "Find the right health plan with Health Insurance Dave" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const teamLayoutRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(0);

  
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




  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Use scrollTo instead of scrollIntoView to preserve fullscreen
      const elementPosition = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };



  return (
    <div className="hero-container">
      <section id="home" className="hero">
        <div className="hero-content">
          
         
          <h1 className="hero-title">
            Finding the right Insurance plans shouldn't be complicated..
          </h1>
      
          <div className="hero-buttons">
            <button 
              onClick={() => {
                navigate('/services');
                // Scroll to top after navigation
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }} 
              className="btn-outline-accent"
              aria-label="Explore our services"
            >
              Explore Services
            </button>
            
            <button 
              onClick={() => {
                navigate('/certifications');
                // Scroll to top after navigation
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }} 
              className="btn-outline-accent"
              aria-label="View our certifications"
            >
              View Certifications
            </button>
          </div>



        </div>
      </section>
      

    </div>
  );
}
