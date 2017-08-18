import { combineReducers } from 'redux';
import ingredients from './ingredients';
import recipes from './recipes';

export default combineReducers({
  ingredients, 
  recipes
});
