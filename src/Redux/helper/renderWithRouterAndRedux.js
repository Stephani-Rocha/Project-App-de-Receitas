import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mealsSlice from '../Slice/mealsSlice';
import drinksSlice from '../Slice/drinksSlice';
import mealCategorySlice from '../Slice/mealCategorySlice';
import drinkCategorySlice from '../Slice/drinkCategorySlice';
import mealFiltredSlice from '../Slice/mealFiltredSlice';
import drinksFiltredSlice from '../Slice/drinksFiltredSlice';

const renderWithRouterAndRedux = (component, route = '/') => {
  const store = configureStore({ reducer: {
    mealsSlice,
    drinksSlice,
    mealCategorySlice,
    drinkCategorySlice,
    mealFiltredSlice,
    drinksFiltredSlice,
  } });
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;
