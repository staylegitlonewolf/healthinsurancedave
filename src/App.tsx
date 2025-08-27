import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './App.css'
import '../app/app.css'

// ===== CORE LAYOUT COMPONENTS =====
import { GlobalHeader } from '../app/components/GlobalHeader'
import { Footer } from '../app/components/Footer'
import FloatingParticles from '../app/components/FloatingParticles'
import FloatingContactButton from '../app/components/FloatingContactButton'
import PromoThumbnail from '../app/components/PromoThumbnail/PromoThumbnail'

// ===== PAGE COMPONENTS =====
import Home from '../app/routes/home'
import Services from '../app/routes/services'
import About from '../app/routes/about'
import Certifications from '../app/routes/certifications'
import Discover from '../app/routes/discover'
import Contact from '../app/routes/contact'
import HealthMaster from '../app/routes/health_master'
import CertificationMaster from '../app/routes/certification_master'
import NILMaster from '../app/components/nilMaster/NILMaster'
import SolarMaster from '../app/components/solarMaster/SolarMaster'
import Disclaimer from '../app/routes/disclaimer'
import Terms from '../app/routes/terms'
import Privacy from '../app/routes/privacy'
import Debug from '../app/routes/debug'

// ===== STYLES - BASE & COMPONENTS (LOAD FIRST) =====
import '../app/components/unifiedStyles.css'
import '../app/components/masterComponents.css'
import '../app/components/GlobalHeader.css'
import '../app/components/Footer.css'
import '../app/components/FloatingParticles.css'
import '../app/components/FloatingContactButton.css'
import '../app/components/ScrollArrow.css'
import '../app/components/PromoThumbnail/PromoThumbnail.css'
import '../app/components/nilMaster/NILMaster.css'
import '../app/components/solarMaster/SolarMaster.css'

// ===== STYLES - SERVICES =====
import '../app/routes/Services/Services.css'

// ===== STYLES - MAIN PAGES (LOAD LAST) =====
import '../app/routes/home.css'
import '../app/routes/about.css'
import '../app/routes/certifications.css'
import '../app/routes/discover.css'
import '../app/routes/contact.css'
import '../app/routes/disclaimer.css'
import '../app/routes/terms.css'
import '../app/routes/privacy.css'

// ===== MAIN LAYOUT COMPONENT =====
function AppLayout() {
  return (
    <div className="App">
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingParticles />
      <FloatingContactButton />
      <PromoThumbnail />
    </div>
  )
}

// ===== ROUTER CONFIGURATION =====
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Main Pages
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "about", element: <About /> },
      { path: "certifications", element: <Certifications /> },
      { path: "discover", element: <Discover /> },
      { path: "contact", element: <Contact /> },
      
      // Master Pages
      { path: "health_master", element: <HealthMaster /> },
      { path: "certification_master", element: <CertificationMaster /> },
      { path: "nil_master", element: <NILMaster /> },
      { path: "solar_master", element: <SolarMaster /> },
      
      // Legal Pages
      { path: "disclaimer", element: <Disclaimer /> },
      { path: "terms", element: <Terms /> },
      { path: "privacy", element: <Privacy /> },
      
      // Development
      { path: "debug", element: <Debug /> }
    ]
  }
], {
  basename: '/healthinsurancedave'
})

// ===== MAIN APP COMPONENT =====
function App() {
  return <RouterProvider router={router} />
}

export default App
