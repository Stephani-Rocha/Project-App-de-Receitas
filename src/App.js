import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/foods">
          <Foods />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
