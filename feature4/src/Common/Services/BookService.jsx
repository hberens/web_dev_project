import Parse from "parse";

/* SERVICE FOR PARSE SERVER OPERATIONS */
// Store books globally
export let Books = { collection: [] };

// READ operation - Get all books from Parse class "NewBooks"
export const getAllBooks = async () => {
  try {
    // 1) Page through _all_ NewBooks in batches of 1000
    const batchSize = 1000;
    let skip       = 0;
    let allBooks   = [];

    while (true) {
      const Book = Parse.Object.extend("NewBooks");
      const query = new Parse.Query(Book).limit(batchSize).skip(skip);
      const results = await query.find();
      console.log("Raw Parse book results:", results);
      if (results.length === 0) break;

      // concatenate the results to allBooks
      allBooks = allBooks.concat(results);
      skip += results.length;
    }
    console.log(`Fetched ${allBooks.length} total books from Parse`);

    // 2) Fetch all comments just once- with username and book
    const Comment = Parse.Object.extend("Comment");
    const commentQuery = new Parse.Query(Comment).include("books").include("username");
    const comments = await commentQuery.find();
    console.log("Raw Parse comment results:", comments);

    // 3) Group comments by book ID
    const commentsByBook = {};
    comments.forEach((c) => {
      const bookId = c.get("books")?.id;
      if (!bookId) return; 
      commentsByBook[bookId] = commentsByBook[bookId] || [];
      commentsByBook[bookId].push({
        id:       c.id,
        text:     c.get("comment"),
        username: c.get("username"),
      });
    });

    // 4) Format each Parse object into your plain JS shape
    const formattedData = allBooks.map((book) => ({
      id: book.id,
      title: book.get("title") || "N/A",
      subtitle: book.get("subtitle"),
      author: book.get("authors") || "Unknown",
      genre: book.get("categories")  || "N/A",
      average_rating: book.get("average_rating") || "N/A",
      description: book.get("description") || "N/A",
      year: book.get("published_year") || "Unknown",
      num_pages: book.get("num_pages") || "N/A",
      num_ratings: book.get("ratings_count") || "N/A",
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