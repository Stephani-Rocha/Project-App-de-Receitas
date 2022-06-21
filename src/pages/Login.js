import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const validateLogin = () => {
    const { email, password } = form;
    const re = /\S+@\S+\.\S+/;
    const emailValidation = re.test(email);

    const PASSWORD_VALIDATION = 6;

    if (emailValidation && password.length > PASSWORD_VALIDATION) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    validateLogin();
  }, [form]);

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
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ () => history.push('/home') }
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
