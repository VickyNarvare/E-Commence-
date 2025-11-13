import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = true,
  className = '' 
}) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };
  
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= maxRating; i++) {
      if (i <= fullStars) {
        stars.push(
          <FaStar key={i} className="text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-400" />
        );
      } else {
        stars.push(
          <FaRegStar key={i} className="text-gray-300" />
        );
      }
    }
    
    return stars;
  };
  
  return (
    <div className={`flex items-center gap-1 ${sizes[size]} ${className}`}>
      {renderStars()}
      {showNumber && (
        <span className="ml-1 text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
