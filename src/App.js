import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetailsFoods from './pages/RecipeDetailsFoods';
import RecipeDetailsDrinks from './pages/RecipeDetailsDrinks';
import RecipeInProgressDrinks from './pages/RecipeInProgressDrinks';
import RecipeInProgressFoods from './pages/RecipeInProgressFoods';

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
        <Route exact path="/drinks">
          <Drinks />
        </Route>
        <Route exact path="/foods/:id">
          <RecipeDetailsFoods />
        </Route>
        <Route exact path="/drinks/:id">
          <RecipeDetailsDrinks />
        </Route>
        <Route exact path="/foods/:id/in-progress">
          <RecipeInProgressFoods />
        </Route>
        <Route exact path="/drinks/:id/in-progress">
          <RecipeInProgressDrinks />
        </Route>
        <Route exact path="/explore">
          <Explore />
        </Route>
        <Route exact path="/explore/foods">
          <ExploreFoods />
        </Route>
        <Route exact path="/explore/drinks">
          <ExploreDrinks />
        </Route>
        <Route exact path="/explore/foods/ingredients">
          <ExploreFoodsIngredients />
        </Route>
        <Route exact path="/explore/drinks/ingredients">
          <ExploreDrinksIngredients />
        </Route>
        <Route exact path="/explore/foods/nationalities">
          <ExploreFoodsNationalities />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/done-recipes">
          <DoneRecipes />
        </Route>
        <Route exact path="/favorite-recipes">
          <FavoriteRecipes />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
