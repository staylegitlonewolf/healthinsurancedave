import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IMAGES } from '../../src/utils/imageUtils';
import './GlobalHeader.css';

export function GlobalHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIPhone, setIsIPhone] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [lastLogoClickMs, setLastLogoClickMs] = useState<number>(0);
  const [showDebugPopup, setShowDebugPopup] = useState(false);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [isLogoDisabled, setIsLogoDisabled] = useState(false);
  const [navigationMode, setNavigationMode] = useState<'global'>('global');

  const [isClient, setIsClient] = useState(false);

  // Helper function to scroll to top when navigating
  const handleNavigationClick = () => {
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Also ensure DOM elements are scrolled to top
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved theme or system preference
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    
      // Enhanced mobile detection
  const checkMobile = () => {
    const userAgent = navigator.userAgent;
    const isIPhoneDevice = /iPhone|iPod/.test(userAgent);
    const isAndroidDevice = /Android/.test(userAgent);
    const isMobileDevice = isIPhoneDevice || isAndroidDevice || window.innerWidth <= 768;
    setIsMobile(isMobileDevice);
    setIsIPhone(isIPhoneDevice);
    setIsAndroid(isAndroidDevice);
  };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-collapse header on contact page and set navigation mode
  useEffect(() => {
    if (pathname === '/contact') {
      setIsHeaderCollapsed(true);
    } else {
      setIsHeaderCollapsed(false);
    }

    // Set navigation mode based on current page
    setNavigationMode('global');
  }, [pathname]);

  // Check localStorage only after component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        navigate('/debug');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent clicks when logo is disabled
    if (isLogoDisabled) {
      e.preventDefault();
      return;
    }



    const now = Date.now();
    const withinWindow = now - lastLogoClickMs < 2000;
    const nextCount = withinWindow ? logoClickCount + 1 : 1;
    setLastLogoClickMs(now);
    
    if (nextCount >= 10) {
      e.preventDefault();
      setLogoClickCount(0);
      
      // Disable logo for 2 seconds before navigating to debug
      setIsLogoDisabled(true);
      
      // Navigate to debug after a brief delay
      setTimeout(() => {
        navigate('/debug');
        // Re-enable logo after navigation
        setTimeout(() => {
          setIsLogoDisabled(false);
        }, 500);
      }, 100);
      return;
    }
    
    setLogoClickCount(nextCount);
    
    // Show popup notifications
    if (nextCount >= 7) {
      setShowDebugPopup(true);
      setTimeout(() => setShowDebugPopup(false), 2000);
    }
  };



  return (
    <header className={`global-header ${isHeaderCollapsed ? 'collapsed' : 'normal'} ${navigationMode}-mode ${isMobile ? 'mobile' : ''}`}>
      <div className="global-header-content">
        {/* Enhanced Logo */}
        <div className="global-header-logo">
          <Link 
            to="/" 
            className={`global-header-logo-link ${isLogoDisabled ? 'disabled' : 'enabled'}`}
            onClick={(e) => {
              handleLogoClick(e);
              handleNavigationClick();
            }} 
            title={
              isLogoDisabled 
                ? "Debug mode loading..." 
                : navigationMode !== 'global' 
                ? "Click to return to main navigation" 
                : "Insurance Dave"
            }
          >
            <div className="global-header-logo-container">
              <img 
                src={IMAGES.LOGO} 
                alt="Insurance Dave" 
                className={`global-header-logo-image ${isHeaderCollapsed ? 'collapsed' : 'normal'}`}
                draggable={false} 
              />
              <div className={`global-header-logo-glow ${navigationMode !== 'global' ? 'active' : 'hover'}`}></div>
            </div>
          </Link>
        </div>

        {/* Dynamic Navigation */}
        <nav className={`global-header-nav ${isHeaderCollapsed ? 'collapsed' : 'expanded'} ${navigationMode}-mode`}>
          {navigationMode === 'global' && (
            <>
              <Link 
                to="/services" 
                onClick={handleNavigationClick}
                className={`global-header-nav-link ${pathname === '/services' ? 'active' : ''}`}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                onClick={handleNavigationClick}
                className={`global-header-nav-link ${pathname === '/about' ? 'active' : ''}`}
              >
                About
              </Link>
              <Link 
                to="/certifications" 
                onClick={handleNavigationClick}
                className={`global-header-nav-link ${pathname === '/certifications' ? 'active' : ''}`}
              >
                Certifications
              </Link>
              
            </>
          )}

          

          
        </nav>

        {/* Side by Side Button Controls */}
        <div className="global-header-controls">
          {/* Enhanced Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`global-header-control-btn global-header-theme-btn ${isHeaderCollapsed ? 'collapsed' : 'normal'}`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="global-header-control-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="global-header-control-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
                     {/* Enhanced Fullscreen Button - Hidden on iPhone, shown on Android and desktop */}
           {!isIPhone && (
            <button
              onClick={toggleFullscreen}
              className={`global-header-control-btn global-header-fullscreen-btn ${isHeaderCollapsed ? 'collapsed' : 'normal'}`}
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? (
                <svg className="global-header-control-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 111.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="global-header-control-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 111.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu removed to keep a single row nav */}
      
      {/* Debug Popup */}
      {showDebugPopup && (
        <div className="global-header-debug-popup">
          <div className="flex items-center gap-2">
            <i className="fas fa-info-circle"></i>
            <span className="text-sm font-medium">
              {10 - logoClickCount} taps away from debug mode
            </span>
          </div>
        </div>
      )}

      {/* Logo Disabled Popup */}
      {isLogoDisabled && (
        <div className="global-header-logo-disabled-popup">
          <div className="flex items-center gap-2">
            <i className="fas fa-hourglass-half animate-spin"></i>
            <span className="text-sm font-medium">
              Entering debug mode...
            </span>
          </div>
        </div>
      )}

    </header>
  );
}
