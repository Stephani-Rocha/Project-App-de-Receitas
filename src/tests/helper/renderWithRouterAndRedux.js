import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mealsSlice from '../../Redux/Slice/mealsSlice';
import drinksSlice from '../../Redux/Slice/drinksSlice';
import mealCategorySlice from '../../Redux/Slice/mealCategorySlice';
import drinkCategorySlice from '../../Redux/Slice/drinkCategorySlice';
import mealFiltredSlice from '../../Redux/Slice/mealFiltredSlice';
import drinksFiltredSlice from '../../Redux/Slice/drinksFiltredSlice';

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
