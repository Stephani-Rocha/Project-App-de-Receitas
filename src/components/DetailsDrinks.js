import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const DetailsDrinks = ({ recipeData, recommended, ingredients }) => {
  const params = useParams();
  const history = useHistory();
  const [textBtn, setTextBtn] = useState('Start');
  const [isDone, setIsDone] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const { id } = params;
    const getDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [{}];
    const getProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {} };

    getDoneRecipe.forEach((done) => {
      if (done.id === recipeData.idDrink) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }
    });

    if (id in getProgressRecipe.cocktails) {
      setTextBtn('Continue');
    } else {
      setTextBtn('Start');
    }
  }, [recipeData, params]);

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
              <button type="button" data-testid="favorite-btn">
                <img src={ whiteHeartIcon } alt="favorite button" />
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
};

export default DetailsDrinks;
