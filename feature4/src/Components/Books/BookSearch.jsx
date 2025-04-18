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
        id: hit.objectID,          // this is crucial for comments/favorites to work
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


// import React from 'react';
// import {
//   InstantSearch,
//   SearchBox,
//   Configure,
//   connectStateResults,
//   Hits,
// } from 'react-instantsearch-dom';
// import algoliasearch from 'algoliasearch/lite';
// import { useFavorites } from '../../Context/FavoritesContext';
// import BookItem from './BookItem';
// import './search.css';

// const searchClient = algoliasearch(
//   import.meta.env.VITE_ALGOLIA_APP_ID,
//   import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
// );

// // Wrap each hit in your <BookItem>, wiring up favorites/comments
// function BookHit({ hit, onAddComment, onDeleteComment }) {
//   const { favorites, toggleFavorite } = useFavorites();
//   return (
//     <BookItem
//       book={hit}
//       isFavorite={favorites.some(fav => fav.id === hit.objectID)}
//       toggleFavorite={() => toggleFavorite(hit.objectID)}
//       onAddComment={onAddComment}
//       onDeleteComment={onDeleteComment}
//     />
//   );
// }

// // Connect the hit adapter
// const ConnectedBookHit = props => <BookHit {...props} />;

// // Only render once there’s a query
// const ConditionalResults = connectStateResults(({ searchState, onAddComment, onDeleteComment }) =>
//   !searchState.query ? null : (
//     <div className="book-list">
//       <div className="book-container">
//         <Hits
//           hitComponent={hitProps => (
//             <ConnectedBookHit
//               {...hitProps}
//               onAddComment={onAddComment}
//               onDeleteComment={onDeleteComment}
//             />
//           )}
//         />
//       </div>
//     </div>
//   )
// );

// export default function BookSearch({ onAddComment, onDeleteComment }) {
//   return (
//     <div className="search-page">
//       <h1>Search Books</h1>

//       <InstantSearch
//         indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
//         searchClient={searchClient}
//         searchFunction={helper => {
//           if (helper.state.query) helper.search();
//         }}
//       >
//         <Configure hitsPerPage={12} />

//         <div className="search-container">
//           <SearchBox />
//         </div>

//         {/* Use ConditionalResults, not “Results” */}
//         <ConditionalResults
//           onAddComment={onAddComment}
//           onDeleteComment={onDeleteComment}
//         />
//       </InstantSearch>
//     </div>
//   );
// }
