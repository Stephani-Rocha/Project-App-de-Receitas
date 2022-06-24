import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe(('Testa a página Explore'), () => {
  it(('Verifica se existe o título e o botão "Profile"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore');

    const titleEl = screen.getByRole('heading', { name: /Explore/i, level: 1 });
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(titleEl).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
  });
  it((
    'Verifica se os botões "Explore Foods" e  "Explore Drinks" são renderizados'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore');

    const exploreFoods = screen.getByRole('button', {
      name: /Explore Foods/i,
    });
    const exploreDrinks = screen.getByRole('button', {
      name: /Explore Drinks/i,
    });

    expect(exploreFoods).toBeInTheDocument();
    expect(exploreDrinks).toBeInTheDocument();
  });
  it(('Verifica se ao clicar no botão "Explore Foods" a tela é redirecionada'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const buttonExploreFoods = screen.getByRole('button', { name: /Explore Foods/i });

    userEvent.click(buttonExploreFoods);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods');
  });
  it(('Verifica se ao clicar no botão "Explore Drinks" a tela é redirecionada'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const buttonExploreDrinks = screen.getByRole('button', { name: /Explore Drinks/i });

    userEvent.click(buttonExploreDrinks);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/drinks');
  });
});
