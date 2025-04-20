import Parse from "parse";

/* service for favoirites in parse */

export const getUserFavorites = async (userId) => {
  try {
    const Favorites = Parse.Object.extend("Favorites"); // access the Favorites class in back4app
    const query = new Parse.Query(Favorites);

    const User = Parse.User;
    const userPointer = User.createWithoutData(userId);

    query.equalTo("user", userPointer);
    query.include("book"); // include book data
    const results = await query.find();
    // get the info about the fav books
    const favorites = results.map((fav) => {
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

    return favorites;
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return [];
  }
};
// function to addFavorite to the app
export const addFavorite = async (userId, bookId) => {
  try {
    const Favorites = Parse.Object.extend("Favorites");
    const favorite = new Favorites();

    const User = Parse.User;
    const userPointer = User.createWithoutData(userId);

    const Book = Parse.Object.extend("NewBooks");
    const bookPointer = Book.createWithoutData(bookId);

    favorite.set("user", userPointer);
    favorite.set("book", bookPointer);

    await favorite.save();
    console.log("Favorite added successfully");
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};
// fucntion to remove a favorite from the application
export const removeFavorite = async (userId, bookId) => {
  try {
    const Favorites = Parse.Object.extend("Favorites");
    const query = new Parse.Query(Favorites);

    const User = Parse.User;
    const userPointer = User.createWithoutData(userId);
    const Book = Parse.Object.extend("NewBooks");
    const bookPointer = Book.createWithoutData(bookId);

    query.equalTo("user", userPointer);
    query.equalTo("book", bookPointer);

    const results = await query.find();

    for (const fav of results) {
      await fav.destroy(); // i saw this on stack overflow lol idk
    }

    console.log("Favorite removed successfully");
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};
