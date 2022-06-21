import { screen } from '@testing-library/react';
import React from 'react';

import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testa a página Foods', () => {
  it('Verifica se os tokens estão sendo inseridos corretamente', () => {
    renderWithRouter(<App />);

    const profileBtn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
