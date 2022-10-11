import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './DrinksProgress.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const setLocalStorage = () => {
  const cocktails = {};
  const meals = {};
  localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
};

const FoodsInProgress = () => {
  const params = useParams();
  const history = useHistory();
  const [recipeInProgress, setRecipesInProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [finishedIngredient, setFinishedIngredient] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [favorite, setFavorite] = useState(false);

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
        .filter((ingredient) => ingredient[0].includes('Ingredient') && ingredient[1])
        .map((ingredient) => ingredient[1]);

      const measureArray = Object.entries(recipeInProgress)
        .filter((measure) => measure[0].includes('Measure') && measure[1])
        .map((measure) => measure[1]);

      const ingredientsAndMeasure = [];

      ingredientArray.forEach((ingredient, index) => {
        ingredientsAndMeasure.push({ [ingredient]: measureArray[index] });
      });

      setIngredients(ingredientsAndMeasure);
    }
  }, [recipeInProgress]);

  const handleChangeCheckbox = ({ target }, index) => {
    const { name } = target;
    const { id } = params;
    setFinishedIngredient((prevState) => ({ ...prevState, [name]: !prevState[name] }));

    const getStorage2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getStorage2.meals[id].includes(index)) {
      const filterStorage = getStorage2.meals[id]
        .filter((ingredient) => ingredient !== index);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getStorage2, meals: { [id]: filterStorage } }));
    } else {
      const newSetStorage2 = {
        ...getStorage2,
        meals: {
          [id]: [...getStorage2.meals[id], index],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newSetStorage2));
    }
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

  useEffect(() => {
    const { id } = params;
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      setLocalStorage();
    } else {
      const getStorage3 = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const objeto = getStorage3.meals[id]
        .map((idIngredient) => ({ [idIngredient]: true }));
      setFinishedIngredient(objeto);
    }
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const saveRecipes = Object.keys(meals).some((idRecipe) => idRecipe === id);
    if (!saveRecipes) {
      const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newSetStorage = {
        ...getStorage,
        meals: {
          ...getStorage.meals,
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newSetStorage));
    }
  }, []);

  const handleButtonFavorite = () => {
    if (!favorite) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };

  return (
    <div>
      {Object.keys(recipeInProgress).length > 0 && (
        <div>
          <img
            src={ recipeInProgress.strMealThumb }
            alt={ recipeInProgress.strMeal }
            data-testid="recipe-photo"
            className="image"
          />
          <h1 data-testid="recipe-title">{recipeInProgress.strMeal}</h1>
          <button type="button" data-testid="share-btn">compartilhar</button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ handleButtonFavorite }
          >
            <img alt="favoritar" src={ favorite ? blackHeartIcon : whiteHeartIcon } />
          </button>
          <p data-testid="recipe-category">{recipeInProgress.strCategory}</p>
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
                      onChange={ (event) => handleChangeCheckbox(event, index) }
                      name={ index }
                      checked={ finishedIngredient[index] }
                    />
                    {`${Object.keys(ingredient)[0]} -${Object.values(ingredient)[0]}`}
                    )
                  </li>
                ))
            }
          </ul>
          <p data-testid="instructions">{recipeInProgress.strInstructions}</p>
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

export default FoodsInProgress;
