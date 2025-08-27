/**
 * Image Path Utilities
 * Automatically handles base path for GitHub Pages deployment
 */

// Helper function to get correct image path for GitHub Pages
export const getImagePath = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development, use the path as-is
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production (GitHub Pages), prepend the base path
  return `/healthinsurancedave/${cleanPath}`;
};

// Predefined image paths for common assets
export const IMAGES = {
  // Technology logos
  REACT: getImagePath('react.webp'),
  REACT_ROUTER: getImagePath('react-router.webp'),
  VITE: getImagePath('vite.webp'),
  TYPESCRIPT: getImagePath('typescript.webp'),
  TAILWIND: getImagePath('tailwind.webp'),
  
  // Business logos
  CANNABIS_LOGO: getImagePath('cannabisLogo.png'),
  LOGO: getImagePath('logo.png'),
  ELEVATED_LOGO: getImagePath('elevatedLogo.png'),
  
  // Photos
  MAIN_PHOTO: getImagePath('mainPhoto.png'),
  MAIN_PHOTO2: getImagePath('mainPhoto2.png'),
  MAIN_PHOTO3: getImagePath('mainPhoto3.jpg'),
  DAVID_PROMO: getImagePath('davidPromo.png'),
  
  // NIL assets
  NIL_FHSAA: getImagePath('NiL/FHSAA_logo.png'),
  NIL_NCAA: getImagePath('NiL/NCAA LOGO.png'),
  NIL_VICTORIA: getImagePath('NiL/Vicotoria.png'),
  NIL_VICTORIA1: getImagePath('NiL/Vicotoria1.png'),
  NIL_VICTORIA2: getImagePath('NiL/Vicotoria2.png'),
  NIL_COMING_SOON: getImagePath('NiL/comingsoon.png'),
  NIL_MAXPREP: getImagePath('NiL/maxprep.png'),
  NIL_SCHOOL_LOGO: getImagePath('NiL/schoolLogo.png'),
  NIL_VICTORIA_AWARD: getImagePath('NiL/victoriaAward.png'),
  
  // Health assets
  HEALTH_DAVID: getImagePath('Health/David Brown.png'),
  HEALTH_MATTHIAS: getImagePath('Health/Matthias Wendler.png'),
  HEALTH_MASTER_DAVID: getImagePath('Health/masterDavid.png'),
  HEALTH_MASTER_MATTHIAS: getImagePath('Health/masterMatthias.png'),
  
  // Solar assets
  SOLAR_BRILLIANT: getImagePath('Solar/solarBrilliantSolar.png'),
  SOLAR_EAGLE: getImagePath('Solar/solarEagle.png'),
  SOLAR_ENPHASE: getImagePath('Solar/solarEnphase.png'),
  SOLAR_FREEDOM: getImagePath('Solar/solarFreedomForever.png'),
  SOLAR_HELIOSCOPE: getImagePath('Solar/solarHelioscope.png'),
  SOLAR_HUAWEI: getImagePath('Solar/solarHuawei.png'),
  SOLAR_JINKO: getImagePath('Solar/solarJinko.png'),
  SOLAR_QCELLS: getImagePath('Solar/solarQcells.png'),
  SOLAR_TRINA: getImagePath('Solar/solarTrinasolar.png'),
  
  // Flags
  FLAG_COLORADO: getImagePath('Flags/Colorado.svg'),
  FLAG_FLORIDA: getImagePath('Flags/Florida.svg'),
  FLAG_GEORGIA: getImagePath('Flags/Georgia.svg'),
  FLAG_MARYLAND: getImagePath('Flags/Maryland.svg'),
  FLAG_NEVADA: getImagePath('Flags/Nevada.svg'),
  FLAG_OHIO: getImagePath('Flags/Ohio.svg'),
  FLAG_TENNESSEE: getImagePath('Flags/Tennessee.svg'),
  FLAG_TEXAS: getImagePath('Flags/Texas.svg'),
  FLAG_UTAH: getImagePath('Flags/Utah.svg'),
  FLAG_VIRGINIA: getImagePath('Flags/Virginia.svg'),
  
  // Certifications
  CERT_COLORADO: getImagePath('media/Certification/Colorado.png'),
  CERT_FLORIDA: getImagePath('media/Certification/Florida.png'),
  CERT_FLORIDA1: getImagePath('media/Certification/Florida1.png'),
  CERT_GEORGIA: getImagePath('media/Certification/Georgia.png'),
  CERT_MARYLAND: getImagePath('media/Certification/Maryland.png'),
  CERT_NEVADA: getImagePath('media/Certification/Nevada.png'),
  CERT_OHIO: getImagePath('media/Certification/Ohio.png'),
  CERT_TENNESSEE: getImagePath('media/Certification/Tennessee.png'),
  CERT_TEXAS: getImagePath('media/Certification/Texas.png'),
  CERT_UTAH: getImagePath('media/Certification/Utah.png'),
  CERT_VIRGINIA: getImagePath('media/Certification/Virginia.png'),
  
  // PDFs
  PDF_FLORIDA: getImagePath('media/Certification/Florida_pdf.pdf'),
  PDF_GEORGIA: getImagePath('media/Certification/Georgia_pdf.pdf'),
  PDF_MARYLAND: getImagePath('media/Certification/Maryland_pdf.pdf'),
  PDF_OHIO: getImagePath('media/Certification/Ohio_pdf.pdf'),
  PDF_TENNESSEE: getImagePath('media/Certification/Tennessee_pdf.pdf'),
} as const;

// Type for image keys
export type ImageKey = keyof typeof IMAGES;
