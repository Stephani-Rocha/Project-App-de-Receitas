import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const Header = ({ title }) => {
  const [renderButtons, setRenderButtons] = useState(true);
  const [renderInputSearch, setRenderInputSearch] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname.includes('/explore')
    || location.pathname.includes('/profile')
    || location.pathname.includes('/done-recipes')
    || location.pathname.includes('/favorite-recipes')) {
      setRenderButtons(false);
    }
    if (location.pathname.includes('/explore/foods/nationalities')) {
      setRenderButtons(true);
    }
  }, [location]);

  const handleClickButtonSearch = () => {
    if (renderInputSearch === false) {
      setRenderInputSearch(true);
    } else {
      setRenderInputSearch(false);
    }
  };

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button type="button" onClick={ () => (history.push('/profile')) }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      </button>
      { renderButtons && (
        <button
          type="button"
          onClick={ handleClickButtonSearch }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
          />
        </button>
      )}
      { renderInputSearch && (
        <SearchBar />
      )}
    </div>
  );
};

Header.propTypes = {
  title: Proptypes.string.isRequired,
};

export default Header;
