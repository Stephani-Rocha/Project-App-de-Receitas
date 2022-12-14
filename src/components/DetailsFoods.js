import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const DetailsFoods = ({ recipeData, recommended, ingredients,
  textBtn, isDone }) => {
  const params = useParams();
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const favorited = favoriteRecipes
      .some((favorite) => favorite.id === recipeData.idMeal);

    setIsFavorite(favorited);

    return favoriteRecipes;
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, [recipeData]);

  const handleClick = () => {
    const { id } = params;

    history.push(`/foods/${id}/in-progress`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowMessage(true);

    const TIME = 3000;

    setTimeout(() => setShowMessage(false), TIME);
  };

  const handleFavorite = () => {
    const favoriteRecipes = getFavoriteRecipes();

    if (!isFavorite) {
      const newFavorite = {
        id: recipeData.idMeal,
        type: 'food',
        nationality: recipeData.strArea,
        category: recipeData.strCategory,
        alcoholicOrNot: '',
        name: recipeData.strMeal,
        image: recipeData.strMealThumb,
      };

      if (favoriteRecipes.length > 0) {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...favoriteRecipes, newFavorite]));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
      }
    } else {
      const { id } = params;
      const removedRecipe = favoriteRecipes.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedRecipe));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      {
        Object.keys(recipeData).length > 0 && (
          <div className="details-container">
            <img
              src={ recipeData.strMealThumb }
              alt={ recipeData.strMeal }
              data-testid="recipe-photo"
              className="img-details"
            />
            <div>
              <button type="button" data-testid="share-btn" onClick={ handleShare }>
                { showMessage && <span>Link copied! </span> }
                <img src={ shareIcon } alt="share button" />
              </button>
              <button type="button" onClick={ handleFavorite }>
                {
                  isFavorite ? (
                    <img
                      src={ blackHeartIcon }
                      alt="favorite button"
                      data-testid="favorite-btn"
                    />
                  ) : (
                    <img
                      src={ whiteHeartIcon }
                      alt="favorite button"
                      data-testid="favorite-btn"
                    />)
                }
              </button>
            </div>
            <h1 data-testid="recipe-title">{recipeData.strMeal}</h1>
            <span data-testid="recipe-category">{recipeData.strCategory}</span>
            <ul>
              {
                ingredients.length
                && ingredients.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { `${Object.keys(ingredient)[0]} - ${Object.values(ingredient)[0]}` }
                  </li>
                ))
              }
            </ul>
            <p data-testid="instructions">{recipeData.strInstructions}</p>
            <iframe
              width="330"
              height="186"
              src={ `https://www.youtube.com/embed/${recipeData.strYoutube.split('/watch?v=')[1]}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture"
              allowFullScreen
              data-testid="video"
            />
            <div className="recommended-wrap">
              {
                recommended.map((card, index) => (
                  <div
                    key={ card.id }
                    data-testid={ `${index}-recomendation-card` }
                    className="recommended-card"
                  >
                    <img src={ card.strDrinkThumb } alt={ card.strDrink } />
                    <span>{ card.strCategory }</span>
                    <h5 data-testid={ `${index}-recomendation-title` }>
                      { card.strDrink }
                    </h5>
                  </div>
                ))
              }
            </div>
            {
              !isDone && (
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  className="recipe-btn"
                  onClick={ handleClick }
                >
                  {`${textBtn} Recipe`}
                </button>)
            }
          </div>)
      }
    </div>
  );
};

DetailsFoods.propTypes = {
  recipeData: PropTypes.objectOf(PropTypes.string).isRequired,
  recommended: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  textBtn: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
};

export default DetailsFoods;
