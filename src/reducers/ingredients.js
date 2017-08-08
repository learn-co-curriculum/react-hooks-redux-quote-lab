import uuidV4  from 'uuid/v4';

export default function ingredients(state = [{id: 1, name: 'baba'}, {id: 2, name: 'tomato sauce'}, {id: 3, name: 'peanuts'}], action){

  switch (action.type) {
    case 'ADD_RECIPE':
      return state.concat({name: 'foobar'})
      break;
    case 'EDIT_RECIPE':
      
    default:
      return state
  }
}

function editIngredient(ingredient, payload){
  // {name: 'baba', calories: 80}
    // {name: 'babaganoush'}
  return Object.assign({}, payload, ingredient)
  // {name: 'babaganoush', calories: 80}

}

// dispatch({type: 'EDIT_RECIPE', payload: {id: 1, name: 'babaganoush'}})
