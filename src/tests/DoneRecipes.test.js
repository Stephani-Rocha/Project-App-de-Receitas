import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe(('Testa a página Done Recipes'), () => {
  it(('Verifica se existe o título e o botão "Profile"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');

    const titleEl = screen.getByRole('heading', { name: /Done Recipes/i, level: 1 });
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(titleEl).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
  });
});
