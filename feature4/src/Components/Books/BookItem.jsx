import React from "react";
import CommentSection from "../Comments/CommentSection"; // Import CommentSection
import "../../styles.css"

const BookItem = ({ book, commentData, onInputChange, onSubmitComment, onDeleteComment, isFavorite, toggleFavorite, showMoreDetails, toggleDetails, showComments, showDetailsButton } ) => {
  // Local fallbacks
  const author       = book.author       ?? "Unknown";
  const genre        = book.genre        ?? "Unknown";
  const avgRating    = book.average_rating ?? "N/A";
  const numRatings   = book.num_ratings  ?? "N/A";
  const year         = book.year        ?? "Unknown";
  const title        = book.title ?? "Unknown";
  const description  = book.description ?? "No description available.";

  return (
    <div className="book-item">
      <strong>
        <i>{book.title}</i>
      </strong> by {author}
      <br />
      <small>Genre: {genre}</small>
      <small> Average Rating: {avgRating} out of {numRatings} ratings</small>
      <div className="description-container">
        <p className="description">{description}</p>
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
