import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoodsNationalities() {
  const [nationalityArray, setNationalityArray] = useState([]);
  async function getNationality() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      setNationalityArray(data.meals);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNationality();
  }, []);

  async function setFilterNationality({ target }) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
      const data = await response.json();
      // setFoodCards(data.meals); // // renderizar na tela foods
      console.log(data);
    } catch (error) {
      console.log(error);
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

      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
