import React from "react";
import { useFavorites } from "../../Context/FavoritesContext";
import BookItem from "../Books/BookItem";
import "../../styles.css";

// Print out all the favorites from the favorites list
const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="favorites-list">
      <h2>Favorite Books</h2>
      <div className="book-container">
        {favorites.length > 0 ? (
          favorites.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              showComments={false}  
              isFavorite={true} 
              toggleFavorite={toggleFavorite}
              showDetailsButton={false}
            />
          ))
        ) : (
          <p>No favorite books added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
