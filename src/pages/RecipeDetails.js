import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const RecipeDetails = () => {
  const params = useParams();
  const location = useLocation();
  const [recipeData, setRecipeData] = useState({});

  const recipeTest = [{ name: 'ingredient 1' }];
  const recommendedCardTest = [
    { title: 'test1', img: 'https://picsum.photos/80/80', category: 'test' },
    { title: 'test2', img: 'https://picsum.photos/80/80', category: 'test' },
  ];

  useEffect(() => {
    console.log(recipeData);
    if (Object.keys(recipeData).length > 0) {
      const ingredients = Object.entries(recipeData)
        .filter((e) => e[0].includes('Ingredient') && e[1])
        .map((e) => e[1]);
      recipeData.ingredients = ingredients;
    }
  }, [recipeData]);

  useEffect(() => {
    const { pathname } = location;
    const endpointType = pathname.split('/')[1];
    console.log(endpointType);
    const { id } = params;

    const requestRecipe = async () => {
      const endpoints = {
        foods: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        drinks: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      };

      const response = await fetch(endpoints[endpointType]);
      const data = await response.json();

      if (endpointType === 'foods') {
        setRecipeData(data.meals[0]);
      } else {
        setRecipeData(data.drinks[0]);
      }
    };

    requestRecipe();
  }, [params, location]);

  return (
    <div>
      {
        recipeData && (
          <div>
            <img src="" alt="" data-testid="recipe-photo" />
            <div>
              <button type="button" data-testid="share-btn">
                <img src={ shareIcon } alt="share button" />
              </button>
              <button type="button" data-testid="favorite-btn">
                <img src={ whiteHeartIcon } alt="favorite button" />
              </button>
            </div>
            <h1 data-testid="recipe-title">{recipeData.strMeal}</h1>
            <span data-testid="recipe-category">{recipeData.category}</span>
            <ul>
              {
                recipeTest.ingredients
                && recipeTest.ingredients.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { ingredient }
                  </li>
                ))
              }
            </ul>
            <p data-testid="instructions">{recipeData.strInstructions}</p>
            <iframe
              width="560"
              height="315"
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
            {
              recommendedCardTest.map((card, index) => (
                <div key={ index } data-testid={ `${index}-recomendation-card` }>
                  <img src={ card.img } alt={ card.title } />
                  <span>{ card.category }</span>
                  <h3>{ card.title }</h3>
                </div>
              ))
            }
            <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
          </div>)
      }
    </div>
  );
};

export default RecipeDetails;
