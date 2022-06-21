import React from 'react';

const Header = () => (
  <div>
    <h1 data-testid="page-title">Title</h1>
    <button type="button" data-testid="profile-top-btn">
      Profile
    </button>
    <button type="button" data-testid="search-top-btn">
      Search
    </button>
  </div>
);

export default Header;
