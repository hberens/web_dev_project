import React, { useState } from "react";

// StarRating Component -> used as an interactive component so the user can rate books on a star based system
const StarRating = ({ currentRating, onRatingChange }) => {
  const [hovered, setHovered] = useState(null); // To handle hovering over stars

  // handles the clicking on the star
  const handleStarClick = (rating) => {
    onRatingChange(rating);
  };
  // handle the mouse hovering over a star
  const handleMouseEnter = (rating) => {
    setHovered(rating);
  };
  // handle the mouse leaving the star
  const handleMouseLeave = () => {
    setHovered(null);
  };
  // return how many stars should be filled and the rating that corresponds to
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