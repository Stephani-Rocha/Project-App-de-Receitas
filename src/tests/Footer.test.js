import { screen } from '@testing-library/react';
import React from 'react';

import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testa o componente Footer', () => {
  it('Verifica se os botões estão renderizados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const { location: { pathname } } = history;

    expect(pathname).toBe('/foods');
    const pageFooter = screen.getByTestId('footer');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    const foodsBtn = screen.getByTestId('food-bottom-btn');

    expect(pageFooter).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(exploreBtn).toBeInTheDocument();
    expect(foodsBtn).toBeInTheDocument();
  });
});
