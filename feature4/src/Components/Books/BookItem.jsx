import React, { useState, useEffect } from "react";
import CommentSection from "../Comments/CommentSection";
import StarRating from "../Star/StarRating";
import "../../styles.css";

const BookItem = ({
  book,
  commentData,
  onInputChange,
  onSubmitComment,
  onDeleteComment,
  isFavorite,
  toggleFavorite,
  showMoreDetails,
  toggleDetails,
  showComments,
  showDetailsButton
}) => {
  const storageKey = `userRatings-${book.id}`; // i'm doing this so that we persist using local storage 

  const [userRatings, setUserRatings] = useState([]);
  const [userRating, setUserRating] = useState(null);

  // Load ratings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserRatings(parsed);
    }
  }, [storageKey]);

  // this function handles the rating change made by the user
  const handleRatingChange = (rating) => {
    const updatedRatings = [...userRatings, rating];
    setUserRatings(updatedRatings);
    setUserRating(rating);
    localStorage.setItem(storageKey, JSON.stringify(updatedRatings));
  };

  // compute user average
  const userAverage =
    userRatings.length > 0
      ? (userRatings.reduce((a, b) => a + b, 0) / userRatings.length).toFixed(2)
      : null;

  return (
    <div className="book-item">
      <strong>
        <i>{book.title}</i>
      </strong>{" "}
      by {book.author}
      <br />
      <small>Genre: {book.genre}</small>
      <br />
      <small>
        Original Dataset Rating: {book.average_rating} out of {book.num_ratings} ratings
      </small>
      {userAverage && (
        <div>
          <small>
            User Submitted Avg: {userAverage} from {userRatings.length} rating
            {userRatings.length > 1 ? "s" : ""}
          </small>
        </div>
      )}
    {/* added this section to use the star rating */}
      <div className="rating-section">
        <StarRating
          currentRating={userRating || 0}
          onRatingChange={handleRatingChange}
        />
      </div>

      <div className="description-container">
        <p className="description">{book.description}</p>
      </div>

      {showDetailsButton && (
        <button onClick={toggleDetails} className="details-button">
          {showMoreDetails ? "Show Less Details" : "Show More Details"}
        </button>
      )}

      {showMoreDetails && (
        <div className="more-details">
          {book.subtitle && <p>Subtitle: {book.subtitle}</p>}
          <p>Number of Pages: {book.num_pages}</p>
          <small>Published in {book.year}</small>
        </div>
      )}

      {showComments && (
        <CommentSection
          comments={book.comments}
          commentData={commentData}
          onInputChange={onInputChange}
          onSubmitComment={onSubmitComment}
          onDeleteComment={onDeleteComment}
          bookId={book.id}
        />
      )}

      <button
        className={`favorite-button ${isFavorite ? "pink" : "gray"}`}
        onClick={() => toggleFavorite(book)}
      >
        ❤️
      </button>
    </div>
  );
};

export default BookItem;
