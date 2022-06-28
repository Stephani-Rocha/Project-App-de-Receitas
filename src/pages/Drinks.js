import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getDrinks } from '../Redux/Slice/drinksSlice';
import { getDrinkCategory } from '../Redux/Slice/drinkCategorySlice';
import { getFiltredDrinks } from '../Redux/Slice/drinksFiltredSlice';
import './FoodAndDrink.css';

const Drinks = () => {
  const dispatch = useDispatch();
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [allCategory, setAllCategory] = useState(true);
  const [category2, setCategory2] = useState([]);

  useEffect(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    dispatch(getDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    dispatch(getDrinkCategory('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));
  }, [dispatch]);

  const drinks = useSelector((state) => state.drinksSlice.drinks);
  const limitArray = 12;
  const category = useSelector((state) => state.drinkCategorySlice.drinkCategory);
  const limitArray2 = 5;
  const filtredDrinks = useSelector((state) => state.drinksFiltredSlice.drinks);

  const handlerAllCategory = () => {
    setDrinkCategory(drinks);
    setCategory2('');
  };

  const handlerCategory = (drink) => {
    if (allCategory && category2 !== drink) {
      dispatch(getFiltredDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`));
      setAllCategory(false);
      setCategory2(drink);
    } if (!allCategory && category2 !== drink) {
      dispatch(getFiltredDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`));
      setCategory2('');
    } else {
      setDrinkCategory(drinks);
      setAllCategory(false);
      setCategory2('');
    }
  };

  useEffect(() => {
    setDrinkCategory(filtredDrinks);
  }, [filtredDrinks]);

  return (
    <div>

      <Header title="Drinks" />
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

        { drinkCategory.length >= 1
          ? drinkCategory.slice(0, limitArray).map((drinkCard, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                className="img-card"
                src={ drinkCard.strDrinkThumb }
                alt={ drinkCard.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h6 data-testid={ `${index}-card-name` }>{drinkCard.strDrink}</h6>
            </div>
          ))
          : drinks.slice(0, limitArray).map((drinkCards, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                className="img-card"
                src={ drinkCards.strDrinkThumb }
                alt={ drinkCards.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h6 data-testid={ `${index}-card-name` }>{drinkCards.strDrink}</h6>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};
export default Drinks;
