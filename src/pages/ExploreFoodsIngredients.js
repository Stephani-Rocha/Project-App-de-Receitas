import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMeals } from '../Redux/Slice/mealsSlice';

const numberTwelve = 12;

function ExploreFoodsIngredients() {
  const history = useHistory();
  const dispatch = useDispatch();
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

  const handleButton = async (ingredient) => {
    await dispatch(getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`));
    history.push('/foods');
  };

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
                onClick={ () => handleButton(ingredient.strIngredient) }
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
