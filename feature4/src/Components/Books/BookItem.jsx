import React from "react";
import CommentSection from "../Comments/CommentSection"; // Import CommentSection
import "../../styles.css"

const BookItem = ({ book, commentData, onInputChange, onSubmitComment, onDeleteComment, isFavorite, toggleFavorite, showMoreDetails, toggleDetails, showComments, showDetailsButton } ) => {
  return (
    <div className="book-item">
      <strong>
        <i>{book.title}</i>
      </strong> by {book.author}
      <br />
      <small>Genre: {book.genre}</small>
      <small> Average Rating: {book.average_rating} out of {book.num_ratings} ratings</small>
      <div className="description-container">
        <p className="description">{book.description}</p>
      </div>

      {/* Conditionally Render "Show More Details" Button */}
      {showDetailsButton && (
        <button onClick={toggleDetails}>
          {showMoreDetails ? "Show Less Details" : "Show More Details"}
        </button>
      )}

      {/* Conditional rendering of additional details */}
      {showMoreDetails && (
        <div className="more-details">
          <p>Subtitle: {book.subtitle}</p>
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
