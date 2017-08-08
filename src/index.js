import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { RecipesInput } from './components/recipes/RecipesInput'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom'


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
