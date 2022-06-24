import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMeals } from '../Redux/Slice/mealsSlice';
import './FoodAndDrink.css';

const Foods = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    dispatch(getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  }, []);

  const meals = useSelector((state) => state.mealsSlice.meals);
  const limitArray = 12;

  return (
    <div>
      <Header title="Foods" />
      <button
        type="button"
        ddata-testid="All-category-filter"
      >
        All

      </button>

      <button
        type="button"
        data-testid="magicString"
      >
        1
      </button>

      <button
        type="button"
        data-testid="magicString"
      >
        2
      </button>

      <button
        type="button"
        data-testid="magicString"
      >
        3
      </button>

      <button
        type="button"
        data-testid="magicString"
      >
        4
      </button>

      <button
        type="button"
        data-testid="magicString"
      >
        5
      </button>

      <div className="card-wrap">
        { meals.slice(0, limitArray).map((mealCard, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ mealCard.strMealThumb }
              alt={ mealCard.strMeal }
              data-testid={ `${index}-card-img` }
              className="img-card"
            />
            <h6 data-testid={ `${index}-card-name` }>{ mealCard.strMeal }</h6>
          </div>
        )) }
      </div>
      <Footer />
    </div>
  );
};

export default Foods;
