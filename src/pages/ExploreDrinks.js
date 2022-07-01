import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreDrinks = () => {
  const history = useHistory();

  const randomRecipe = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    history.push(`/drinks/${data.drinks[0].idDrink}`);
  };

  return (
    <div>
      <Header title="Explore Drinks" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => (history.push('/explore/drinks/ingredients')) }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ randomRecipe }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default ExploreDrinks;
