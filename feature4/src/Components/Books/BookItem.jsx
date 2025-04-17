import React from "react";
import { useState } from "react";
import CommentSection from "../Comments/CommentSection"; // Import CommentSection
import StarRating from "../Star/StarRating"; // for the star rating part
import "../../styles.css"

const BookItem = ({ book, commentData, onInputChange, onSubmitComment, onDeleteComment, isFavorite, toggleFavorite, showMoreDetails, toggleDetails, showComments, showDetailsButton, onAddRating } ) => {
  const [userRating, setUserRating] = useState(null); // Store user rating here

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    book.average_rating = Number(((book.average_rating*book.num_ratings) + rating) / (book.num_ratings + 1)).toFixed(2);
    console.log(book.average_rating);
    //onAddRating(book.id, book.average_rating); // Call onAddRating to update the average
  };

  return (
    <div className="book-item">
      <strong>
        <i>{book.title}</i>
      </strong> by {book.author}
      <br />
      <small>Genre: {book.genre}</small>
      <small> Average Rating: {book.average_rating} out of {book.num_ratings} ratings</small>

      <div className="rating-section">
        <StarRating
          currentRating={userRating || book.average_rating} // Show the current rating (or the average rating)
          onRatingChange={handleRatingChange}
        />
      </div> 

      <div className="description-container">
        <p className="description">{book.description}</p>
      </div>

      {/* Conditionally Render "Show More Details" Button */}
      {showDetailsButton && (
        <button onClick={toggleDetails} className="details-button">
          {showMoreDetails ? "Show Less Details" : "Show More Details"}
        </button>
      )}

      {/* Conditional rendering of additional details */}
      {showMoreDetails && (
        <div className="more-details">
          {book.subtitle && <p>Subtitle: {book.subtitle}</p>}
          <p>Number of Pages: {book.num_pages}</p>
          <small>Published in {book.year}</small>
        </div>
      )}

      {/* Display Comments */}
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

      {/* Favorite Button */}
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
