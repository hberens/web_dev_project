import React, { useState, useEffect } from "react";
import { getAllBooks } from "/src/Common/Services/BookService";
import MainList from "./MainList";
import Favorites from "../Favorites/Favorites";
import { createComment, deleteComment } from "../../Common/Services/CommentService";
import { Routes, Route } from "react-router-dom";
import { useFavorites } from "../../Context/FavoritesContext";
import "../../styles.css";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const Main = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { favorites, toggleFavorite } = useFavorites();

  // Fetch all the books for the array to print
  useEffect(() => {
    getAllBooks().then((books) => {
      console.log("Fetched books:", books);
      if (Array.isArray(books)) {
        setBooks(books);
      } else {
        console.error("Invalid book data format:", books);
      }
    });
  }, []);

  // function to handle adding a comment
  const handleAddComment = async (bookId, username, commentText) => {
    try {
      // add the new comment locally first
      const newComment = {
        id: Math.random().toString(), // use temp ID to avoid errors
        username: username,
        text: commentText,
        createdAt: new Date(), // adding a timestamp
      };

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId
            ? {
                ...book,
                comments: [...book.comments, newComment], // add the new comment locally
              }
            : book
        )
      );

      // save the comment to the backend
      const savedComment = await createComment(bookId, commentText, username);
      console.log("Comment added:", savedComment);

      // update the comment with the real ID just to be safe lol
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId
            ? {
                ...book,
                comments: book.comments.map((comment) =>
                  comment.id === newComment.id
                    ? { ...comment, id: savedComment.id } // replace the tempID with the real one
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
        setBooks((prevBooks) => {
          // Create a completely new array with updated book objects
          const updatedBooks = prevBooks.map((book) => {
            if (book.id === bookId) {
              return {
                ...book,
                comments: book.comments.filter((comment) => comment.id !== commentId),
              };
            }
            return book;
          });
  
          return [...updatedBooks]; // Force React to detect state change
        });
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };  
  // routing!! 
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {errorMessage && <div className="error">{errorMessage}</div>}{" "}
              {/* Shows an error message */}
              <MainList
                books={books}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </>
          }
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        />
      </Routes>
    </div>
  );
};

export default Main;