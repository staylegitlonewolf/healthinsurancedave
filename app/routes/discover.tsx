import type { Route } from "./+types/discover";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { usePerformanceMonitor } from '../lib/usePerformance';
import "./discover.css";

// Define proper types for team members
interface TeamMember {
  id: string;
  name: string;
  title: string;
  category: string;
  image: string;
  phone?: string;
  email?: string;
  website?: string;
  description: string;
  services?: string[];
  featured: boolean;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meet The Team - Health Insurance Dave" },
    { name: "description", content: "Meet our expert team across Health, NIL, and Solar divisions" },
  ];
}

// Debounced search hook for better performance
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Optimized lazy loading hook for images with better error handling
const useLazyImage = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && imgRef.current) {
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        setHasError(false);
      };
      img.onerror = () => {
        setHasError(true);
        setIsLoaded(true);
        // Fallback to placeholder if image fails to load
        if (imgRef.current) {
          imgRef.current.src = '/NiL/comingsoon.png';
        }
      };
      img.src = src;
      imgRef.current.src = src;
    }
  }, [isInView, src]);

  return { imgRef, isLoaded, isInView, hasError };
};

export default function Team() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  // Performance monitoring
  usePerformanceMonitor('Team');

  // Debounced search for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Read URL parameters to set initial category filter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam && ['health', 'nil', 'solar'].includes(categoryParam)) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('all');
    }
  }, [location.search]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  // Discover data combining Health, NIL, and Solar members
  const teamMembers: TeamMember[] = useMemo(() => [
    // Health Team Members - David Brown and Matthias Wendler
    {
      id: 'health-1',
      name: 'David Brown',
      title: 'Health Coverage Expert',
      category: 'health',
      image: '/Health/David Brown.png',
      phone: '(813) 647-1118',
      email: 'ElevatedHealthDavid@gmail.com',
      description: 'Licensed Health Coverage Expert with access to all options. Leading our mission to connect clients with the best solutions across all services. Specialized in cannabis health partnerships and industry-specific coverage solutions.',
      services: ['Cannabis Health', 'Health Insurance', 'Solar Solutions', 'NIL Partnerships'],
      featured: true
    },
    {
      id: 'health-2',
      name: 'Matthias Wendler',
      title: 'Health Coverage Expert',
      category: 'health',
      image: '/Health/Matthias Wendler.png',
      phone: '(813) 230-6033',
      email: 'ElevatedHealthMatthias@gmail.com',
      description: 'Licensed Health Coverage Expert with access to all options. Focuses on expanding our service reach and building strategic partnerships.',
      services: ['Health Insurance', 'Business Development'],
      featured: false
    },

               // NIL
           {
             id: 'nil-1',
             name: 'Victoria Whitfield',
             title: 'NIL Specialist & Elite Athlete',
             category: 'nil',
             image: '/NiL/Vicotoria.png',
             phone: '(234) 567-890',
             email: 'victoria@lvastudio.com',
             description: 'Victoria Whitfield is a standout athlete from East Bay High School in Gibsonton, FL, specializing in Flag Football and Basketball. As a Junior (Class of 2027), she has achieved remarkable success including being named Player of the Game and ranking 77th nationally for total tries made. Victoria excels in both sports - playing Varsity Flag Football as #3 Athlete and Varsity Basketball as #4 Center. Standing 5\'7" and weighing 133 lbs, she brings a unique perspective to NIL partnerships, combining her athletic achievements with expertise in athlete branding and Name, Image, and Likeness opportunities. Her recent performance includes 12 total points, 2 touchdowns, and 224 passing yards, demonstrating her exceptional talent and marketability. Victoria has an active NIL endorsement deal with LVA S&H LLC, showcasing her professional approach to athlete branding and partnerships.',
    
             featured: true
           },

    // Solar Team Members (using solar company logos as team members)
    {
      id: 'solar-1',
      name: 'Brilliant Solar',
      title: 'Premium Solar Solutions',
      category: 'solar',
      image: '/Solar/solarBrilliantSolar.png',
      phone: '1-800-805-1889',
      email: 'info@mybrilliantsolar.com',
      website: 'https://mybrilliantsolar.com/',
      description: 'Brilliant Solar is a leading residential and commercial solar energy provider headquartered in Toms River, NJ. We specialize in custom solar installations, energy storage solutions, and comprehensive solar services across multiple states. Our mission is to make solar energy accessible and affordable while providing exceptional customer service and reliable, high-quality installations.',
      services: ['Residential Solar', 'Commercial Solar', 'Energy Storage', 'Solar Maintenance', 'Financing Options', '24/7 Support'],
      featured: true
    },
    {
      id: 'solar-2',
      name: 'Eagle Solar',
      title: 'Premium Solar Panel Solutions',
      category: 'solar',
      image: '/Solar/solarEagle.png',
      website: 'https://jinkosolar.us/eagle-modules/',
      description: 'Eagle Solar represents Jinko Solar\'s premium Eagle series modules, delivering industry-leading efficiency and reliability. Our Eagle modules feature advanced PERC technology, bifacial design, and superior performance in real-world conditions. With over 15 years of manufacturing excellence, Eagle Solar provides residential and commercial customers with cutting-edge solar technology backed by comprehensive warranties and exceptional customer support.',
      services: ['Premium Solar Panels', 'PERC Technology', 'Bifacial Modules', 'High Efficiency', 'Extended Warranties', 'Commercial Solutions'],
      featured: false
    },
    {
      id: 'solar-3',
      name: 'Enphase Energy',
      title: 'Smart Solar Technology Leader',
      category: 'solar',
      image: '/Solar/solarEnphase.png',
      phone: '(877) 797-4743',
      website: 'https://www.enphase.com/',
      description: 'Enphase Energy is the global leader in smart solar technology, revolutionizing the industry with our innovative microinverter systems. Our IQ microinverters provide maximum energy harvest, enhanced safety, and real-time monitoring capabilities. With over 50 million microinverters deployed worldwide, Enphase delivers reliable, intelligent solar solutions that optimize energy production and provide homeowners with complete visibility into their solar system performance.',
      services: ['IQ Microinverters', 'Smart Monitoring', 'Energy Optimization', 'System Diagnostics', 'Battery Storage', 'Grid Services'],
      featured: false
    },
    {
      id: 'solar-4',
      name: 'Freedom Forever',
      title: 'Complete Solar Freedom Solutions',
      category: 'solar',
      image: '/Solar/solarFreedomForever.png',
      phone: '800-685-1850',     
      website: 'https://www.freedomforever.com/',
      description: 'Freedom Forever is dedicated to providing complete solar freedom through comprehensive energy solutions. We offer end-to-end solar services including custom design, professional installation, and ongoing maintenance. Our commitment to quality and customer satisfaction has made us one of the fastest-growing solar companies in America. We provide flexible financing options, premium equipment, and lifetime support to ensure our customers achieve true energy independence.',
      services: ['Custom Solar Design', 'Professional Installation', 'Lifetime Support', 'Flexible Financing', 'Premium Equipment', 'Energy Independence'],
      featured: false
    },
    {
      id: 'solar-5',
      name: 'Helioscope',
      title: 'Advanced Solar Design & Analysis',
      category: 'solar',
      image: '/Solar/solarHelioscope.png',      
      website: 'https://helioscope.aurorasolar.com/',
      description: 'Helioscope is the industry-leading solar design and analysis platform, providing comprehensive tools for optimal system performance. Our advanced software enables solar professionals to create accurate designs, perform detailed shading analysis, and generate precise energy production estimates. With cloud-based collaboration and real-time updates, Helioscope streamlines the entire solar project lifecycle from initial design to final commissioning.',
      services: ['Solar Design Software', 'Shading Analysis', 'Energy Modeling', 'System Optimization', 'Project Collaboration', 'Performance Monitoring'],
      featured: false
    },
    {
      id: 'solar-6',
      name: 'Huawei Solar',
      title: 'Smart Solar & Energy Storage',
      category: 'solar',
      image: '/Solar/solarHuawei.png',   
      website: 'https://solar.huawei.com/en/',
      description: 'Huawei Solar is a global leader in smart solar solutions and energy storage systems, combining cutting-edge technology with intelligent energy management. Our FusionSolar solutions integrate solar inverters, energy storage, and smart grid technologies to create comprehensive energy ecosystems. With AI-powered optimization and cloud-based monitoring, Huawei Solar delivers maximum efficiency, reliability, and intelligent energy management for residential and commercial applications.',
      services: ['Smart Inverters', 'Energy Storage Systems', 'AI Optimization', 'Cloud Monitoring', 'Grid Integration', 'Commercial Solutions'],
      featured: false
    },
    {
      id: 'solar-7',
      name: 'Jinko Solar',
      title: 'World-Class Solar Technology',
      category: 'solar',
      image: '/Solar/solarJinko.png',
      website: 'https://jinkosolar.us/',
      description: 'Jinko Solar is a world-class solar panel manufacturer delivering cutting-edge technology and exceptional quality. As one of the largest and most innovative solar companies globally, we produce high-efficiency modules using advanced PERC, TOPCon, and HJT technologies. Our commitment to research and development has resulted in multiple world records for solar cell efficiency. Jinko Solar provides reliable, high-performance solar solutions backed by industry-leading warranties and comprehensive customer support.',
      services: ['High-Efficiency Modules', 'PERC Technology', 'TOPCon Cells', 'HJT Technology', 'Global Support', 'Extended Warranties'],
      featured: false
    },
    {
      id: 'solar-8',
      name: 'Qcells',
      title: 'Premium Solar Cell Technology',
      category: 'solar',
      image: '/Solar/solarQcells.png',      
      website: 'https://www.qcells.com/',
      description: 'Qcells is a global leader in premium solar cell and module technology, delivering maximum efficiency and reliability. Our advanced Q.ANTUM technology combines PERC, QID, and Zero Gap technology to achieve superior performance and durability. With manufacturing facilities in the United States and worldwide, Qcells provides high-quality solar solutions with industry-leading warranties and comprehensive technical support for residential and commercial applications.',
      services: ['Q.ANTUM Technology', 'PERC Solar Cells', 'Zero Gap Technology', 'High Efficiency Modules', 'US Manufacturing', 'Premium Warranties'],
      featured: false
    },
    {
      id: 'solar-9',
      name: 'Trina Solar',
      title: 'Global Solar Energy Solutions',
      category: 'solar',
      image: '/Solar/solarTrinasolar.png',
      website: 'https://www.trinasolar.com/us',
      description: 'Trina Solar is a global leader in solar energy solutions, providing comprehensive products and services worldwide. Our innovative Vertex series modules feature advanced cell technology and industry-leading efficiency ratings. With over 25 years of experience and a presence in more than 100 countries, Trina Solar delivers reliable, high-performance solar solutions backed by extensive research and development, comprehensive warranties, and global customer support.',
      services: ['Vertex Series Modules', 'Advanced Cell Technology', 'Global Solutions', 'High Efficiency', 'Comprehensive Support', 'Research & Development'],
      featured: false
    }
  ], []);

  // Initialize filtered members when component mounts
  useEffect(() => {
    setFilteredMembers(teamMembers);
    setIsLoading(false);
  }, [teamMembers]);

  // Filter members based on active category and search query
  useEffect(() => {
    let filtered = teamMembers;
    
    // First filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(member => member.category === activeCategory);
    }
    
    // Then filter by search query
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(query) ||
        member.title.toLowerCase().includes(query) ||
        member.description.toLowerCase().includes(query) ||
        (member.services && member.services.some(service => 
          service.toLowerCase().includes(query)
        )) ||
        (member.email && member.email.toLowerCase().includes(query)) ||
        (member.phone && member.phone.includes(query))
      );
    }
    
    setFilteredMembers(filtered);
  }, [activeCategory, debouncedSearchQuery, teamMembers]);

  const handleCategorySelect = useCallback((category: string) => {
    setActiveCategory(category);
    
    // Multiple scroll methods to ensure it works across all browsers and scenarios
    try {
      // Primary method - smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Backup method - scroll document element
      document.documentElement.scrollTop = 0;
      
      // Backup method - scroll body element  
      document.body.scrollTop = 0;
      
      // Alternative method for mobile devices
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 50);
      }
    } catch (error) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setSearchFocused(false);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleOpenMasterPhoto = useCallback((member: TeamMember) => {
    // Route to different master components based on category
    if (member.category === 'solar') {
      navigate('/solar_master', {
        state: {
          partnerData: member,
          returnPath: '/discover',
          partnerId: member.id
        }
      });
    } else if (member.category === 'nil') {
      navigate('/nil_master', {
        state: {
          specialistData: member,
          returnPath: '/discover',
          specialistId: member.id
        }
      });
    } else {
      navigate('/health_master', {
        state: {
          memberData: member,
          returnPath: '/discover',
          memberId: member.id
        }
      });
    }
  }, [navigate]);

  const categories = useMemo(() => [
    { id: 'all', name: 'All', icon: 'fas fa-users' },
    { id: 'health', name: 'Health', icon: 'fas fa-heartbeat' },
    { id: 'nil', name: 'NIL', icon: 'fas fa-star' },
    { id: 'solar', name: 'Solar', icon: 'fas fa-solar-panel' }
  ], []);

  // Optimized image loading component
  const TeamMemberCard = ({ member }: { member: TeamMember }) => {
    const { imgRef, isLoaded, isInView, hasError } = useLazyImage(member.image);

    const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
      // Image loaded successfully
    }, []);

    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
      // Fallback to placeholder
      e.currentTarget.src = '/NiL/comingsoon.png';
    }, []);

    const handleCardClick = useCallback(() => {
      handleOpenMasterPhoto(member);
    }, [member]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick();
      }
    }, [handleCardClick]);

    return (
      <div 
        className={`discover-member ${member.category === 'nil' ? 'nil-member' : ''}`}
        data-category={member.category}
        onClick={handleCardClick}
        onKeyPress={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${member.name}, ${member.title}`}
      >
        <div className="member-image">
          <img
            ref={imgRef}
            src={member.image}
            alt={`${member.name} - ${member.title}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
          {!isLoaded && isInView && (
            <div className="image-placeholder">
              <div className="loading-spinner"></div>
            </div>
          )}
          {hasError && (
            <div className="image-error">
              <i className="fas fa-image"></i>
              <span>Image unavailable</span>
            </div>
          )}
          <div className="image-overlay">
            <i className="fas fa-eye"></i>
          </div>
        </div>
        
        <div className="member-info">
          <h3 className="member-name">{member.name}</h3>
          <p className="member-title">{member.title}</p>
          
          {/* Contact Information or School Information */}
          <div className="member-contact">
            {member.category === 'nil' ? (
              // School information for NIL specialists
              <>
                <div className="contact-item school-item">
                  <img src="/NiL/schoolLogo.png" alt="School Logo" className="school-logo" />
                  <span>East Bay High School</span>
                </div>
                <div className="contact-item school-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Gibsonton, FL</span>
                </div>
                {member.website && (
                  <div className="contact-item website-item">
                    <i className="fas fa-globe"></i>
                    <a 
                      href={member.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Visit ${member.name}'s website`}
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </>
            ) : (
              // Regular contact information for other categories
              <>
                {member.phone && (
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <a 
                      href={`tel:${member.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Call ${member.name}`}
                    >
                      {member.phone}
                    </a>
                  </div>
                )}
                {member.email && (
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <a 
                      href={`mailto:${member.email}`}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Email ${member.name}`}
                    >
                      {member.email}
                    </a>
                  </div>
                )}
                {member.website && (
                  <div className="contact-item website-item">
                    <i className="fas fa-globe"></i>
                    <a 
                      href={member.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Visit ${member.name}'s website`}
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Services */}
          {member.services && (
            <div className="member-services">
              {member.services.map((service, index) => (
                <span key={index} className={`service-badge ${service === 'Cannabis Health' ? 'cannabis-service-badge' : ''}`}>
                  {service === 'Cannabis Health' ? (
                    <>
                      <img src="/cannabisLogo.png" alt="Cannabis" className="cannabis-service-icon" />
                      NEW Cannabis for Business
                    </>
                  ) : (
                    service
                  )}
                </span>
              ))}
            </div>
          )}

          <button 
            className="connect-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            aria-label={`Connect with ${member.name}`}
          >
            <i className="fas fa-user-plus"></i>
            <span>Connect</span>
          </button>
        </div>
      </div>
    );
  };

  // Special Health Layout Component for side-by-side display
  const HealthLayout = ({ members }: { members: TeamMember[] }) => {
    return (
      <div className="health-layout-container">
        {members.map((member) => (
          <div key={member.id} className="health-member-card" onClick={() => handleOpenMasterPhoto(member)}>
            <div className="health-member-image">
              <img 
                src={member.image}
                alt={member.name} 
                loading="lazy"
              />
              <div className="health-image-overlay">
                <i className="fas fa-eye"></i>
              </div>
            </div>
            
            <div className="health-member-details">
              <h3 className="health-member-name">{member.name}</h3>
              <p className="health-member-title">{member.title}</p>

                             {/* Contact Information or School Information */}
               <div className="health-member-contact">
                 {member.category === 'nil' ? (
                   // School information for NIL specialists
                   <>
                     <div className="health-contact-item school-item">
                       <img src="/NiL/schoolLogo.png" alt="School Logo" className="school-logo" />
                       <span>East Bay High School</span>
                     </div>
                     <div className="health-contact-item school-item">
                       <i className="fas fa-map-marker-alt"></i>
                       <span>Gibsonton, FL</span>
                     </div>
                   </>
                 ) : (
                   // Regular contact information for other categories
                   <>
                     {member.phone && (
                       <div className="health-contact-item">
                         <i className="fas fa-phone"></i>
                         <span>{member.phone}</span>
                       </div>
                     )}
                     {member.email && (
                       <div className="health-contact-item">
                         <i className="fas fa-envelope"></i>
                         <a href={`mailto:${member.email}`}>{member.email}</a>
                       </div>
                     )}
                   </>
                 )}
               </div>

              {/* Services */}
              {member.services && (
                <div className="health-member-services">
                  {member.services.map((service, index) => (
                    <span key={index} className={`health-service-badge ${service === 'Cannabis Health' ? 'cannabis-service-badge' : ''}`}>
                      {service === 'Cannabis Health' ? (
                        <>
                          <img src="/cannabisLogo.png" alt="Cannabis" className="cannabis-service-icon" />
                          NEW Cannabis for Business
                        </>
                      ) : (
                        service
                      )}
                    </span>
                  ))}
                </div>
              )}

              <button className="health-connect-btn">
                <i className="fas fa-user-plus"></i>
                <span>Connect</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="discover-layout discover-page">
      {/* Enhanced Search Bar */}
      <div className="discover-search-container">
            <div className={`search-input-wrapper ${searchFocused ? 'focused' : ''}`}>
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search team members, services, or contact info..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="discover-search-input"
                aria-label="Search team members"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="search-clear-btn"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="search-results-info">
                <span>{filteredMembers.length} result{filteredMembers.length !== 1 ? 's' : ''} found</span>
              </div>
            )}
          </div>

      {/* Main Content */}
      <div className="discover-content-main discover-content">
        {isLoading ? (
          /* Loading Skeleton */
          <div className="discover-members-grid">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="discover-member skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMembers.length === 0 ? (
          /* No Results Message */
          <div className="no-members-message">
            <i className="fas fa-search" style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem' }}></i>
            <h3>No results found</h3>
            <p>Try adjusting your search terms or browse by category</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                // Scroll to top when clearing filters
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-outline-accent"
              style={{ marginTop: '1rem' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Content Display */
          <>
            {/* Special layout for Health category */}
            {activeCategory === 'health' && filteredMembers.length > 0 ? (
              <HealthLayout members={filteredMembers} />
            ) : (
              /* Regular grid layout for other categories */
              <div className="discover-members-grid">
                {filteredMembers.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
