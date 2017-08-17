export default (state = [], action) => {
  switch (action.type) {

    case 'ADD_INGREDIENT':
      return state.concat(action.ingredient);

    case 'REMOVE_INGREDIENT':
      return state.filter(ingredient => ingredient.id != action.id);

    default: 
      return state;
  }
}