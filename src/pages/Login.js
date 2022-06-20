import React, { useState } from 'react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleForm = ({ target }) => {
    setForm((prevForm) => ({
      ...prevForm,
      [target.name]: target.value,
    }));
  };

  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        placeholder="Email"
        name="email"
        value={ form.email }
        onChange={ handleForm }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Password"
        name="password"
        value={ form.password }
        onChange={ handleForm }
      />
      <button type="submit" data-testid="login-submit-btn">
        Submit
      </button>
    </form>
  );
};

export default Login;
