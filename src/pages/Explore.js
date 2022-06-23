import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explore = () => {
  const history = useHistory();
  return (
    <div>
      <Header title="Explore" />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => (history.push('/explore-foods')) }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => (history.push('/explore-drinks')) }
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
};

export default Explore;
