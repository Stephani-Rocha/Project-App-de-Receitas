import React, { useEffect } from 'react';
import Header from '../components/Header';

const Foods = () => {
  useEffect(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  }, []);

  return (
    <div>
      <Header title="Foods" />
    </div>
  );
};

export default Foods;
