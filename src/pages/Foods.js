import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { getMeals } from '../Redux/Slice/mealsSlice';

const Foods = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    dispatch(getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  }, []);

  const Estados = useSelector((state) => state);
  // const magicNumber = 12;
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

      { Estados.mealsSlice.meals.map((mealCard, index) => (
        <div key={ index }>
          <img src={ mealCard.strMealThumb } alt={ mealCard.strMeal } />
          <h6>{ mealCard.strMeal }</h6>
        </div>
      )) }

    </div>
  );
};

export default Foods;
