import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const numberTwelve = 12;

function ExploreDrinksIngredients() {
  const history = useHistory();
  const [ingredientsDrink, setIngredientsDrink] = useState([]);

  async function getIngredient() {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setIngredientsDrink(data.drinks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getIngredient();
  }, []);

  async function ingredientBtn(ingredient) {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      console.log(data);
      // setArrayDrinks(data.drinks); // colocar na tela principal sem o provider
      history.push('/drinks');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header title="Explore Ingredients" />
      <div>
        {ingredientsDrink !== null
          && ingredientsDrink !== undefined
          && ingredientsDrink.slice(0, numberTwelve).map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-card` }>
              <button
                type="button"
                onClick={ () => ingredientBtn(ingredient.strIngredient1) }
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                  alt="thumb"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>
                  {ingredient.strIngredient1}
                </p>
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
