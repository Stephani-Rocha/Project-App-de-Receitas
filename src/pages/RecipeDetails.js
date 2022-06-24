import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const RecipeDetails = () => {
  const params = useParams();
  const location = useLocation();
  const [, setRecipeData] = useState([]);

  const recipeTest = [{ name: 'ingredient 1' }];
  const recommendedCardTest = [
    { title: 'test1', img: 'https://picsum.photos/80/80', category: 'test' },
    { title: 'test2', img: 'https://picsum.photos/80/80', category: 'test' },
  ];

  useEffect(() => {
    const { pathname } = location;
    const endpointType = pathname.split('/')[1];
    const { id } = params;

    const requestRecipe = async () => {
      const endpoints = {
        foods: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        drinks: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      };

      const response = await fetch(endpoints[endpointType]);
      const data = await response.json();
      setRecipeData(data[endpointType]);
    };

    requestRecipe();
  }, [params, location]);

  return (
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
      <h1 data-testid="recipe-title">Title</h1>
      <span data-testid="recipe-category">Category</span>
      <ul>
        {
          recipeTest.map((ingredients, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { ingredients.name }
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">Instructions</p>
      <iframe
        width="560"
        height="315"
        src=""
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
    </div>
  );
};

export default RecipeDetails;
