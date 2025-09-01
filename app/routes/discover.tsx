
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IMAGES } from '../../src/utils/imageUtils';
// Performance monitoring removed - not essential for functionality
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

export function meta() {
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
          imgRef.current.src = IMAGES.HEALTH_DAVID;
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
  // Performance monitoring removed

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
    // Health Team Members - David Brown
    {
      id: 'health-1',
      name: 'David Brown',
      title: 'Health Coverage Expert',
      category: 'health',
      image: IMAGES.HEALTH_DAVID,
      phone: '(813) 647-1118',
      email: 'ElevatedHealthDavid@gmail.com',
      description: 'Licensed Health Coverage Expert with access to all options. Leading our mission to connect clients with the best health insurance solutions.',
      services: ['Individual Health Insurance', 'Family Health Plans', 'Group Insurance', 'Medicare', 'Medicaid'],
      featured: true
    },

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
              e.currentTarget.src = IMAGES.HEALTH_DAVID;
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
          
          {/* Contact Information */}
          <div className="member-contact">
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
          </div>

          {/* Services */}
          {member.services && (
            <div className="member-services">
              {member.services.map((service, index) => (
                <span key={index} className="service-badge">
                  {service}
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

                             {/* Contact Information */}
               <div className="health-member-contact">
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
               </div>

              {/* Services */}
              {member.services && (
                <div className="health-member-services">
                  {member.services.map((service, index) => (
                    <span key={index} className="health-service-badge">
                      {service}
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
