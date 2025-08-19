import React from 'react';
import './ScrollArrow.css';

interface ScrollArrowProps {
  onClick: () => void;
}

const ScrollArrow: React.FC<ScrollArrowProps> = ({ onClick }) => {
  return (
    <button className="scroll-arrow" onClick={onClick} title="Scroll to next section">
      <i className="fas fa-chevron-down"></i>
    </button>
  );
};

export default ScrollArrow; 