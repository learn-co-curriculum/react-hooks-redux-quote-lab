import React, { Component } from 'react';
import QuoteForm from './containers/QuoteForm';
import Quotes from './containers/Quotes';

export class App extends Component {
  render() {
    return (
      <div>
        <h1>Quote Maker</h1>
        <QuoteForm />
        <Quotes />
      </div>
    );
  }
}

export default App;
