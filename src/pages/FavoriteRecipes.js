import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const history = useHistory();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteFiltered, setFavoriteFiltered] = useState([]);
  const [showMessage, setShowMessage] = useState({});

  useEffect(() => {
    const getFavoriteRecipes = () => {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

      setFavoriteRecipes(recipes);

      setFavoriteFiltered(recipes);
    };

    getFavoriteRecipes();
  }, []);

  const getAllDone = () => {
    setFavoriteFiltered(favoriteRecipes);
  };

  const getDrinksDone = () => {
    const drinkDone = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
    setFavoriteFiltered(drinkDone);
  };

  const getFoodsDone = () => {
    const drinkDone = favoriteRecipes.filter((recipe) => recipe.type === 'food');
    setFavoriteFiltered(drinkDone);
  };

  const handleShare = (type, id) => {
    const url = `http://${window.location.host}/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setShowMessage((prevState) => ({ ...prevState, [id]: true }));

    const TIME = 3000;

    setTimeout(() => setShowMessage((prevState) => ({ ...prevState, [id]: false })),
      TIME);
  };

  const handleFavorite = (id) => {
    const removedRecipe = favoriteRecipes.filter((e) => e.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedRecipe));

    setFavoriteFiltered(removedRecipe);
    setFavoriteRecipes(removedRecipe);
  };

  const handleClick = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ getAllDone }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ getFoodsDone }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ getDrinksDone }
        >
          Drink
        </button>
      </div>
      {
        favoriteFiltered.map((recipe, index) => (
          <div key={ recipe.id }>
            <button
              type="button"
              onClick={ () => handleClick(recipe.type, recipe.id) }
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
            <button type="button" onClick={ () => handleShare(recipe.type, recipe.id) }>
              { showMessage[recipe.id] && <span>Link copied! </span> }
              <img
                src={ shareIcon }
                alt="share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button type="button" onClick={ () => handleFavorite(recipe.id) }>
              <img
                src={ blackHeartIcon }
                alt="favorite button"
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
