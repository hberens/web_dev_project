import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllBooks } from "../Common/Services/BookService";
import "../styles.css";
// Create the context
const FavoritesContext = createContext();

// Create a provider component
export const FavoritesProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // get a list of the books to print
  useEffect(() => {
    getAllBooks().then((books) => {
      console.log("Fetched books (favorites):", books);
      if (Array.isArray(books)) {
        setBooks(books);
      } else {
        console.error("Invalid book data format:", books);
      }
    });
  }, []);

  // Toggle favorite status
  const toggleFavorite = (book, button) => {
    setFavorites((prevFavorites) => {
      // Check if the book is already in favorites
      if (prevFavorites.some((fav) => fav.id === book.id)) {
        // If it is, remove it
        return prevFavorites.filter((fav) => fav.id !== book.id);
      } else {
        // If not, add it to favorites and change color
        //button.style.backgroundColor = "#45a049";
        return [...prevFavorites, book];
      }
    });
  };

  // return the favorites lists and function
  return (
    <FavoritesContext.Provider value={{ books, favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Create a custom hook to use the context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
