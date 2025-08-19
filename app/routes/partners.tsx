import type { Route } from "./+types/partners";
import "./partners.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Partners - SiteLVA" },
    { name: "description", content: "Partner with SiteLVA and grow your business" },
  ];
}

export default function Partners() {
  return (
    <div className="route-partners container-root">
      <div className="inner-wide">
        <h1 className="page-title">
          Partner With Us
        </h1>
        <p className="intro">
          Join our network of trusted partners and unlock new opportunities for growth, 
          visibility, and success in your business.
        </p>
        
        {/* Partnership Benefits */}
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon benefit-icon-blue">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h3 className="benefit-title">
              Increased Visibility
            </h3>
            <p className="benefit-text">
              Reach thousands of potential customers through our platform.
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon benefit-icon-green">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="benefit-title">
              Marketing Support
            </h3>
            <p className="benefit-text">
              Get access to our marketing tools and promotional campaigns.
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon benefit-icon-purple">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="benefit-title">
              Analytics & Insights
            </h3>
            <p className="benefit-text">
              Track your performance with detailed analytics and insights.
            </p>
          </div>
        </div>
        
        {/* Partnership Types */}
        <div className="types">
          <h2 className="types-title">
            Partnership Types
          </h2>
          <div className="types-grid">
            <div>
              <h3 className="type-heading">
                Business Partners
              </h3>
              <ul className="type-list">
                <li>• Featured listings in our directory</li>
                <li>• Priority customer referrals</li>
                <li>• Co-marketing opportunities</li>
                <li>• Exclusive promotional events</li>
              </ul>
            </div>
            <div>
              <h3 className="type-heading">
                Event Partners
              </h3>
              <ul className="type-list">
                <li>• Event promotion and ticketing</li>
                <li>• Venue partnerships</li>
                <li>• Sponsorship opportunities</li>
                <li>• Community engagement programs</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="form">
          <h2 className="form-title">
            Become a Partner
          </h2>
          <form className="space-y-6">
            <div className="form-grid">
              <div>
                <label className="label">
                  Company Name
                </label>
                <input
                  type="text"
                  className="input"
                />
              </div>
              <div>
                <label className="label">
                  Contact Person
                </label>
                <input
                  type="text"
                  className="input"
                />
              </div>
            </div>
            <div>
              <label className="label">
                Email
              </label>
              <input
                type="email"
                className="input"
              />
            </div>
            <div>
              <label className="label">
                Partnership Interest
              </label>
              <textarea
                rows={4}
                className="textarea"
                placeholder="Tell us about your business and how you'd like to partner with us..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit btn-outline-accent"
            >
              Submit Partnership Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
