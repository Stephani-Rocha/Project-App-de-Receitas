import React from 'react';

const SearchBar = () => (
  <div>
    <input type="search" data-testid="search-input" />
    <label htmlFor="ingredient-search">
      Ingredient
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        id="ingredient-search"
        name="type-search"
      />
    </label>
    <label htmlFor="name-search">
      Name
      <input
        type="radio"
        data-testid="name-search-radio"
        id="name-search"
        name="type-search"
      />
    </label>
    <label htmlFor="first-letter-search">
      First letter
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        id="first-letter-search"
        name="type-search"
      />
    </label>
    <button type="button" data-testid="exec-search-btn">
      Search
    </button>
  </div>
);

export default SearchBar;
