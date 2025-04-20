import Parse from "parse";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllBooks } from "../Common/Services/BookService";
import "../styles.css";
// Create the context
const FavoritesContext = createContext();

// Create a provider component
export const FavoritesProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // added to make favorites persist
  const currentUser = Parse.User.current()

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
  // fetch the user's favorite books when logged in
  useEffect(() => {
    if (currentUser) {
      fetchFavoritesForUser(currentUser);
    } else {
      setFavorites([]); // reset if user logs out
    }
  }, [currentUser]);

  // fetch favorite books from Parse for a user
  const fetchFavoritesForUser = async (user) => {
    try {
      const Favorites = Parse.Object.extend("Favorites");
      const query = new Parse.Query(Favorites);
      query.equalTo("user", user);
      query.include("book");
      const results = await query.find();

      const favoriteBooks = results.map((fav) => {
        const book = fav.get("book");
        return {
          id: book.id,
          title: book.get("title"),
          subtitle: book.get("subtitle"),
          author: book.get("authors"),
          genre: book.get("categories"),
          average_rating: book.get("average_rating"),
          description: book.get("description"),
          year: book.get("published_year"),
          num_pages: book.get("num_pages"),
          num_ratings: book.get("ratings_count"),
        };
      });

      setFavorites(favoriteBooks);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // add or remove a book from the favorites for the current user
  const toggleFavorite = async (book) => {
    if (!currentUser) {
      alert("Please log in to save favorites.");
      return;
    }

    const isFavorite = favorites.some((fav) => fav.id === book.id);

    if (isFavorite) {
      // remove from Parse
      try {
        const Favorites = Parse.Object.extend("Favorites");
        const query = new Parse.Query(Favorites);
        query.equalTo("user", currentUser);
        query.equalTo("book", {
          __type: "Pointer",
          className: "NewBooks",
          objectId: book.id,
        });

        const results = await query.find();
        await Promise.all(results.map((fav) => fav.destroy()));
        setFavorites((prev) => prev.filter((fav) => fav.id !== book.id));
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    } else {
      // add to Parse
      try {
        const Favorites = Parse.Object.extend("Favorites");
        const favorite = new Favorites();

        const bookPointer = new Parse.Object("NewBooks");
        bookPointer.id = book.id;

        favorite.set("user", currentUser);
        favorite.set("book", bookPointer);

        const acl = new Parse.ACL(currentUser);
        acl.setReadAccess(currentUser, true);
        acl.setWriteAccess(currentUser, true);
        favorite.setACL(acl);

        await favorite.save();
        setFavorites((prev) => [...prev, book]);
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ books, favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// use the context for favorites
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

