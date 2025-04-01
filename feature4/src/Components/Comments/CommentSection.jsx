import React from "react";
import "../../styles.css"

const CommentSection = ({ comments, commentData, onInputChange, onSubmitComment, onDeleteComment, bookId }) => {
  //console.log("Rendering CommentSection for book:", bookId);
  return (
    <div className="comments-section">
      <h4>Comments:</h4>
      {/* Displaying existing comments */}
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.username}</strong>: {comment.text}
              <button
                className="delete-comment"
                onClick={() => onDeleteComment(comment.id, bookId)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      {/* Comment Input Fields */}
      <input
        type="text"
        placeholder="Your name"
        value={commentData?.username || ""}
        onChange={(e) => onInputChange(bookId, "username", e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a comment..."
        value={commentData?.text || ""}
        onChange={(e) => onInputChange(bookId, "text", e.target.value)}
      />
      <button onClick={() => onSubmitComment(bookId)}>Comment</button>
    </div>
  );
};

export default CommentSection;
