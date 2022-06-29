import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe(('Testa a página Drinks'), () => {
  it(('Verifica se existe o título e os botões de "Search" e "Profile"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');

    const titleEl = screen.getByRole('heading', { name: /Drinks/i, level: 1 });
    const buttonProfile = screen.getByTestId('profile-top-btn');
    const buttonSearch = screen.getByTestId('search-top-btn');

    expect(titleEl).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });
});
