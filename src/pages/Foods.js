import React, { useEffect } from 'react';

const Foods = () => {
  useEffect(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  }, []);

  return (
    <div> aqui é a Home</div>
  );
};

export default Foods;
