class Users extends Component {
  componentWillMount(){
    if(!loggedIn){
      browserHistory.push('/')
    } else{
        fetch('', localStorage.getItem(''))
    }

  }
}




1. User Signups
  bob
  bob@gmail.com
  lasjlksajl

  this.props.signUp(email, password)

  function signUp(email, password){
    return function (dispatch){
      get back our token
      get back some necessary data
      change what the user is looking
        browserHistory.push('/resources')
    }
  }


  fetch('/cats', {headers: {authorization: localStorage.getItem('token')}})



login
  email
  password

  post /users
    email
    password


class UsersController < ApplicationController
    def create
      @user = User.create(user_params)
      token = Auth.issue({user_id: @user.id})
        <!-- 'as.jasljaslkjaslkjas' -->
      response json: {user_id: @user.id, token: token}
    end

    def user_params

    end
end

<!-- front end -->
function signup(){
  return function(dispatch){
    dispatch({type: 'SIGN_UP'})
    fetch('http://localhost:3000/users', {method: 'POST', body: {name: 'bob', email: '', password: 'absjksak'}}).then((response) => {
        return response.json()
      }).then((json) => {
        dispatch({type: 'LOGGED_IN', payload: {data: json}})
        localstorage.setItem('token', response.token)
        browserHistory.push('/cats')

        })
  }
}
fetch('http://localhost:3000/users', {method: 'POST', body: {name: 'bob', email: '', password: 'absjksak'}}).then((response) => {
    return response.json()
  }).then((json) => {
    localstorage.setItem('token', response.token)
    })

fetch('http://localhost:3000/cats', {headers: {authorization: localstorage.getItem('token')}})
