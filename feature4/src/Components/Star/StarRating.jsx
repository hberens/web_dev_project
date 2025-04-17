import React, { useState } from "react";

// StarRating Component
const StarRating = ({ currentRating, onRatingChange }) => {
  const [hovered, setHovered] = useState(null); // To handle hovering over stars

  const handleStarClick = (rating) => {
    onRatingChange(rating);
  };

  const handleMouseEnter = (rating) => {
    setHovered(rating);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((rating) => (
        <span
          key={rating}
          className={`star ${rating <= (hovered || currentRating) ? "filled" : ""}`}
          onClick={() => handleStarClick(rating)}
          onMouseEnter={() => handleMouseEnter(rating)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;