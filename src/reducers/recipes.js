export default (state = [], action) => {
  switch(action.type) {

    case 'ADD_RECIPE':
      return state.concat(action.recipe);

    case 'REMOVE_RECIPE':
      return state.filter(recipe => recipe.id != action.id);

    case 'REMOVE_INGREDIENT':
      return state.map(recipe => {
        return Object.assign({}, recipe, {
          ingredientIds: recipe.ingredientIds.filter(id => id != action.id)
        });
      });
      
    default: 
      return state;
  }
}