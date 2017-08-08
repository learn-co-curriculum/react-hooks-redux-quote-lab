// state = {recipes: []}


// store.dispatch({type: 'ADD_RECIPE', payload: {name: 'baba', calories: 80}})
export default function recipes(state = [{name: 'baba'}], action){
  switch (action.type) {
    case 'ADD_RECIPE':
    
    // [{name: 'baba', calories: 80}, ]
      return state.concat(action.payload)
      break;
    default:
      return state;
  }
}

// store = {recipes: [{name: 'baba', calories: 80}], ingredients: []}
