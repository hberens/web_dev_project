import React, { useState, useEffect, useMemo } from "react";
import { getAllBooks } from "/src/Common/Services/BookService";
import BookList from "../Books/BookList";
import Favorites from "../Favorites/Favorites";
import { createComment, deleteComment } from "../../Common/Services/CommentService";
import { Routes, Route } from "react-router-dom";
import { useFavorites } from "../../Context/FavoritesContext";
import "../../styles.css";

const Main = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { favorites, toggleFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState(""); // add the sorting feature

  // Fetch all the books
  useEffect(() => {
    getAllBooks().then((books) => {
      console.log("Fetched books:", books);
      if (Array.isArray(books)) {
        setBooks(books);
      } else {
        console.error("Invalid book data format:", books);
      }
    }).catch(error => {
      setErrorMessage("Failed to load books.");
      console.error("Error fetching books:", error);
    });
  }, []);

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

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {errorMessage && <div className="error">{errorMessage}</div>}

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

              <BookList
                books={sortedBooks}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </>
          }
        />
        <Route path="/favorites" element={<Favorites favorites={favorites} />} />
      </Routes>
    </div>
  );
};

export default Main;