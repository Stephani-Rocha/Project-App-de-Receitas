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

  it(('Verifica se o campo de email e senha são válidos para habilitar o botão'), () => {
    renderWithRouter(<App />);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button', { name: /submit/i });

    userEvent.type(email, 'email');
    userEvent.type(password, 'password');

    expect(button).toBeDisabled();

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');

    expect(button).toBeEnabled();
  });

  it(('Verifica se ao fazer o login a página é redirecionada para /home'), () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button', { name: /submit/i });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    expect(button).toBeEnabled();

    userEvent.click(button);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/home');
  });
});
