// BookSearch.jsx
import React from 'react';
//import { InstantSearch, SearchBox, Hits, Highlight, Pagination, Configure } from 'react-instantsearch-dom';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Pagination,
  Configure,
  RefinementList,
  RangeInput,        // for numeric ranges
  //SearchableRefinementList, // for searchable facets
} from 'react-instantsearch-dom';

import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);

const BookHit = ({ hit }) => (
  <div className="book-item" style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem", paddingBottom: "1rem" }}>
    <h2>
      <Highlight attribute="title" hit={hit} />
    </h2>
    <p>
      <strong>Author:</strong> <Highlight attribute="author" hit={hit} />
    </p>
    <p>
      <strong>Genre:</strong> {hit.genre}
    </p>
    <p>{hit.description}</p>
  </div>
  
);

const BookSearch = () => (
  <div className="book-search" style={{ padding: "1rem" }}>
    <h1>Search Books</h1>
    <InstantSearch
      indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME || "list_books"}
      searchClient={searchClient}
      // ← this prevents the initial empty‐query from firing
      searchFunction={(helper) => {
        if (!helper.state.query) {
          return;
        }
        helper.search();
      }}
    >
      {/* Optionally configure some search parameters */}
      <Configure hitsPerPage={30} />
      <SearchBox />
      <Hits hitComponent={BookHit} />
    </InstantSearch>
  </div>
);

export default BookSearch;
