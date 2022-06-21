import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  }, []);

  return (
    <div> aqui é a Home</div>
  );
};

export default Home;
