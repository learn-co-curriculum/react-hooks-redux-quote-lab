export default function login(state = {currentUser: null, loggingIn: false}, action){
  switch (action.type) {
    case 'CREATING_USER':
        return {currentUser: state.currentUser, loggingIn: true}
      break;
    case 'LOGGED_IN':
      return {currentUser: action.payload.userId, loggingIn: false}
    default:
      return state
  }
}
