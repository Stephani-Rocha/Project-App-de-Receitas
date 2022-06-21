import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe(('Testa componente Home'), () => {
  it(('Verifica se os tokens estão sendo inseridos corretamente'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/home');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/home');

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');

    const TIMER = 1000;

    setTimeout(() => {
      expect(mealsToken).toBe('1');
      expect(cocktailsToken).toBe('1');
    }, TIMER);
  });
});
