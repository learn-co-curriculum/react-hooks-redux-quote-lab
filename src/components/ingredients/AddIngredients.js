import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AddIngredient } from './AddIngredient'

export class AddIngredients extends Component {
  render(){
    let selectedIngredients = this.props.selectedIngredients.map((selectedIngredient) => {
      return <li> {selectedIngredient.name}</li>
    })
    return(
    <div>
      {selectedIngredients}
    </div>
    )
  }
}

function findIngredient(ingredientId, ingredients){
  return ingredients.find((ingredient) => { return ingredient.id === ingredientId })
}

function selectedIngredients(ingredientIds, ingredients){
  return ingredientIds.map(function (ingredientId) {
    return findIngredient(ingredientId, ingredients)
  })
}

function mapStateToProps(state){
  return {selectedIngredients: selectedIngredients(state.recipeForm.ingredientIds, state.ingredients), unselectedIngredients: selectedIngredients(allExcept(state.recipeForm.ingredientIds, state.ingredients), state.ingredients)}
}


function allExcept(ingredientIds, ingredients){
  return ingredients.filter((ingredient) => {
    return !ingredientIds.include(ingredient)
  }).map((ingredient) => { return ingredient.id })
  // {} -> [1, 2, ]
}




export const ConnectedAddIngredients =  connect(mapStateToProps)(AddIngredients)

// map
  // same number of output as input, coerce each element
// select
  // smaller array
// forEach
  // don't care about the return value, take an action
// {ingredientIds: [1, 2]}



// let selectedIngredients =
