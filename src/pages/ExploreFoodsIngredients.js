import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const numberTwelve = 12;

function ExploreFoodsIngredients() {
  // const history = useHistory();
  const [ingredientsFood, setIngredientsFood] = useState([]);

  async function getIngredient() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setIngredientsFood(data.meals);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getIngredient();
  }, []);

  async function ingredientBtn(ingredient) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      setIngredientsFood(data.meals);
    } catch (error) {
      console.log(error);
    }
  }

  // history.push('/foods');

  return (
    <>
      <Header title="Explore Ingredients" />
      <div>
        {ingredientsFood !== null
          && ingredientsFood !== undefined
          && ingredientsFood.slice(0, numberTwelve).map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-card` }>
              <button
                type="button"
                onClick={ () => ingredientBtn(ingredient.strIngredient) }
              >
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                  alt="thumb"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>
                  {ingredient.strIngredient}
                </p>
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
