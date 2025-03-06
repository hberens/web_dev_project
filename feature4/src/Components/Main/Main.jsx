import React, { useState, useEffect } from "react";
import { getAllBooks } from "/src/Common/Services/BookService";
import BookList from "../Books/BookList";  // Updated import
import Favorites from "../Favorites/Favorites";
import { createComment, deleteComment } from "../../Common/Services/CommentService";
import { Routes, Route } from "react-router-dom";
import { useFavorites } from "../../Context/FavoritesContext";
import "../../styles.css";

const Main = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { favorites, toggleFavorite } = useFavorites();

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

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {errorMessage && <div className="error">{errorMessage}</div>}
              <BookList
                books={books}
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