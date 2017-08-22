import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuote } from '../actions/quotes';

export class QuoteForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content: '', 
      author: '',
    }
  }

  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const quote = this.state;
    this.props.addQuote(quote);
    this.setState({
      content: '', 
      author: ''
    });
  }

  render() {
    return (
      <div>
        <h2>Create A Quote</h2>
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="content">Name:</label>
          <textarea 
            name="content"
            value={this.state.content}
            onChange={this.handleOnChange}
          />
          <label htmlFor="author">Author</label>
          <input 
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleOnChange} 
          />
          <button type="submit">Create Quote</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addQuote })(QuoteForm);