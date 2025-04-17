import React from 'react';
import {
  InstantSearch,
  SearchBox,
  Configure,
  connectStateResults,
  Hits,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { useFavorites } from '../../Context/FavoritesContext';
import BookItem from './BookItem';
import './search.css';

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);

// Wrap each hit in your <BookItem>, wiring up favorites/comments
function BookHit({ hit, onAddComment, onDeleteComment }) {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <BookItem
      book={hit}
      isFavorite={favorites.some(fav => fav.id === hit.objectID)}
      toggleFavorite={() => toggleFavorite(hit.objectID)}
      onAddComment={onAddComment}
      onDeleteComment={onDeleteComment}
    />
  );
}

// Connect the hit adapter
const ConnectedBookHit = props => <BookHit {...props} />;

// Only render once there’s a query
const ConditionalResults = connectStateResults(({ searchState, onAddComment, onDeleteComment }) =>
  !searchState.query ? null : (
    <div className="book-list">
      <div className="book-container">
        <Hits
          hitComponent={hitProps => (
            <ConnectedBookHit
              {...hitProps}
              onAddComment={onAddComment}
              onDeleteComment={onDeleteComment}
            />
          )}
        />
      </div>
    </div>
  )
);

export default function BookSearch({ onAddComment, onDeleteComment }) {
  return (
    <div className="search-page">
      <h1>Search Books</h1>

      <InstantSearch
        indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
        searchFunction={helper => {
          if (helper.state.query) helper.search();
        }}
      >
        <Configure hitsPerPage={12} />

        <div className="search-container">
          <SearchBox />
        </div>

        {/* Use ConditionalResults, not “Results” */}
        <ConditionalResults
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
        />
      </InstantSearch>
    </div>
  );
}


// // BookSearch.jsx
// import React from 'react';
// //import { InstantSearch, SearchBox, Hits, Highlight, Pagination, Configure } from 'react-instantsearch-dom';
// import {
//   InstantSearch,
//   SearchBox,
//   Hits,
//   Highlight,
//   Pagination,
//   Configure,
//   RefinementList,
//   RangeInput,        // for numeric ranges
//   connectStateResults,
//   //SearchableRefinementList, // for searchable facets
// } from 'react-instantsearch-dom';
// import algoliasearch from 'algoliasearch/lite';
// import BookItem from "./BookItem";   
// import BookList from './BookList';

// const searchClient = algoliasearch(
//   import.meta.env.VITE_ALGOLIA_APP_ID,
//   import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
// );

// const BookHitAdapter = ({ hit }) => (
//   <BookItem
//     book={hit}
//     // pass through any of your comment/favorite toggles here if you have them in context:
//     // commentData={…}
//     // onInputChange={…}
//     // onSubmitComment={…}
//     // onDeleteComment={…}
//     // isFavorite={…}
//     // toggleFavorite={…}
//     // showMoreDetails={…}
//     // toggleDetails={…}
//     // showComments={…}
//     // showDetailsButton={…}
//   />
// );

// // only render the results once the user has typed 
// const ConditionalResults = connectStateResults(({ searchState }) =>
//   searchState.query ? (
//     <div className="books-grid">      {/* reuse your grid/list wrapper */}
//       <Hits hitComponent={BookHitAdapter} />
//       <Pagination />
//     </div>
//   ) : null
// );


// const BookSearch = () => {
//   return (
//     <div className="book-search" style={{ padding: "1rem" }}>
//       <h1>Search Books</h1>
//       <InstantSearch
//         indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
//         searchClient={searchClient}
//       >
//         <Configure hitsPerPage={10} />
//         <SearchBox />
//         <ConditionalResults />
//       </InstantSearch>
//     </div>
//   );
// };

// export default BookSearch;
