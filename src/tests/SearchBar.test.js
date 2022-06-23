import React from 'react';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helper/renderWithRouterAndRedux';
import { mealsByFirstLetter, mealsByIngredient, mealsByName } from './mock/mockMealAPI';

// jest.mock();
// global.fetch = jest.fn();
// global.fetch.mockResolvedValue({
//   json: jest.fn().mockResolvedValue(mealsByName),
// });
const DELAY = 150;
const BTN_ID = 'exec-search-btn';
const TIMEOUT_DELAY = 1000;

describe(('Testa componente SearchBar'), () => {
  it(('Verifica se é salvo na store o resultado da API quando busca pelo nome'),
    async () => {
      const { store } = renderWithRouterAndRedux(<App />, '/foods');

      rest.get('https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata', (_req, res, ctx) => (
        res(ctx.json(mealsByName), ctx.delay(DELAY))
      ));

      const searchInput = screen.getByRole('searchbox');
      const searchType = screen.getByText(/name/i);
      const searchBtn = screen.getByTestId(BTN_ID);

      userEvent.type(searchInput, 'arrabiata');
      userEvent.click(searchType);
      userEvent.click(searchBtn);

      setTimeout(() => (
        expect(store.getState().mealsSlice).toEqual(mealsByName)), TIMEOUT_DELAY);
    });

  it(('Verifica se é salvo na store o resultado da API quando busca pelo ingrediente'),
    async () => {
      const { store } = renderWithRouterAndRedux(<App />, '/foods');

      rest.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken', (_req, res, ctx) => (
        res(ctx.json(mealsByIngredient), ctx.delay(DELAY))
      ));

      const searchInput = screen.getByRole('searchbox');
      const searchType = screen.getByText(/ingredient/i);
      const searchBtn = screen.getByTestId(BTN_ID);

      userEvent.type(searchInput, 'chicken');
      userEvent.click(searchType);
      userEvent.click(searchBtn);

      setTimeout(() => (
        expect(store.getState().mealsSlice).toEqual(mealsByIngredient)), TIMEOUT_DELAY);
    });

  it(('Verifica se é salvo na store o resultado da API quando busca pela primeira letra'),
    async () => {
      const { store } = renderWithRouterAndRedux(<App />, '/foods');

      rest.get('https://www.themealdb.com/api/json/v1/1/search.php?f=a', (_req, res, ctx) => (
        res(ctx.json(mealsByFirstLetter), ctx.delay(DELAY))
      ));

      const searchInput = screen.getByRole('searchbox');
      const searchType = screen.getByText(/first letter/i);
      const searchBtn = screen.getByTestId(BTN_ID);

      userEvent.type(searchInput, 'a');
      userEvent.click(searchType);
      userEvent.click(searchBtn);

      setTimeout(() => (
        expect(store.getState().mealsSlice).toEqual(mealsByFirstLetter)), TIMEOUT_DELAY);
    });

  it(('Verifica se é disparado um alert caso seja buscado com mais de uma letra'),
    async () => {
      renderWithRouterAndRedux(<App />, '/foods');

      const alertMock = jest.spyOn(window, 'alert');

      const searchInput = screen.getByRole('searchbox');
      const searchType = screen.getByText(/first letter/i);
      const searchBtn = screen.getByTestId(BTN_ID);

      userEvent.type(searchInput, 'aa');
      userEvent.click(searchType);
      userEvent.click(searchBtn);

      expect(alertMock).toHaveBeenCalledTimes(1);
    });
});
