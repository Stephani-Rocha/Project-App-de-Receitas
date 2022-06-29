import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const DetailsDrinks = ({ recipeData, recommended, ingredients,
  textBtn, isDone }) => {
  const params = useParams();
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const favorited = favoriteRecipes
      .some((favorite) => favorite.id === recipeData.idDrink);

    setIsFavorite(favorited);

    return favoriteRecipes;
  };

  useEffect(() => {
    getFavoriteRecipes();
    console.log(recipeData);
  }, [recipeData]);

  const handleClick = () => {
    const { id } = params;

    history.push(`/drinks/${id}/in-progress`);
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
        id: recipeData.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeData.strCategory,
        alcoholicOrNot: recipeData.strAlcoholic,
        name: recipeData.strDrink,
        image: recipeData.strDrinkThumb,
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
              src={ recipeData.strDrinkThumb }
              alt={ recipeData.strDrink }
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
            <h1 data-testid="recipe-title">{recipeData.strDrink}</h1>
            <span data-testid="recipe-category">
              { recipeData.strCategory }
              { recipeData.strAlcoholic.length > 0 && ` (${recipeData.strAlcoholic})` }
            </span>
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
              // src={ `https://www.youtube.com/embed/${recipeData.strYoutube.split('/watch?v=')[1]}` }
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
                    key={ index }
                    data-testid={ `${index}-recomendation-card` }
                    className="recommended-card"
                  >
                    <img src={ card.strMealThumb } alt={ card.strMeal } />
                    <span>{ card.strCategory }</span>
                    <h5 data-testid={ `${index}-recomendation-title` }>
                      { card.strMeal }
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

DetailsDrinks.propTypes = {
  recipeData: PropTypes.objectOf(PropTypes.string).isRequired,
  recommended: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  textBtn: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
};

export default DetailsDrinks;
