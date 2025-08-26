import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";
import "./utilities.css";
import "./components/unifiedStyles.css";
import { GlobalHeader } from "./components/GlobalHeader";
import FloatingParticles from "./components/FloatingParticles";
import FloatingContactButton from "./components/FloatingContactButton";
import PromoThumbnail from "./components/PromoThumbnail/PromoThumbnail";
import { Footer } from "./components/Footer";


export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <link rel="icon" type="image/png" href="/healthinsurancedave/logo.png" />
        <link rel="shortcut icon" type="image/png" href="/healthinsurancedave/logo.png" />
        <link rel="apple-touch-icon" href="/healthinsurancedave/logo.png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              emailjs.init("1qn99Xqes0n2pMqC0");
            })();
          `
        }} />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const isCertificationMaster = location.pathname === '/certification_master';
  const hideHeader = isContactPage; // Hide header on contact page
  const hideFooter = isContactPage || isCertificationMaster; // Hide footer on contact and certification master pages

  // Register service worker for caching with better error handling
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          // console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  // console.log('New service worker available');
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          // console.warn('SW registration failed: ', registrationError);
        });
    } else if (import.meta.env.DEV && 'serviceWorker' in navigator) {
      // Unregister service worker in development to avoid caching issues
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
          // console.log('SW unregistered in development mode');
        }
      }).catch((error) => {
                  // console.warn('Failed to get service worker registrations:', error);
      });
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Backup scroll methods for better compatibility
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, [location.pathname]);

      return (
      <>
        <FloatingParticles />
        {!hideHeader && <GlobalHeader />}
        <main className={hideHeader ? "min-h-screen" : `min-h-[90vh] transition-all duration-300 ease-in-out overflow-visible`}>
          <Outlet />
        </main>
        {!hideFooter && <Footer />}
        <PromoThumbnail />
        <FloatingContactButton />
      </>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
