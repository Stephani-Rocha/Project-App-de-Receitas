import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = () => {
  // refatorar se possível....
  const getUser = localStorage.getItem('user') || '{}';
  const getEmail = JSON.parse(getUser);

  const history = useHistory();

  const handleClickLogin = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{getEmail.email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => { history.push('/done-recipes'); } }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => { history.push('/favorite-recipes'); } }
      >
        Favorite Recipes
      </button>
      <button type="button" data-testid="profile-logout-btn" onClick={ handleClickLogin }>
        Logout
      </button>
      <Footer />
    </div>
  );
};

export default Profile;
