import React, { useState, useEffect, useMemo } from "react";
import { getAllBooks } from "/src/Common/Services/BookService";
import BookList from "../Books/BookList";
import Favorites from "../Favorites/Favorites";
import { createComment, deleteComment } from "../../Common/Services/CommentService";
import { Routes, Route } from "react-router-dom";
import { useFavorites } from "../../Context/FavoritesContext";
import "./Main.css";
import BookSearch from "../Books/BookSearch"; 
import { useLocation, useNavigate } from "react-router-dom";

const Main = ({ initialShowSearch = false }) => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { favorites, toggleFavorite } = useFavorites();

  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(initialShowSearch);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput]     = useState(1);
  const booksPerPage = 60;

  const [sortBy, setSortBy] = useState(""); // add the sorting feature

  // Whenever the URL changes, drive showSearch from it:
  useEffect(() => {
    if (location.pathname.endsWith("/search")) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [location.pathname]);


  // Fetch all the books
  useEffect(() => {
    getAllBooks().then((fetched) => {
      console.log("Fetched books:", fetched);
      // invalid array of books 
      if (!Array.isArray(fetched)) {
        console.error("Invalid book data format:", fetched);
        return;
      }

      // Build a Map keyed by title, merging comments for duplicates
      const byTitle = new Map();
      fetched.forEach(book => {
        if (byTitle.has(book.title)) {
          // Merge comments arrays
          const existing = byTitle.get(book.title);
          existing.comments = [
            ...existing.comments,
            ...book.comments.filter(c => 
              !existing.comments.some(ec => ec.id === c.id)
            )
          ];
        } else {
          // Clone the book so we don't mutate the original fetched item
          byTitle.set(book.title, { ...book });
        }
      });

      // Deduplicate by `id` (keeps the first occurrence of each book.id):
      const uniqueBooks = Array.from(byTitle.values());
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
  // sort the books first
  const sortedBooks = useMemo(() => {
    const sorted = [...books];
    if (sortBy === "rating") {
      sorted.sort((a, b) => b.average_rating - a.average_rating);
    } else if (sortBy === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "year") {
      sorted.sort((a, b) => b.year - a.year);
    }
    return sorted;
  }, [books, sortBy]);

  // Compute slice for current page
  const lastIndex   = currentPage * booksPerPage;
  const firstIndex  = lastIndex - booksPerPage;
  const currentBooks = sortedBooks.slice(firstIndex, lastIndex);
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
  // function to delete a comment
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

  // When the user clicks "Search" in your main list:
  const goToSearch = () => {
    navigate("/books/search");
    // showSearch will flip automatically via the useEffect above
  };

  return (
    <div style={{ position: 'relative' }}>
      {errorMessage && <div className="error">{errorMessage}</div>}

      {/* Conditionally render the search component or the complete book list */}
      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
          <option value="">-- Select --</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="title">Title (A to Z)</option>
          <option value="year">Year (Newest to Oldest)</option>
          </select>
      </div>

      {/* render the search bar component */}
      {showSearch ? (
        <BookSearch
          books={books}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          sortBy={sortBy}
          allBooks={books}
        />
      ) : (
        <>
          <BookList 
            books={currentBooks}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            showHeader={true}
            onSearchClick={goToSearch}
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