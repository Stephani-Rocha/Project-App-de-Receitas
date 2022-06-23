import React from 'react';
import { screen } from '@testing-library/react';
import Explore from '../pages/Explore';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe(('Testa a página Explore'), () => {
  it(('Verifica se existe o título e o botão "Profile"'), () => {
    renderWithRouter(<Explore />);
    /* history.push('/explore');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore'); */

    const titleEl = screen.getByRole('heading', { name: /Explore/i, level: 1 });
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(titleEl).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
  });

  it((
    'Verifica se os botões "Explore Foods" e  "Explore Drinks" são renderizados'
  ), () => {
    renderWithRouter(<Explore />);
    const exploreFoods = screen.getByRole('button', {
      name: /Explore Foods/i,
    });

    const exploreDrinks = screen.getByRole('button', {
      name: /Explore Drinks/i,
    });

    expect(exploreFoods).toBeInTheDocument();
    expect(exploreDrinks).toBeInTheDocument();
  });
});
