import React from "react";

export function GlobalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      {/* Slim top border glow */}
      <div className="footer-top-glow" aria-hidden="true" />
      <div className="h-[10vh] max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
          © {year} LIVING VICTORIOUS ALWAYS™. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default GlobalFooter;


