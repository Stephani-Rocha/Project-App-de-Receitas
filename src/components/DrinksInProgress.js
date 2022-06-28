import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DrinksInProgress = () => {
  const params = useParams();
  const [recipeInProgressDrinks, setRecipeInProgressDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [finishedIngredient, setFinishedIngredient] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = params;
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      console.log(data);
      setRecipeInProgressDrinks(data.drinks[0]);
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    if (Object.keys(recipeInProgressDrinks).length > 0) {
      const ingredientArray = Object.entries(recipeInProgressDrinks)
        .filter((ingredient) => ingredient[0].includes('Ingredient') && ingredient[1]) // não entendi essa linha;
        .map((ingredient) => ingredient[1]);

      const measureArray = Object.entries(recipeInProgressDrinks)
        .filter((measure) => measure[0].includes('Measure') && measure[1]) // não entendi essa linha;
        .map((measure) => measure[1]);

      const ingredientsAndMeasure = [];

      ingredientArray.forEach((ingredient, index) => {
        ingredientsAndMeasure.push({ [ingredient]: measureArray[index] });
      });

      setIngredients(ingredientsAndMeasure);
    }
  }, [recipeInProgressDrinks]);

  const handleChangeCheckbox = (ingredient) => {
    setFinishedIngredient((prevFinish) => [...prevFinish, ingredient]);
  };

  // preciso desenvolver a lógica reversa, onde ao clicar no checkbox pela 2ª vez, de um ingrediente finalizado, preciso tirar o risco;

  return (
    <div>
      {Object.keys(recipeInProgressDrinks).length > 0 && (
        <div>
          <img
            src={ recipeInProgressDrinks.strDrinkThumb }
            alt={ recipeInProgressDrinks.strDrink }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{recipeInProgressDrinks.strDrink}</h1>
          <button type="button" data-testid="share-btn">compartilhar</button>
          <button type="button" data-testid="favorite-btn">favoritar</button>
          <p data-testid="recipe-category">
            {recipeInProgressDrinks.strCategory}
            {
              recipeInProgressDrinks.strAlcoholic.length > 0
              && ` (${recipeInProgressDrinks.strAlcoholic})`
            }
          </p>
          <ul>
            {
              ingredients.length
                && ingredients.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      onChange={
                        () => handleChangeCheckbox(ingredient)
                      }
                      name={ index }
                    />
                    {finishedIngredient.includes(ingredient) ? (
                      <s>
                        { `${Object.keys(ingredient)[0]} -
                        ${Object.values(ingredient)[0]}` }
                      </s>
                    ) : (
                      `${Object.keys(ingredient)[0]} -${Object.values(ingredient)[0]}`
                    )}
                  </li>
                ))
            }
          </ul>
          <p data-testid="instructions">{recipeInProgressDrinks.strInstructions}</p>
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

export default DrinksInProgress;
