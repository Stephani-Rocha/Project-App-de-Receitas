import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreFoods = () => (
  <div>
    <Header title="Explore Foods" />
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
    </div>
    <Footer />
  </div>
);

export default ExploreFoods;
