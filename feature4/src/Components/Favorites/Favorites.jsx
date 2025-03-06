import React from "react";
import { useFavorites } from "../../Context/FavoritesContext";
import "../../styles.css";

// print out all the favorites from the favorites list
const Favorites = () => {
  const { favorites } = useFavorites();
  return (
    <div>
      <h1>My Favorite Books</h1>
      <div className="book-list"> 
      {favorites.length > 0 ? (
        <div className="book-container">
          {favorites.map((book) => (
            <div className="book-item" key={book.id}>
              <strong>
                <i>{book.title}</i>
              </strong>{" "}
              by {book.author} |
              <small> Average Rating: {book.average_rating}</small>
              <p>{book.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite books yet.</p>
      )}
      </div>
    </div>
  );
};

export default Favorites;