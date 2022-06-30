import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const DoneRecipes = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [showMessage, setShowMessage] = useState({});

  useEffect(() => {
    const getDoneRecipes = () => {
      const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

      setDoneRecipes(recipes);
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

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      </div>
      <div>
        {
          doneRecipes.map((recipe, index) => (
            <>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '80px' } }
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
            </>
          ))
        }
      </div>
    </div>
  );
};

export default DoneRecipes;
