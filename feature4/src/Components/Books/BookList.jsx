import "../../styles.css";
import { useFavorites } from "../../Context/FavoritesContext";
import { useState } from "react";
import { deleteComment } from "../../Common/Services/CommentService";
import BookItem from "./BookItem";

const BookList = ({ books, onAddComment, onDeleteComment, showHeader=true, onSearchClick }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [commentData, setCommentData] = useState({});
  const [expandedBookId, setExpandedBookId] = useState(null);


  // Handle input change for comments
  const handleInputChange = (bookId, field, value) => {
    setCommentData((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value,
      },
    }));
  };

  // Handle comment submission
  const handleSubmitComment = (bookId) => {
    console.log("Submitting comment for book:", bookId, commentData[bookId]);
  
    const { username, text } = commentData[bookId] || {};
    if (username?.trim() && text?.trim()) {
      onAddComment(bookId, username, text);
      setCommentData((prev) => ({ ...prev, [bookId]: { username: "", text: "" } })); // Reset input
    } else {
      alert("Please enter both a username and comment.");
    }
  };

  // Handle comment deletion
  const handleDeleteComment = (commentId, bookId) => {
    onDeleteComment(commentId, bookId);
  };

  const handleToggleDetails = (bookId) => {
    setExpandedBookId((prevId) => (prevId === bookId ? null : bookId)); // Toggle the selected book
  };

  return (
    <div className="main-list">
      {showHeader && (
        <div className="list-header-container">
          <div>
            <hr />
            <h2>Popular Books Right Now</h2>
            <p>
              Here we share a list of the most popular books on Amazon, Goodreads,
              and Kindle, along with their titles, authors, average ratings, and
              descriptions. Happy reading!
            </p>
          </div>
          {onSearchClick && (
            <button
              className="search-toggle-button"
              onClick={onSearchClick}
            >
              Search
            </button>
          )}
        </div>
      )}

      {/* Display Book List */}
      <div className="book-list">
        {showHeader && <h3>Books:</h3>}
        {books.length > 0 ? (
          <div className="book-container">
            {books.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                commentData={commentData[book.id] || { username: "", text: "" }}
                onInputChange={handleInputChange}
                onSubmitComment={handleSubmitComment}
                onDeleteComment={handleDeleteComment}
                isFavorite={favorites.some((fav) => fav.id === book.id)}
                toggleFavorite={toggleFavorite}
                showMoreDetails={expandedBookId === book.id}
                toggleDetails={() => handleToggleDetails(book.id)}
                showDetailsButton={true}
                showComments={true} 
              />
            ))}
          </div>
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
