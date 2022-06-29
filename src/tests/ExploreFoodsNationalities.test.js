import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Redux/helper/renderWithRouter';

describe(('Testa a página Explore Nationalities'), () => {
  it(('Verifica se existe o título e os botões de "Search" e "Profile"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/nationalities');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods/nationalities');

    const titleEl = screen.getByRole('heading', {
      name: /Explore Nationalities/i, level: 1 });
    const buttonProfile = screen.getByTestId('profile-top-btn');
    const buttonSearch = screen.getByTestId('search-top-btn');

    expect(titleEl).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });
});
