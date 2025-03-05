import Parse from "parse";
// CREATE operation - add a comment with a pointer to the book in back4app
export const createComment = async (objectId, commentText, username) => {
  try {
    console.log(`Adding comment to book ${objectId}:`, commentText);
    // fetch the book object to use as a pointer
    const Books = Parse.Object.extend("Books");
    const bookQuery = new Parse.Query(Books);
    const book = await bookQuery.get(objectId);

    if (!book) {
      throw new Error("Book not found");
    }

    // create a new comment object
    const Comment = Parse.Object.extend("Comment");
    const comment = new Comment();
    comment.set("comment", commentText);
    comment.set("books", book); // set pointer to the book
    comment.set("username", username); // Set the username

    // Save the comment - UPDATE
    const result = await comment.save();
    return result;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// READ operation for the comments - read the comments in the backend for each book
export const getCommentsForBook = async (objectId) => {
  try {
    const Books = Parse.Object.extend("Books");
    const bookQuery = new Parse.Query(Books);
    const book = await bookQuery.get(objectId);

    if (!book) {
      throw new Error("Book not found");
    }

    const Comments = Parse.Object.extend("Comment");
    const commentQuery = new Parse.Query(Comments);
    commentQuery.equalTo("books", book); // Fetch comments linked to this book
    const results = await commentQuery.find();

    // return the comments including the username
    return results.map((comment) => ({
      id: comment.id,
      text: comment.get("comment"),
      username: comment.get("username"), // get the username as well
      createdAt: comment.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

// DELETE operation - remove a comment by ID
export const deleteComment = async (commentId) => {
  try {
    console.log(`Deleting comment with ID: ${commentId}`);

    // Query for the comment object by its ID
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment);
    const comment = await query.get(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Delete the comment
    await comment.destroy();
    console.log(`Comment ${commentId} deleted successfully.`);

    return true; // Indicate success
  } catch (error) {
    console.error("Error deleting comment:", error);
    return false; // Indicate failure
  }
};
