import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getDrinks } from '../Redux/Slice/drinksSlice';
import { getMeals } from '../Redux/Slice/mealsSlice';

const SearchBar = () => {
  const [searchType, setSearchType] = useState('');
  const [search, setSearch] = useState('');
  const [urlApi, setUrlApi] = useState('meal');
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/drinks') {
      setUrlApi('cocktail');
    }
  }, [location]);

  const handleSearch = () => {
    if (searchType === 'firstLetter' && search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }

    const endpoints = {
      ingredient: `https://www.the${urlApi}db.com/api/json/v1/1/filter.php?i=${search}`,
      name: `https://www.the${urlApi}db.com/api/json/v1/1/search.php?s=${search}`,
      firstLetter: `https://www.the${urlApi}db.com/api/json/v1/1/search.php?f=${search}`,
    };

    if (location.pathname === '/foods') {
      dispatch(getMeals(endpoints[searchType]));
    } else {
      dispatch(getDrinks(endpoints[searchType]));
    }
  };

  return (
    <div>
      <input
        type="search"
        data-testid="search-input"
        placeholder="Search..."
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="type-search"
          onChange={ ({ target }) => setSearchType(target.id) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="type-search"
          onChange={ ({ target }) => setSearchType(target.id) }
        />
      </label>
      <label htmlFor="firstLetter">
        First letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="firstLetter"
          name="type-search"
          onChange={ ({ target }) => setSearchType(target.id) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
