import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FoodsInProgress = () => {
  const params = useParams();
  const [recipeInProgress, setRecipesInProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = params;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipesInProgress(data.meals[0]);
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    if (Object.keys(recipeInProgress).length > 0) {
      const ingredientArray = Object.entries(recipeInProgress)
        .filter((ingredient) => ingredient[0].includes('Ingredient') && ingredient[1]) // não entendi essa linha;
        .map((ingredient) => ingredient[1]);

      const measureArray = Object.entries(recipeInProgress)
        .filter((measure) => measure[0].includes('Measure') && measure[1]) // não entendi essa linha;
        .map((measure) => measure[1]);

      const ingredientsAndMeasure = [];

      ingredientArray.forEach((ingredient, index) => {
        ingredientsAndMeasure.push({ [ingredient]: measureArray[index] });
      });

      setIngredients(ingredientsAndMeasure);
    }
  }, [recipeInProgress]);

  return (
    <div>
      {Object.keys(recipeInProgress).length > 0 && (
        <div>
          <img
            src={ recipeInProgress.strMealThumb }
            alt={ recipeInProgress.strMeal }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{recipeInProgress.strMeal}</h1>
          <button type="button" data-testid="share-btn">compartilhar</button>
          <button type="button" data-testid="favorite-btn">favoritar</button>
          <p data-testid="recipe-category">{recipeInProgress.strCategory}</p>
          <ul>
            {
              ingredients.length
                && ingredients.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input type="checkbox" />
                    { `${Object.keys(ingredient)[0]} - ${Object.values(ingredient)[0]}` }
                  </li>
                ))
            }
          </ul>
          <p data-testid="instructions">{recipeInProgress.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            finalizar a receita
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodsInProgress;
