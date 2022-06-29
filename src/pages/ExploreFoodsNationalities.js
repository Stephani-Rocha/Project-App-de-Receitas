import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const numberTwelve = 12;

function ExploreFoodsNationalities() {
  const [nationalityArray, setNationalityArray] = useState([]);
  const [foodCards, setFoodCards] = useState([]);
  async function getNationality() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      setNationalityArray(data.meals);
    } catch (error) {
      console.log(error);
    }
  }

  async function AllNationalities() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setFoodCards(data.meals);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNationality();
    AllNationalities();
  }, []);

  async function setFilterNationality({ target }) {
    if (target.value === 'All') {
      AllNationalities();
    } else {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
        const data = await response.json();
        setFoodCards(data.meals); // // renderizar na tela foods
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <Header title="Explore Nationalities" />

      <label htmlFor="nationalityFilter">
        <select
          onChange={ setFilterNationality }
          data-testid="explore-by-nationality-dropdown"
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All

          </option>
          { nationalityArray !== null && nationalityArray !== undefined
            && nationalityArray.map((item, index) => (
              <option
                key={ index }
                value={ item.strArea }
                data-testid={ `${item.strArea}-option` }
              >
                { item.strArea }
              </option>
            ))}
        </select>
      </label>

      <div>
        { foodCards.slice(0, numberTwelve).map((mealCards, index) => (
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
}

export default ExploreFoodsNationalities;
