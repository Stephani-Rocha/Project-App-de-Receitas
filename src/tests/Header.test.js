import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../Redux/helper/renderWithRouter';

const titleId = 'page-title';
const profileId = 'profile-top-btn';
const searchId = 'search-top-btn';

describe('Testa o componente Header', () => {
  it((
    'Verifica se o componente Header é renderizado corretamente na page "Foods"'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    const searchBtn = screen.getByTestId(searchId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o componente Header é renderizado corretamente na page "Drinks"'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    const searchBtn = screen.getByTestId(searchId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o componente Header é renderizado corretamente na page Profile'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o componente Header é renderizado corretamente na page DoneRecipes'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o componente Header é renderizado corretamente na page Explore'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o componente Header é renderizado corretamente na page ExploreDrinks'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o Header é renderizado corretamente em ExploreDrinksIngredients'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks/ingredients');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o componente Header é renderizado corretamente em ExploreFoods'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o Header é renderizado corretamente em ExploreFoodsIngredients'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o Header é renderizado corretamente em ExploreFoodsNationalities'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/nationalities');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    const searchBtn = screen.getByTestId(searchId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it((
    'Verifica se o Header é renderizado corretamente em FavoriteRecipes'
  ), () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const pageTitle = screen.getByTestId(titleId);
    const profileBtn = screen.getByTestId(profileId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
});
