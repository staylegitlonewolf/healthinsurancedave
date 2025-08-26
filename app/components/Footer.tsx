import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  const [isFooterCollapsed, setIsFooterCollapsed] = useState(false);

  // Auto-collapse footer on contact page
  useEffect(() => {
    if (pathname === '/contact') {
      setIsFooterCollapsed(true);
    } else {
      setIsFooterCollapsed(false);
    }
  }, [pathname]);

  return (
    <footer className={`relative bg-gradient-to-b from-transparent to-gray-50/30 dark:to-gray-900/20 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 ease-in-out ${
      isFooterCollapsed 
        ? 'h-[4vh] sm:h-[3vh] -translate-y-1/2 opacity-70 hover:opacity-100 hover:translate-y-0 hover:h-[18vh] hover:sm:h-[16vh]' 
        : 'h-[18vh] sm:h-[16vh]'
    }`}>
      {/* Top glow effect */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 transition-all duration-300 ${
          isFooterCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="relative">
                <img 
                  src="/healthinsurancedave/mainPhoto3.jpg" 
                  alt="Health Insurance Dave" 
                  className="h-16 w-20 sm:h-20 sm:w-24 rounded-xl object-cover shadow-lg border-2 border-white/20 dark:border-gray-700/30"
                  draggable={false}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  Health Insurance Dave
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Your #1 Trusted Insurance Partner
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
              Dedicated to providing comprehensive health insurance solutions, cannabis business insurance, 
              solar solutions, and NIL partnerships. We're committed to helping you live victorious always.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a 
                href="tel:+18136471118" 
                className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                aria-label="Call us"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                  <i className="fas fa-phone text-blue-600 dark:text-blue-400 text-sm"></i>
                </div>
                <span className="ml-3 text-sm font-medium">(813) 647-1118</span>
              </a>
              <a 
                href="mailto:ElevatedHealthDavid@gmail.com" 
                className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                aria-label="Email us"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                  <i className="fas fa-envelope text-blue-600 dark:text-blue-400 text-sm"></i>
                </div>
                <span className="ml-3 text-sm font-medium">ElevatedHealthDavid@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/services", label: "Services" },
                { to: "/about", label: "About Us" },
                { to: "/certifications", label: "Certifications" },
                { to: "/discover", label: "Our Team" },
                { to: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 mr-3"></span>
                    <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3"></span>
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Health Insurance",
                "Cannabis Business Insurance", 
                "Solar Solutions",
                "NIL Partnerships"
              ].map((service) => (
                <li key={service}>
                  <span className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-blue-400/60 rounded-full mr-3"></span>
                    <span className="text-sm font-medium">{service}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t border-gray-200/50 dark:border-gray-700/50 mt-8 pt-8 pb-8 transition-all duration-300 ${
          isFooterCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © {currentYear} <span className="font-bold text-gray-900 dark:text-white">Living Victorious Always™</span> All Rights Reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Health Insurance Dave is a registered service provider.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm pr-16 md:pr-20">
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
                { to: "/disclaimer", label: "Disclaimer" }
              ].map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
