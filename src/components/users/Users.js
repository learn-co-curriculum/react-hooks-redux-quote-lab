import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions/users.js'
 class Users extends Component {
  componentWillMount(){
    this.props.fetchUsers()
  }
  render(){
    let users = this.props.users.map((user) => { return <li> {user.email}</li>})
    return(
      <ul>
        {this.props.title}
        {users}
      </ul>
    )
  }
}

// function mapDispatchToProps(dispatch){
//  return bindActionCreators({fetchUsers: fetchUsers}, dispatch)
// }

function mapStateToProps(state){
  return {users: state.users}
}

export default connect(mapStateToProps, {fetchUsers: fetchUsers})(Users)
