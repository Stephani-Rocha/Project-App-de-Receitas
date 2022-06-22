import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe(('Testa a página Explore Foods Ingredients'), () => {
  it(('Verifica se existe o título e o botão "Profile"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods/ingredients');

    const titleEl = screen.getByRole('heading', {
      name: /Explore Ingredients/i, level: 1 });
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(titleEl).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
  });
});
