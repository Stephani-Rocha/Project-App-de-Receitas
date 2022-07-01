import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import renderWithRouterAndRedux from './helper/renderWithRouterAndRedux';

const EMAIL = 'teste@teste.com';

describe(('Testa a página Profile'), () => {
  it(('Verifica se existe o título e o botão "Profile"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');

    const titleEl = screen.getByRole('heading', { name: /Profile/i, level: 1 });
    const buttonProfile = screen.getByTestId('profile-top-btn');

    expect(titleEl).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
  });

  it(('Verifica se existem os botões "Done e Favorite Recipes" e "Logout"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const buttonDoneRecipe = screen.getByRole('button', { name: /done recipes/i });
    const buttonFavoriteRecipe = screen
      .getByRole('button', { name: /favorite recipes/i });
    const buttonLogout = screen.getByRole('button', { name: /logout/i });

    expect(buttonDoneRecipe).toBeInTheDocument();
    expect(buttonFavoriteRecipe).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
  });

  it(('Verifica se ao clicar no botão "Done Recipes"'
  + 'redireciona para a tela "Done Recipes"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const buttonDoneRecipe = screen.getByRole('button', { name: /done recipes/i });

    expect(buttonDoneRecipe).toBeInTheDocument();

    userEvent.click(buttonDoneRecipe);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });

  it(('Verifica se ao clicar no botão "Favorite Recipes" '
    + 'redireciona para a tela "Favorite Recipes"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const buttonFavoriteRecipe = screen
      .getByRole('button', { name: /favorite recipes/i });

    expect(buttonFavoriteRecipe).toBeInTheDocument();

    userEvent.click(buttonFavoriteRecipe);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });

  it(('Verifica se ao clicar no botão "Logout" redireciona para a tela "Login"'), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const buttonLogout = screen.getByRole('button', { name: /logout/i });

    expect(buttonLogout).toBeInTheDocument();

    userEvent.click(buttonLogout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it(('Verifica se na tela de "Profile" existe o título,'
  + ' a imagem e o email.'), async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    console.log(history);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button', { name: /submit/i });

    userEvent.type(email, EMAIL);
    userEvent.type(password, '1234567');
    userEvent.click(button);

    const buttonProfile = await screen.findByRole('button', { name: /profile/i });
    userEvent.click(buttonProfile);

    // history.push('/profile');
    // const { location: { pathname } } = history;

    const titleEl = await screen.findByRole('heading', { name: /Profile/i, level: 1 });
    const imgProfile = await screen.findByRole('img', { name: /profile/i });
    const emailProfile = await screen.findByText(/teste@teste\.com/i);

    // expect(pathname).toBe('/profile');
    expect(titleEl).toBeInTheDocument();
    expect(imgProfile).toBeInTheDocument();
    expect(emailProfile).toBeInTheDocument();
  });
});
