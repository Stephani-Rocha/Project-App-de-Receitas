import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMeals } from '../Redux/Slice/mealsSlice';
import { getMealCategory } from '../Redux/Slice/mealCategorySlice';
import { getFiltredMeals } from '../Redux/Slice/mealFiltredSlice';
import './FoodAndDrink.css';

const Foods = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    dispatch(getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    dispatch(getMealCategory('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));
    dispatch(getFiltredMeals('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  }, []);

  const meals = useSelector((state) => state.mealsSlice.meals);
  const limitArray = 12;
  const category = useSelector((state) => state.mealCategorySlice.mealCategory);
  const limitArray2 = 5;
  // const filtredMeals = useSelector((state) => state.mealsFiltredSlice.filtredMeals);

  // const handlerCategory = () => {
  // const handlerCategory = (food) => {
  //   const filtredMeal = meals
  //     .filter((mealfiltred) => mealfiltred.strCategory === food)
  //     .map((foodMap) => (foodMap));
  //   console.log(filtredMeal);
  // };

  return (
    <div>

      <Header title="Foods" />
      <div className="filter-btn-wrap">
        <button
          type="button"
          data-testid="All-category-filter"
        >
          All
        </button>
        { category.slice(0, limitArray2).map((categories, index) => (
          <button
            key={ index }
            type="button"
            value={ categories.strCategory }
            // onClick={ (event) => handlerCategory(event.target.value) }
            data-testid={ `${categories.strCategory}-category-filter` }
          >
            { categories.strCategory }
          </button>
        ))}

      </div>

      <div className="card-wrap">
        {
        // { filtredMeals.length < 1
          // ? filtredMeals.slice(0, limitArray).map((mealCard, index) => (
          // filtredMeals.slice(0, limitArray).map((mealCard, index) => (
          //   <div key={ index } data-testid={ `${index}-recipe-card` }>
          //     <img
          //       className="img-card"
          //       src={ mealCard.strMealThumb }
          //       alt={ mealCard.strMeal }
          //       data-testid={ `${index}-card-img` }
          //     />
          //     <h6 data-testid={ `${index}-card-name` }>{ mealCard.strMeal }</h6>
          //   </div>
          // ))
          // : meals.slice(0, limitArray).map((mealCards, index) => (
          //   <div key={ index } data-testid={ `${index}-recipe-card` }>
          //     <img
          //       className="img-card"
          //       src={ mealCards.strMealThumb }
          //       alt={ mealCards.strMeal }
          //       data-testid={ `${index}-card-img` }
          //     />
          //     <h6 data-testid={ `${index}-card-name` }>{ mealCards.strMeal }</h6>
          //   </div>
          // ))
        }
      </div>
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
