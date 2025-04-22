import React, { useState, useEffect } from "react";
import CommentSection from "../Comments/CommentSection";
import StarRating from "../Star/StarRating";
import "../../styles.css";
import Parse from "parse";

const BookItem = ({
  book,
  commentData,
  onInputChange,
  onSubmitComment,
  onDeleteComment,
  isFavorite,
  toggleFavorite,
  showMoreDetails,
  toggleDetails,
  showComments,
  showDetailsButton
}) => {
  const storageKey = `userRatings-${book.id}`;

  const [userRatings, setUserRatings] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));  // Track userId

  // Load ratings from Parse and localStorage
  useEffect(() => {
    const fetchRatings = async () => {
      if (!userId) return; // Skip fetching ratings if no userId

      const Rating = Parse.Object.extend("BookRating");
      const query = new Parse.Query(Rating);
      query.equalTo("bookId", book.id);

      try {
        const results = await query.find();
        const ratings = results.map((r) => r.get("rating"));
        const avg =
          ratings.length > 0
            ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
            : null;

        setUserRatings(ratings);
        
        // Check if the user has already rated the book
        const existing = results.find((r) => r.get("userId") === userId);
        setUserRating(existing ? existing.get("rating") : null);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [book.id, userId]);  // Runs whenever book or userId changes

  const handleRatingChange = async (rating) => {
    if (!userId) return; // Don't allow rating if no userId

    const Rating = Parse.Object.extend("BookRating");
    const query = new Parse.Query(Rating);
    query.equalTo("bookId", book.id);
    query.equalTo("userId", userId);

    try {
      const existing = await query.first();
      if (existing) {
        existing.set("rating", rating);
        await existing.save();
      } else {
        const newRating = new Rating();
        newRating.set("bookId", book.id);
        newRating.set("userId", userId);
        newRating.set("rating", rating);
        await newRating.save();
      }

      setUserRating(rating);

      // Re-fetch ratings to update average
      const allQuery = new Parse.Query(Rating);
      allQuery.equalTo("bookId", book.id);
      const results = await allQuery.find();
      const ratings = results.map((r) => r.get("rating"));
      const avg =
        ratings.length > 0
          ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
          : null;
      setUserRatings(ratings);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  // Clear ratings if no userId (after logout)
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (!userIdFromStorage) {
      setUserRating(null); // Reset user rating if no userId
    }
  }, [userId]);  // Trigger this effect when `userId` changes

  // Local fallbacks
  const author       = book.author       ?? "Unknown";
  const genre        = book.genre        ?? "Unknown";
  const avgRating    = book.average_rating ?? "N/A";
  const numRatings   = book.num_ratings  ?? "N/A";
  const year         = book.year        ?? "Unknown";
  const title        = book.title ?? "Unknown";
  const description  = book.description ?? "No description available.";

  return (
    <div className="book-item">
      <strong>
        <i>{title}</i>
      </strong> by {author}
      <br />
      <small>Genre: {genre}</small>
      <small>
        Original Dataset Rating: {book.average_rating} out of {book.num_ratings} ratings
      </small>
      {userRatings.length > 0 && (
        <div>
          <small>
            User Submitted Avg: {(userRatings.reduce((a, b) => a + b, 0) / userRatings.length).toFixed(2)} from {userRatings.length} rating{userRatings.length > 1 ? "s" : ""}
          </small>
        </div>
      )}

      {/* Star Rating Section */}
      <div className="rating-section">
        <StarRating
          currentRating={userRating || 0}
          onRatingChange={handleRatingChange}
        />
      </div>

      {showDetailsButton && (
        <button onClick={toggleDetails} className="details-button">
          {showMoreDetails ? "Show Less Details" : "Show More Details"}
        </button>
      )}

      {showMoreDetails && (
        <div className="more-details">
          {book.subtitle && <p>Subtitle: {book.subtitle}</p>}
          <p>Number of Pages: {book.num_pages}</p>
          <small>Published in {year}</small>
        </div>
      )}

      {showComments && (
        <CommentSection
          comments={book.comments}
          commentData={commentData}
          onInputChange={onInputChange}
          onSubmitComment={onSubmitComment}
          onDeleteComment={onDeleteComment}
          bookId={book.id}
        />
      )}

      <button
        className={`favorite-button ${isFavorite ? "pink" : "gray"}`}
        onClick={() => toggleFavorite(book)}
      >
        ❤️
      </button>
    </div>
  );
};

export default BookItem;


