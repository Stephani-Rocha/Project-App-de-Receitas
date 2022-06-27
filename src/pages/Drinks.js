import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getDrinks } from '../Redux/Slice/drinksSlice';
import { getDrinkCategory } from '../Redux/Slice/drinkCategorySlice';
import './FoodAndDrink.css';

const Drinks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    dispatch(getDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    dispatch(getDrinkCategory('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));
  }, []);

  const drinks = useSelector((state) => state.drinksSlice.drinks);
  const limitArray = 12;

  const estado = useSelector((state) => state);
  const category = useSelector((state) => state.drinkCategorySlice.drinkCategory);
  console.log(estado);
  const limitArray2 = 5;

  return (
    <div>
      <Header title="Drinks" />
      <div className="filter-btn-wrap">
        <button
          type="button"
          ddata-testid="All-category-filter"
        >
          All
        </button>
        { category.slice(0, limitArray2).map((categories, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${categories.strCategory}-category-filter` }
          >
            { categories.strCategory }
          </button>
        ))}
      </div>
      <button
        type="button"
        data-testid="All-category-filter"
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
        { drinks.slice(0, limitArray).map((drinkCard, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drinkCard.strDrinkThumb }
              alt={ drinkCard.strDrink }
              data-testid={ `${index}-card-img` }
              className="img-card"
            />
            <h6 data-testid={ `${index}-card-name` }>{ drinkCard.strDrink }</h6>
          </div>
        )) }
      </div>
      <Footer />
    </div>
  );
};
export default Drinks;
