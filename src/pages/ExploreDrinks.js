import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreDrinks = () => (
  <div>
    <Header title="Explore Drinks" />
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
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

export default ExploreDrinks;
