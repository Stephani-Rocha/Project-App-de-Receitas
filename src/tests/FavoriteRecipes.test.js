import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Redux/helper/renderWithRouter';

describe(('Testa a página Favorite Recipes'), () => {
  it(('Verifica se existe o título e o botão "Profile"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');

    const titleEl = screen.getByRole('heading', { name: /Favorite Recipes/i, level: 1 });
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(titleEl).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
  });
});
