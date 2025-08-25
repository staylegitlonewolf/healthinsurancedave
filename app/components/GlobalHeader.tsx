import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';

export function GlobalHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIPhone, setIsIPhone] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [lastLogoClickMs, setLastLogoClickMs] = useState<number>(0);
  const [showDebugPopup, setShowDebugPopup] = useState(false);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [isLogoDisabled, setIsLogoDisabled] = useState(false);
  const [navigationMode, setNavigationMode] = useState<'global' | 'services' | 'discover'>('global');

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
      const isAndroid = /Android/.test(userAgent);
      const isMobileDevice = isIPhoneDevice || isAndroid || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
      setIsIPhone(isIPhoneDevice);
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
    if (pathname === '/services') {
      setNavigationMode('services');
    } else if (pathname === '/discover') {
      setNavigationMode('discover');
    } else {
      setNavigationMode('global');
    }
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

    // If we're in services or discover mode, return to global navigation
    if (navigationMode === 'services' || navigationMode === 'discover') {
      e.preventDefault();
      setNavigationMode('global');
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
    <header className={`fixed top-0 z-[100000] backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-500 ease-in-out w-full ${
      isHeaderCollapsed 
        ? 'h-[6vh] sm:h-[5vh] -translate-y-1/2 opacity-70 hover:opacity-100 hover:translate-y-0 hover:h-[12vh] hover:sm:h-[10vh]' 
        : 'h-[12vh] sm:h-[10vh]'
    } ${
      navigationMode === 'services' 
        ? 'bg-blue-50/95 dark:bg-blue-900/95' 
        : navigationMode === 'discover' 
        ? 'bg-purple-50/95 dark:bg-purple-900/95' 
        : 'bg-white/95 dark:bg-gray-900/95'
    }`} style={{ 
      top: isMobile ? 'env(safe-area-inset-top, 0px)' : '0px',
      paddingTop: isMobile ? 'env(safe-area-inset-top, 0px)' : '0px'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between flex-nowrap gap-x-2 sm:gap-x-3">
        {/* Enhanced Logo */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className={`flex items-center group transition-opacity duration-300 ${
              isLogoDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'opacity-100'
            }`}
            onClick={(e) => {
              handleLogoClick(e);
              handleNavigationClick();
            }} 
            title={
              isLogoDisabled 
                ? "Debug mode loading..." 
                : navigationMode !== 'global' 
                ? "Click to return to main navigation" 
                : "Health Insurance Dave"
            }
          >
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Health Insurance Dave" 
                className={`select-none transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                  isHeaderCollapsed ? 'h-[30px] w-[30px] sm:h-[25px] sm:w-[25px]' : 'h-[45px] w-[45px] sm:h-[40px] sm:w-[40px]'
                }`}
                draggable={false} 
              />
              <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                navigationMode !== 'global' 
                  ? 'bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-100' 
                  : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100'
              }`}></div>
            </div>
          </Link>
        </div>

        {/* Dynamic Navigation */}
        <nav className={`flex items-center gap-x-1 sm:gap-x-2 md:gap-x-4 lg:gap-x-6 flex-nowrap transition-all duration-500 ease-in-out relative z-10 ${
          isHeaderCollapsed ? 'opacity-0' : 'opacity-100'
        } ${navigationMode !== 'global' ? 'scale-105' : 'scale-100'}`}>
          {navigationMode === 'global' && (
            <>
              <Link 
                to="/services" 
                onClick={handleNavigationClick}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer ${
                  pathname === '/services' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                onClick={handleNavigationClick}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer ${
                  pathname === '/about' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                About
              </Link>
              <Link 
                to="/certifications" 
                onClick={handleNavigationClick}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer ${
                  pathname === '/certifications' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                Certifications
              </Link>
              <Link 
                to="/discover" 
                onClick={handleNavigationClick}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer ${
                  pathname.startsWith('/discover') ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                Discover
              </Link>
            </>
          )}

          {navigationMode === 'services' && (
            <>
              <button 
                onClick={() => {
                  const healthSection = document.getElementById('services');
                  if (healthSection) {
                    const headerHeight = 80; // Approximate header height
                    const elementTop = healthSection.offsetTop - headerHeight;
                    window.scrollTo({ 
                      top: elementTop, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer ${
                  pathname === '/services' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                Health
              </button>
              <button 
                onClick={() => {
                  const cannabisSection = document.getElementById('cannabis-section');
                  if (cannabisSection) {
                    const headerHeight = 80; // Approximate header height
                    const elementTop = cannabisSection.offsetTop - headerHeight;
                    window.scrollTo({ 
                      top: elementTop, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer`}
              >
                Cannabis
              </button>
              <button 
                onClick={() => {
                  const webDevSection = document.getElementById('web-development');
                  if (webDevSection) {
                    const headerHeight = 80; // Approximate header height
                    const elementTop = webDevSection.offsetTop - headerHeight;
                    window.scrollTo({ 
                      top: elementTop, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer`}
              >
                Additional
              </button>
            </>
          )}

          {navigationMode === 'discover' && (
            <>
              <button 
                onClick={() => {
                  // Reset to show all categories
                  window.location.href = '/discover';
                }}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer ${
                  pathname === '/discover' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                All
              </button>
              <button 
                onClick={() => {
                  // Filter to health category
                  window.location.href = '/discover?category=health';
                }}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer`}
              >
                Health
              </button>
              <button 
                onClick={() => {
                  // Filter to NIL category
                  window.location.href = '/discover?category=nil';
                }}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer`}
              >
                NIL
              </button>
              <button 
                onClick={() => {
                  // Filter to solar category
                  window.location.href = '/discover?category=solar';
                }}
                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer`}
              >
                Solar
              </button>
            </>
          )}
        </nav>

        {/* Side by Side Button Controls */}
        <div className="flex items-center gap-2">
          {/* Enhanced Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-md ${
              isHeaderCollapsed ? 'scale-75' : 'scale-100'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          {/* Enhanced Fullscreen Button - Hidden on iPhone */}
          {!isIPhone && (
            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800 dark:hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md ${
                isHeaderCollapsed ? 'scale-75' : 'scale-100'
              }`}
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 111.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
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
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg border border-blue-400">
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
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg border border-orange-400">
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
