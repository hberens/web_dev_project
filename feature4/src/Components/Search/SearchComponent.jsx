import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

// Initialize the Algolia search client with your environment variables.
const searchClient = algoliasearch(
    import.meta.env.VITE_ALGOLIA_APP_ID,
    import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);
// Define the component to render each search result.
const Hit = ({ hit }) => (
  <div className="hit">
    <h2>{hit.title}</h2>
    <p>{hit.description}</p>
  </div>
);

const SearchComponent = () => {
  return (
    <InstantSearch
      indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
    >
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};

export default SearchComponent;
