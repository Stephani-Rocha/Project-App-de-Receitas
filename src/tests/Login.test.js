import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe(('Testa componente Login'), () => {
  it(('Verifica se os inputs de email e senha estão renderizados'), () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);

    const { location: { pathname } } = history;

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it(('Verifica se botão "submit" está renderizado'), () => {
    renderWithRouter(<App />);
    const submit = screen.getByRole('button', {
      name: /submit/i,
    });

    expect(submit).toBeInTheDocument();
  });

  it(('Verifica se os inputs de email e senha são digitáveis'), () => {
    renderWithRouter(<App />);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);

    userEvent.type(email, 'email');
    userEvent.type(password, 'password');

    expect(email.value).toBe('email');
    expect(password.value).toBe('password');
  });
});
