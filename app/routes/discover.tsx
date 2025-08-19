import type { Route } from "./+types/discover";
import "./discover.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Discover - SiteLVA" },
    { name: "description", content: "Discover amazing places and opportunities" },
  ];
}

export default function Discover() {
  return (
    <div className="route-discover container-root">
      <div className="inner-wide">
        <h1 className="page-title">
          Discover Amazing Places
        </h1>
        <p className="intro">
          Explore our curated collection of destinations, experiences, and opportunities 
          that will inspire your next adventure.
        </p>
        
        {/* Featured Categories */}
        <div className="card-grid">
          <div className="card">
            <div className="card-media media-blue">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="card-body">
              <h3 className="card-title">
                Local Attractions
              </h3>
              <p className="card-text">
                Find the best local spots and hidden gems in your area.
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-media media-green">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="card-body">
              <h3 className="card-title">
                Events & Activities
              </h3>
              <p className="card-text">
                Discover exciting events and activities happening around you.
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-media media-orange">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="card-body">
              <h3 className="card-title">
                Business Directory
              </h3>
              <p className="card-text">
                Connect with local businesses and service providers.
              </p>
            </div>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="search">
          <h2 className="search-title">
            Start Your Discovery
          </h2>
          <div className="search-row">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="search-input"
            />
            <button className="search-button btn-outline-accent">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
