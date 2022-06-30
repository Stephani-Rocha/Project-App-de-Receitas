import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const DoneRecipes = () => {
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneFiltered, setDoneFiltered] = useState([]);
  const [showMessage, setShowMessage] = useState({});

  const getAllDone = () => {
    setDoneFiltered(doneRecipes);
  };

  const getDrinksDone = () => {
    const drinkDone = doneRecipes.filter((recipe) => recipe.type === 'drink');
    setDoneFiltered(drinkDone);
  };

  const getFoodsDone = () => {
    const drinkDone = doneRecipes.filter((recipe) => recipe.type === 'food');
    setDoneFiltered(drinkDone);
  };

  useEffect(() => {
    const getDoneRecipes = () => {
      const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

      setDoneRecipes(recipes);
      setDoneFiltered(recipes);
    };

    getDoneRecipes();
  }, []);

  const handleShare = (type, id) => {
    const url = `http://${window.location.host}/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setShowMessage((prevState) => ({ ...prevState, [id]: true }));

    const TIME = 3000;

    setTimeout(() => setShowMessage((prevState) => ({ ...prevState, [id]: false })),
      TIME);
  };

  const handleClick = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ getAllDone }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ getFoodsDone }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ getDrinksDone }
        >
          Drink
        </button>
      </div>
      {
        doneFiltered.map((recipe, index) => (
          <div key={ recipe.id }>
            <button
              type="button"
              onClick={ () => handleClick(recipe.type, recipe.id) }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                style={ { width: '80px' } }
                data-testid={ `${index}-horizontal-image` }
              />
              <span data-testid={ `${index}-horizontal-top-text` }>
                {
                  recipe.type === 'food'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`
                }
              </span>
              <h5 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h5>
            </button>
            <span data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </span>
            <button type="button" onClick={ () => handleShare(recipe.type, recipe.id) }>
              { showMessage[recipe.id] && <span>Link copied! </span> }
              <img
                src={ shareIcon }
                alt="share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {
              recipe.tags.map((tag, i) => (
                <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

export default DoneRecipes;
