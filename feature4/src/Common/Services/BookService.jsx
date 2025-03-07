import Parse from "parse";

/* SERVICE FOR PARSE SERVER OPERATIONS */
// Store books globally
export let Books = { collection: [] };

// READ operation - Get all books from Parse class "Books"
export const getAllBooks = async () => {
  try {
    const Book = Parse.Object.extend("Books");
    const query = new Parse.Query(Book);
    const results = await query.find();
    console.log("Raw Parse book results:", results);

    const Comment = Parse.Object.extend("Comment");
    const commentQuery = new Parse.Query(Comment);
    commentQuery.include("books");
    commentQuery.include("username"); // Ensure user information is included
    const comments = await commentQuery.find();
    console.log("Raw Parse comment results:", comments);

    const commentsByBook = {};
    comments.forEach((comment) => {
      const bookId = comment.get("books")?.id;
      if (bookId) {
        if (!commentsByBook[bookId]) {
          commentsByBook[bookId] = [];
        }
        commentsByBook[bookId].push({
          id: comment.id,
          text: comment.get("comment"),
          username: comment.get("username"), // fetch the username from the related user
        });
      }
    });

    const formattedData = results.map((book) => ({
      id: book.id,
      title: book.get("title"),
      author: book.get("author"),
      average_rating: book.get("average_rating"),
      description: book.get("description"),
      comments: commentsByBook[book.id] || [],
    }));

    console.log("Fetched books:", formattedData);
    Books.collection = formattedData;
    return formattedData;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};