import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class RecipesInput extends Component {
  constructor(props){

    super(props)
    this.state = {name: '', calories: ''}
  }
  handleOnNameChange(event){
    // store.dispatch({type: 'UPDATE_FORM_INPUT', formNameInput: event.target.value})
    this.setState({name: event.target.value})
  }
  handleOnCaloriesChange(event){
    this.setState({calories: event.target.value})

  }
  handleSubmit(event){
    event.preventDefault()
    
    this.props.addRecipe(this.state.name, this.state.calories)
  }
  render(){
    // debugger;
    let recipes = this.props.recipes.map((recipe) => {
      return <li> {recipe.name}</li>
    })
    return(
      <div>
      <form onSubmit={this.handleSubmit.bind(this)}>
        Create A Recipe
        <p>
          <label> Recipe Name </label>
          <input type="text" onChange={this.handleOnNameChange.bind(this)} value={this.state.name} />
        </p>
        <p>
          <label> Calories </label>
          <input type="text" onChange={this.handleOnCaloriesChange.bind(this)} value={this.state.calories} />
        </p>
        <input type="submit" />
      </form>
      <ul>
        {recipes}
      </ul>
      </div>
    )
  }
}

function addRecipe(name, calories){

  return {type: 'ADD_RECIPE', payload: {name: name, calories: calories} }
}


function mapStateToProps(state){
  console.log('the state is', state)
  return {recipes: state.recipes }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addRecipe: addRecipe}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesInput)

// onSubmit={store.dispatch({type: 'ADD_RECIPE', payload: {name: this.state.name, calories: this.state.calories}})}
