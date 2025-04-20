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

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);

export default function BookSearch({
  onAddComment,
  onDeleteComment,
}) {

  // Render results only once the user has typed a query
  const ConditionalResults = connectStateResults(
    ({ searchState, searchResults }) => {
      if (!searchState.query) return null;

      const hits = searchResults?.hits || [];

      // Map Algolia hits back to your full book objects by ID
      const matchedBooks = hits.map(hit => ({
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
      }));

      // de-deplicate books 
      const uniqueBooks = Array.from(
        new Map(matchedBooks.map(book => [book.title, book])).values()
      );



      return (
        <>
          <div className="book-list">
            <div className="book-container">
              <BookList
                books={uniqueBooks}
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
