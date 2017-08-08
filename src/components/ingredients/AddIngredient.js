import React, { Component } from 'react';

export class AddIngredient extends Component {
  render(){
    return(
      <li> {this.props.ingredient.name} </li>
    )
  }
}

export const ConnectedAddIngredient = AddIngredient
