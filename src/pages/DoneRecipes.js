import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const DoneRecipes = () => {
  const doneTest = [{
    id: '1',
    type: 'food',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: ['Pasta', 'Curry'],
  }];

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
          doneTest.map((recipe, index) => (
            <>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <span data-testid={ `${index}-horizontal-top-text` }>
                {recipe.category}
              </span>
              <h5 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h5>
              <span data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </span>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
              >
                <img src={ shareIcon } alt="share button" />
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
