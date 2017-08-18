import React, { Component } from 'react';

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
      <form>
        <input 
          name="name"
          onChange={this.handleOnChange}
        />
      </form>
    );
  }
}

export default RecipeForm;