export default function usersReducer(state = [], action){
  switch (action.type) {
    case 'ADDING_USERS':
      return [...action.payload.users]
      break;
    default:
      return state
  }
}
