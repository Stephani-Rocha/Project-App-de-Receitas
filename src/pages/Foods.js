import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMeals } from '../Redux/Slice/mealsSlice';
import { getMealCategory } from '../Redux/Slice/mealCategorySlice';
import { getFiltredMeals } from '../Redux/Slice/mealFiltredSlice';
import './FoodAndDrink.css';

const Foods = () => {
  const dispatch = useDispatch();
  const [mealCategory, setMealCategory] = useState([]);
  const [allCategory, setAllCategory] = useState(true);
  const [category2, setCategory2] = useState([]);

  const meals = useSelector((state) => state.mealsSlice.meals);
  const limitArray = 12;
  const category = useSelector((state) => state.mealCategorySlice.mealCategory);
  const limitArray2 = 5;
  const filtredMeals = useSelector((state) => state.mealFiltredSlice.meals);

  useEffect(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    if (meals.length === 0) {
      dispatch(getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    }
    dispatch(getMealCategory('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));
  }, [dispatch]);

  const handlerAllCategory = () => {
    setMealCategory(meals);
    setCategory2('');
  };

  const handlerCategory = (food) => {
    if (allCategory && category2 !== food) {
      dispatch(getFiltredMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`));
      setAllCategory(false);
      setCategory2(food);
    } if (!allCategory && category2 !== food) {
      dispatch(getFiltredMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`));
      setCategory2('');
    } if (!allCategory && category2 === food) {
      setMealCategory(meals);
      setAllCategory(true);
      setCategory2('');
    }
  };

  useEffect(() => {
    setMealCategory(filtredMeals);
  }, [filtredMeals]);

  // const handleClick = () => {
  //   // const idMeal = filtredMeals.filre();
  //   history.push('/foods/{idMeal}');
  // };

  return (
    <div>
      <Header title="Foods" />
      <div className="filter-btn-wrap">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handlerAllCategory }
        >
          All
        </button>
        {category.slice(0, limitArray2).map((categories, index) => (
          <button
            key={ index }
            type="button"
            value={ categories.strCategory }
            onClick={ (event) => handlerCategory(event.target.value) }
            data-testid={ `${categories.strCategory}-category-filter` }
          >
            {categories.strCategory}
          </button>
        ))}

      </div>

      <div className="card-wrap">

        { mealCategory.length >= 1
          ? mealCategory.slice(0, limitArray).map((mealCard, index) => (
            <Link
              key={ index }
              data-testid={ `${index}-recipe-card` }
              to={ `/foods/${mealCard.idMeal}` }
            >
              <img
                className="img-card"
                src={ mealCard.strMealThumb }
                alt={ mealCard.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h6 data-testid={ `${index}-card-name` }>{mealCard.strMeal}</h6>
            </Link>
          ))
          : meals.slice(0, limitArray).map((mealCards, index) => (
            <Link
              key={ index }
              data-testid={ `${index}-recipe-card` }
              to={ `/foods/${mealCards.idMeal}` }
            >
              <img
                className="img-card"
                src={ mealCards.strMealThumb }
                alt={ mealCards.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h6 data-testid={ `${index}-card-name` }>{mealCards.strMeal}</h6>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Foods;
