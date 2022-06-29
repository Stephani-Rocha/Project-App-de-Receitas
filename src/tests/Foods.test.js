import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Redux/helper/renderWithRouter';

describe(('Testa a página Foods'), () => {
  it(('Verifica se os tokens estão sendo inseridos corretamente'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');

    const TIMER = 1000;

    setTimeout(() => {
      expect(mealsToken).toBe('1');
      expect(cocktailsToken).toBe('1');
    }, TIMER);
  });
});
