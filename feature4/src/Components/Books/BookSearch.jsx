// src/Components/Books/BookSearch.jsx
import React from 'react';
import {
  InstantSearch,
  SearchBox,
  Configure,
  connectStateResults,
  Pagination,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import BookList from './BookList';
import './search.css';
import { useFavorites } from '../../Context/FavoritesContext';

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);

export default function BookSearch({
  onAddComment,
  onDeleteComment,
  sortBy,
  allBooks,
  books // Add books prop to receive the full book list
}) {
  const { favorites } = useFavorites();

  // Render results only once the user has typed a query
  const ConditionalResults = connectStateResults(
    ({ searchState, searchResults }) => {
      if (!searchState.query) return null;

      const hits = searchResults?.hits || [];

      // Map Algolia hits back to your full book objects by ID
      const matchedBooks = hits.map(hit => {
        // First try to find by ID
        let existingBook = allBooks.find(book => book.id === hit.objectID);
        
        // If not found by ID, try to find by title
        if (!existingBook) {
          existingBook = allBooks.find(book => 
            book.title.toLowerCase() === hit.title.toLowerCase()
          );
        }
        
        // If we found an existing book, use its data, otherwise create a new book object
        return existingBook || {
          id: hit.objectID, 
          title: hit.title,
          author: hit.author,
          genre: hit.genre,
          description: hit.description,
          average_rating: hit.rating,
          num_ratings: hit.num_ratings,
          subtitle: hit.subtitle,
          num_pages: hit.num_pages,
          year: hit.year,
          comments: [],
        };
      });

      // de-deplicate books by title
      const uniqueBooks = Array.from(
        new Map(matchedBooks.map(book => [book.title.toLowerCase(), book])).values()
      );

      // Sort based on sortBy prop
      const sortedBooks = [...uniqueBooks].sort((a, b) => {
        if (sortBy === "rating") {
          return b.average_rating - a.average_rating;
        } else if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortBy === "year") {
          return b.year - a.year;
        }
        return 0;
      });

      return (
        <>
          <div className="book-list">
            <div className="book-container">
              <BookList
                books={sortedBooks}
                onAddComment={onAddComment}
                onDeleteComment={onDeleteComment}
                showHeader={false} // don't show the header again on the search page
              />
            </div>
          </div>

          {/* Pagination controls */}
          <div className="search-pagination">
            <Pagination showFirst={false} showLast={false} />
          </div>
        </>
      );
    }
  );

  return (
    <div className="search-page">
      <h1>Search Books</h1>

      <InstantSearch
        indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
        searchFunction={helper => {
          if (helper.state.query) {
            helper.search();
          }
        }}
      >
        <Configure hitsPerPage={15} distinct={true}  />

        <div className="search-container">
          <SearchBox />
        </div>

        <ConditionalResults />
      </InstantSearch>
    </div>
  );
}
