import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const getFavoriteRecipes = () => {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

      setFavoriteRecipes(recipes);
      // setDoneFiltered(recipes);
    };

    getFavoriteRecipes();
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          // onClick={ getAllDone }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          // onClick={ getFoodsDone }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          // onClick={ getDrinksDone }
        >
          Drink
        </button>
      </div>
      {
        favoriteRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <button
              type="button"
              // onClick={ () => handleClick(recipe.type, recipe.id) }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                style={ { width: '80px' } }
                data-testid={ `${index}-horizontal-image` }
              />
              <span data-testid={ `${index}-horizontal-top-text` }>
                {
                  recipe.type === 'food'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`
                }
              </span>
              <h5 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h5>
            </button>
            <button type="button">
              {/* { showMessage[recipe.id] && <span>Link copied! </span> } */}
              <img
                src={ shareIcon }
                alt="share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button type="button">
              {/* { showMessage[recipe.id] && <span>Link copied! </span> } */}
              <img
                src={ blackHeartIcon }
                alt="share button"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
        ))
      }
    </div>
  );
};

export default FavoriteRecipes;
