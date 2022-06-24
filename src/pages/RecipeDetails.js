import React, { useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const RecipeDetails = () => {
  const recipeTest = [{ name: 'ingredient 1' }];
  const recommendedCardTest = [
    { title: 'test1', img: 'https://picsum.photos/80/80', category: 'test' },
    { title: 'test2', img: 'https://picsum.photos/80/80', category: 'test' },
  ];
  useEffect(() => {}, []);

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
