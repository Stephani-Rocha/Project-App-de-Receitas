import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './DrinksProgress.css';

const DrinksInProgress = () => {
  const params = useParams();
  const history = useHistory();
  const [recipeInProgressDrinks, setRecipeInProgressDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [finishedIngredient, setFinishedIngredient] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(true);

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
        .filter((ingredient) => ingredient[0].includes('Ingredient') && ingredient[1])
        .map((ingredient) => ingredient[1]);

      const measureArray = Object.entries(recipeInProgressDrinks)
        .filter((measure) => measure[0].includes('Measure') && measure[1])
        .map((measure) => measure[1]);

      const ingredientsAndMeasure = [];

      ingredientArray.forEach((ingredient, index) => {
        ingredientsAndMeasure.push({ [ingredient]: measureArray[index] });
      });

      setIngredients(ingredientsAndMeasure);
    }
  }, [recipeInProgressDrinks]);

  const handleChangeCheckbox = ({ target }) => {
    const { name } = target;
    setFinishedIngredient((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };

  useEffect(() => {
    const arrayFinishedIngredient = Object.values(finishedIngredient);
    if (arrayFinishedIngredient.length === ingredients.length) {
      if (arrayFinishedIngredient.every((checked) => checked)) {
        setDisabledBtn(false);
      } else {
        setDisabledBtn(true);
      }
    } else {
      setDisabledBtn(true);
    }
  }, [finishedIngredient, ingredients]);

  return (
    <div>
      {Object.keys(recipeInProgressDrinks).length > 0 && (
        <div>
          <img
            src={ recipeInProgressDrinks.strDrinkThumb }
            alt={ recipeInProgressDrinks.strDrink }
            data-testid="recipe-photo"
            className="image"
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
                    className={ finishedIngredient[index]
                      ? 'fineshed-ingredient' : '' }
                  >
                    <input
                      type="checkbox"
                      onChange={ handleChangeCheckbox }
                      name={ index }
                      checked={ finishedIngredient[index] }
                    />
                    {`${Object.keys(ingredient)[0]} -${Object.values(ingredient)[0]}`}
                    )
                  </li>
                ))
            }
          </ul>
          <p data-testid="instructions">{recipeInProgressDrinks.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ disabledBtn }
            onClick={ () => history.push('/done-recipes') }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default DrinksInProgress;
