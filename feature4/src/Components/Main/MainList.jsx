import "../../styles.css";
import { useFavorites } from "../../Context/FavoritesContext";
import { useState } from "react";
import { deleteComment } from "../../Common/Services/CommentService"

const MainList = ({ books, onAddComment }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [commentData, setCommentData] = useState({});

  // handle input change:
  const handleInputChange = (bookId, field, value) => {
    setCommentData((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value,
      },
    }));
  };

  // handle comment submission
  const handleSubmitComment = (bookId) => {
    const { username, text } = commentData[bookId] || {};
    if (username?.trim() && text?.trim()) {
      onAddComment(bookId, username, text); // Pass username and text to parent
    } else {
      alert("Please enter both a username and comment.");
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId, bookId) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmed) return;

    try {
      const success = await deleteComment(commentId);
      if (success) {
        onDeleteComment(commentId, bookId); // Update state in Main component
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="main-list">
      <hr />
      <h2>Popular Books Right Now</h2>
      <p>
        Here we share a list of the most popular books on Amazon, Goodreads, and
        Kindle along with their titles, authors, average ratings, and
        descriptions. Happy reading!
      </p>

      {/* Get the books from the database and display their attributes */}
      <div className="book-list">
        <h3>Books:</h3>
        {books && books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <strong>
                  <i>{book.title}</i>
                </strong>{" "}
                by {book.author}
                <small> Average Rating: {book.average_rating}</small>
                <p>{book.description}</p>
                {/* Display Comments */}
                {book.comments && book.comments.length > 0 && (
                  <div className="comments-section">
                    <h4>Comments:</h4>
                    <ul>
                      {book.comments.map((comment) => (
                        <li key={comment.id}>
                          <strong>{comment.username}</strong>: {comment.text}
                          <button
                            className="delete-comment"
                            onClick={() => handleDeleteComment(comment.id, book.id)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Comment Input */}
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentData[book.id]?.username || ""}
                  onChange={(e) =>
                    handleInputChange(book.id, "username", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentData[book.id]?.text || ""}
                  onChange={(e) =>
                    handleInputChange(book.id, "text", e.target.value)
                  }
                />
                <button onClick={() => handleSubmitComment(book.id)}>
                  Comment
                </button>
                {/* Heart button to toggle favorite */}
                <button
                  className={`favorite-button ${
                    favorites.some((fav) => fav.id === book.id)
                      ? "pink"
                      : "gray"
                  }`}
                  onClick={() => toggleFavorite(book)}
                >
                  ❤️
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default MainList;