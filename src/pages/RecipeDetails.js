import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipeDetailsFoods from '../components/DetailsFoods';
import RecipeDetailsDrinks from '../components/DetailsDrinks';
import './RecipeDetails.css';

const getDoneRecipes = (recipeData, id) => {
  const getDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [{}];
  return getDoneRecipe.some((done) => done.id === recipeData[id]);
};

const getProgressRecipes = (params, key) => {
  const { id } = params;
  const getProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { [key]: {} };
  if (id in getProgressRecipe[key]) {
    return 'Continue';
  }

  return 'Start';
};

const RecipeDetails = () => {
  const location = useLocation();
  const params = useParams();
  const [apiType, setApiType] = useState({
    recipe: 'meal',
    recommended: 'cocktail',
    objectTypeRecipe: 'meals',
    objectTypeRecommended: 'drinks',
    favorite: 'idMeal',
    progress: 'meals',
  });
  const [recipeData, setRecipeData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [textBtn, setTextBtn] = useState('Start');
  const [isDone, setIsDone] = useState(false);
  const isMounted = useRef(false);

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
    setIsDone(getDoneRecipes(recipeData, apiType.favorite));
  }, [apiType, recipeData]);

  useEffect(() => {
    const { pathname } = location;

    if (pathname.includes('/drinks')) {
      setApiType({
        recipe: 'cocktail',
        recommended: 'meal',
        objectTypeRecipe: 'drinks',
        objectTypeRecommended: 'meals',
        favorite: 'idDrink',
        progress: 'cocktails',
      });
    }
  }, [location]);

  useEffect(() => {
    const { id } = params;
    const { pathname } = location;

    const requestRecipe = async () => {
      const response = await fetch(`https://www.the${apiType.recipe}db.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeData(data[apiType.objectTypeRecipe][0]);
    };

    const requestRecommeded = async () => {
      const response = await fetch(`https://www.the${apiType.recommended}db.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
      const limit = 6;
      setRecommended(data[apiType.objectTypeRecommended].slice(0, limit));
    };

    if (pathname.includes('drinks')) {
      if (isMounted.current) {
        requestRecipe();
        requestRecommeded();
        setTextBtn(getProgressRecipes(params, apiType.progress));
        // setIsDone(getDoneRecipes(recipeData, apiType.favorite));
      } else {
        isMounted.current = true;
      }
    } else {
      requestRecipe();
      requestRecommeded();
      setTextBtn(getProgressRecipes(params, apiType.progress));
      // setIsDone(getDoneRecipes(recipeData, apiType.favorite));
    }
  }, [apiType, params, location]);

  return (
    <div>
      {
        location.pathname.includes('drinks') ? (
          <RecipeDetailsDrinks
            recipeData={ recipeData }
            recommended={ recommended }
            ingredients={ ingredients }
            textBtn={ textBtn }
            isDone={ isDone }
          />
        ) : (
          <RecipeDetailsFoods
            recipeData={ recipeData }
            recommended={ recommended }
            ingredients={ ingredients }
            textBtn={ textBtn }
            isDone={ isDone }
          />
        )
      }
    </div>
  );
};

export default RecipeDetails;
