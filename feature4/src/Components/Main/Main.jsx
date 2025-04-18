import React, { useState, useEffect } from "react";
import { getAllBooks } from "/src/Common/Services/BookService";
import BookList from "../Books/BookList";
import Favorites from "../Favorites/Favorites";
import { createComment, deleteComment } from "../../Common/Services/CommentService";
import { Routes, Route } from "react-router-dom";
import { useFavorites } from "../../Context/FavoritesContext";
import "../../styles.css";
import BookSearch from "../Books/BookSearch"; 

const Main = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { favorites, toggleFavorite } = useFavorites();
  // State to toggle between full list and search view
  const [showSearch, setShowSearch] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput]     = useState(1);
  const booksPerPage = 60;


  // Fetch all the books
  useEffect(() => {
    getAllBooks().then((fetched) => {
      console.log("Fetched books:", fetched);
      // invalid array of books 
      if (!Array.isArray(fetched)) {
        console.error("Invalid book data format:", fetched);
        return;
      }

      // Deduplicate by `id` (keeps the first occurrence of each book.id):
      const uniqueBooks = Array.from(
        new Map(fetched.map(book => [book.title, book])).values()
      );

      setBooks(uniqueBooks);

    }).catch(error => {
      setErrorMessage("Failed to load books.");
      console.error("Error fetching books:", error);
    });
  }, []);

  // Keep the input in sync when page changes
  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  // Compute slice for current page
  const lastIndex   = currentPage * booksPerPage;
  const firstIndex  = lastIndex - booksPerPage;
  const currentBooks = books.slice(firstIndex, lastIndex);
  const totalPages   = Math.ceil(books.length / booksPerPage);

  // Handlers
  const handlePrev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  const handlePageInputChange = e => {
    setPageInput(e.target.value);
  };
  const handlePageInputSubmit = e => {
    e.preventDefault();
    let pg = parseInt(pageInput, 10);
    if (isNaN(pg)) return;
    pg = Math.max(1, Math.min(pg, totalPages));
    setCurrentPage(pg);
  };

  // Function to handle adding a comment
  const handleAddComment = async (bookId, username, commentText) => {
    try {
      const newComment = {
        id: Math.random().toString(),
        username,
        text: commentText,
        createdAt: new Date(),
      };

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId
            ? { ...book, comments: [...book.comments, newComment] }
            : book
        )
      );

      // Save the comment to the backend
      const savedComment = await createComment(bookId, commentText, username);
      console.log("Comment added:", savedComment);

      // Update the comment with the real ID
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId
            ? {
                ...book,
                comments: book.comments.map((comment) =>
                  comment.id === newComment.id
                    ? { ...comment, id: savedComment.id }
                    : comment
                ),
              }
            : book
        )
      );
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  // Function to handle deleting a comment
  const handleDeleteComment = async (commentId, bookId) => {
    try {
      const success = await deleteComment(commentId);
      if (success) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId
              ? { ...book, comments: book.comments.filter((comment) => comment.id !== commentId) }
              : book
          )
        );
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div>
      {/* Toggle button to switch between search and full list */}
      <button 
        onClick={() => setShowSearch((prev) => !prev)}
        style={{ margin: "1rem", padding: "0.5rem 1rem" }}
      >
        {showSearch ? "Show All Books" : "Search Books"}
      </button>

      {errorMessage && <div className="error">{errorMessage}</div>}

      {/* Conditionally render the search component or the complete book list */}
      {showSearch ? (
        <BookSearch
          books={books}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      ) : (
        <>
          <BookList 
            books={currentBooks}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />

          {/* Full‐list pagination controls */}
          <div className="pagination-controls">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              ← Prev
            </button>

            <form onSubmit={handlePageInputSubmit} style={{ display: "inline-block" }}>
              <input
                type="number"
                className="page-input"
                min="1"
                max={totalPages}
                value={pageInput}
                onChange={handlePageInputChange}
              />
            </form>
            <span>/ {totalPages}</span>

            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;

//   return (
//     <div>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               {errorMessage && <div className="error">{errorMessage}</div>}
//               <BookList
//                 books={books}
//                 onAddComment={handleAddComment}
//                 onDeleteComment={handleDeleteComment}
//                 favorites={favorites}
//                 toggleFavorite={toggleFavorite}
//               />
//             </>
//           }
//         />
//         <Route path="/favorites" element={<Favorites favorites={favorites} />} />
//       </Routes>
//     </div>
//   );
// };

//export default Main;