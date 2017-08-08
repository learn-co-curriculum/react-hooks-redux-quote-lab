import { browserHistory } from 'react-router-dom'

export function fetchUsers(){
  // return { type: 'FETCHING_USERS'}
  // let users;

  // return { type: 'FETCHING_USERS', payload: users}

  return function (dispatch, getState){
    // console.log(getState())
    dispatch({type: 'FETCHING_USERS'})
    fetch('http://localhost:3001/users', {headers: {'authorization': localStorage.getItem('auth'), 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }).
    then((response) => { return response.json() }).
    then((json) => {  dispatch({type: 'ADDING_USERS', payload: {users: json.users}}) })
  }
}


// store.dispatch(createUser())
export function createUser(email, password){
  return function (dispatch){
    //
      dispatch({type: 'CREATING_USER'})
      fetch('http://localhost:3001/users', {method: 'POST', body: JSON.stringify({email: email, password: password}),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then((response) => {return response.json()}).then((json) => {
        dispatch({type: 'LOGGED_IN', payload: {userId: json.user_id}})
        window.localStorage.setItem('auth', json.auth)

    })
  }
}
