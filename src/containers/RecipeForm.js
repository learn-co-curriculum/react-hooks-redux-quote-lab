import React, { Component } from 'react';
import IngredientsForm from './IngredientsForm';

class RecipeForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '', 
      ingredientIds: []
    }
  }

  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <form>
          <input 
            name="name"
            onChange={this.handleOnChange}
          />
        </form>
        <IngredientsForm />
      </div>
    );
  }
}

export default RecipeForm;