import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoodsNationalities() {
  const [nationalityArray, setNationalityArray] = useState([]);
  async function getNationality() {
    try {
      // const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
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
  console.log(nationalityArray);
  return (
    <div>
      <Header title="Explore Nationalities" />

      <label htmlFor="nationalityFilter">
        <select
          // value={ nationality }
          onChange={ ({ target }) => setFilterNationality(target.value) }
          data-testid="explore-by-nationality-dropdown"
        >
          { nationalityArray !== null && nationalityArray !== undefined
            && nationalityArray.map((item, index) => (
              <option key={ index }>
                { item }
              </option>
            ))}
        </select>
      </label>

      <Footer />
    </div>
  );
}
export default ExploreFoodsNationalities;
