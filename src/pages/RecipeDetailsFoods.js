import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeDetails.css';

const RecipeDetailsFoods = () => {
  const params = useParams();
  const [recipeData, setRecipeData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [textBtn, setTextBtn] = useState('Start');
  const [isDone, setIsDone] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (Object.keys(recipeData).length > 0) {
      const ingredientArray = Object.entries(recipeData)
        .filter((ingredient) => ingredient[0].includes('Ingredient') && ingredient[1])
        .map((ingredient) => ingredient[1]);

      const measureArray = Object.entries(recipeData)
        .filter((measure) => measure[0].includes('Measure') && measure[1])
        .map((measure) => measure[1]);

      const ingredientsAndMeasure = [];

      ingredientArray.forEach((ingredient, index) => {
        ingredientsAndMeasure.push({ [ingredient]: measureArray[index] });
      });

      setIngredients(ingredientsAndMeasure);
    }
  }, [recipeData]);

  useEffect(() => {
    const requestDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const limit = 6;
      setRecommended(data.drinks.slice(0, limit));
    };

    requestDrinks();
  }, []);

  useEffect(() => {
    const { id } = params;
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [{}];
    const getProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { meals: {} };

    getDone.forEach((done) => {
      if (done.id === recipeData.idMeal) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }
    });

    if (id in getProgressRecipe.meals) {
      setTextBtn('Continue');
    } else {
      setTextBtn('Start');
    }
  }, [recipeData, params]);

  useEffect(() => {
    const { id } = params;

    const requestRecipe = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();

      setRecipeData(data.meals[0]);
    };

    requestRecipe();
  }, [params]);

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
              <button type="button" data-testid="favorite-btn">
                <img src={ whiteHeartIcon } alt="favorite button" />
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
                >
                  {`${textBtn} Recipe`}
                </button>)
            }
          </div>)
      }
    </div>
  );
};

export default RecipeDetailsFoods;
