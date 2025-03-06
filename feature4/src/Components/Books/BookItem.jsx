import React from "react";
import CommentSection from "../Comments/CommentSection"; // Import CommentSection
import "../../styles.css"

const BookItem = ({ book, commentData, onInputChange, onSubmitComment, onDeleteComment, isFavorite, toggleFavorite }) => {
  return (
    <div className="book-item">
      <strong>
        <i>{book.title}</i>
      </strong> by {book.author}
      <small> Average Rating: {book.average_rating}</small>
      <p>{book.description}</p>

      {/* Display Comments */}
      <CommentSection
        comments={book.comments}
        commentData={commentData}
        onInputChange={onInputChange}
        onSubmitComment={onSubmitComment}
        onDeleteComment={onDeleteComment}
        bookId={book.id}
      />

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
