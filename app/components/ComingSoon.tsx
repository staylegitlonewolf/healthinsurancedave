import React from 'react';
import { useNavigate } from 'react-router';
import './ComingSoon.css';

const ComingSoon: React.FC = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">Coming Soon</h1>
        <p className="coming-soon-message">
          This feature is under development and will be available soon.
        </p>
        <button onClick={handleReturn} className="return-btn">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;


