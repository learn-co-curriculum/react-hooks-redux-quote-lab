import React, { Component }from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../actions/users.js'
class NewUser extends Component {
  constructor(props){
    super(props)
    this.state = {email: '', password: ''}
  }
  handleOnSubmit(event){
    event.preventDefault()
    this.props.createUser(this.state.email, this.state.password)
  }
  render(){
    return(
      <form onSubmit={this.handleOnSubmit.bind(this)}>
        <label > Email</label>
        <input onChange={(event) => { this.setState({email: event.target.value})}} type="text" value={this.state.email}/>
        <label >Password</label>
        <input onChange={(event) => { this.setState({password: event.target.value})}} type="text" value={this.state.password}/>
        <input type="submit"/>

      </form>
    )
  }
}


export default connect(null, {createUser: createUser})(NewUser);
