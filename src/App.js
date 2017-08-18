import React, { Component } from 'react';
import RecipeForm from './containers/RecipeForm';
import Recipes from './containers/Recipes';

export class App extends Component {
  render() {
    return (
      <div>
        <h1>Cooking With Redux</h1>
        <RecipeForm />
        <Recipes />
      </div>
    );
  }
}

export default App;
