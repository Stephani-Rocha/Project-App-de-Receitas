import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helper/renderWithRouterAndRedux';
import { categories, meals, mealsSearchName } from './mock/SearchBarMock';

// jest.mock();
// global.fetch = jest.fn();
// global.fetch.mockResolvedValue({
//   json: jest.fn().mockResolvedValue(mealsByName),
// });
const DELAY = 150;
const BTN_ID = 'exec-search-btn';

describe(('Testa componente SearchBar'), () => {
  it.only(('Verifica se é salvo na store o resultado da API (meals) buscando pelo nome'),
    async () => {
      // jest.spyOn(global, 'alert').mockImplementation();
      jest.mock();
      global.fetch = jest.fn();
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(meals)
          .mockResolvedValueOnce(categories)
          .mockResolvedValue(mealsSearchName),
      });
      const { store } = renderWithRouterAndRedux(<App />, '/foods');

      const searchHide = screen.getByRole('img', { name: /search/i });
      userEvent.click(searchHide);

      const searchInput = screen.getByRole('searchbox');
      const searchType = screen.getByText(/name/i);
      const searchBtn = screen.getByTestId(BTN_ID);

      userEvent.type(searchInput, 'cor');
      userEvent.click(searchType);
      userEvent.click(searchBtn);

      await wait(() => expect(store.getState().mealsSlice).toEqual(mealsSearchName));
    });

  it((`Verifica se é salvo na store o resultado da
  API (meals) buscando pelo ingrediente`),
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

    expect(store.getState().mealsSlice).toEqual(mealsByIngredient);
  });

  it((`Verifica se é salvo na store o resultado da
    API (meals) buscando pela primeira letra`),
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

    expect(store.getState().mealsSlice).toEqual(mealsByFirstLetter);
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

  it(('Verifica se é salvo na store o resultado da API (drinks) buscando pelo nome'),
    async () => {
      const { store } = renderWithRouterAndRedux(<App />, '/drinks');

      rest.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita', (_req, res, ctx) => (
        res(ctx.json(drinksByName), ctx.delay(DELAY))
      ));

      const searchInput = screen.getByRole('searchbox');
      const searchType = screen.getByText(/name/i);
      const searchBtn = screen.getByTestId(BTN_ID);

      userEvent.type(searchInput, 'margarita');
      userEvent.click(searchType);
      userEvent.click(searchBtn);

      expect(store.getState().drinksSlice).toEqual(drinksByName);
    });
});
