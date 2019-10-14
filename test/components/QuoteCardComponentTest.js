import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import spies from 'chai-spies';
import { Provider } from 'react-redux';
import App from '../../src/App';
import Quotes from '../../src/containers/Quotes';
import QuoteForm from '../../src/components/QuoteForm';
import { createStore } from 'redux'
import rootReducer from '../../src/reducers/index'
import Adapter from 'enzyme-adapter-react-16'
import QuoteCard from '../../src/components/QuoteCard';

configure({ adapter: new Adapter() })

describe('QuoteCard Component', () => {
  const initialState = { ingredients: [] };

  const addQuote = (recipe) => 'noop';
  let wrapper;
  let wrapperTwo;
  let store;
  
  let quoteOne = {
    content: 'test quote',
    author: 'test author',
    votes: 0,
    id: 5
  }
  let quoteTwo = {
    content: 'testing this quote',
    author: 'authoring this test',
    votes: 10,
    id: 5
  }


  it('renders quote content from props.quote', () => {
    
    wrapper = mount(<QuoteCard quote={quoteOne} />)
    expect(wrapper.html()).to.include('test quote')

    wrapperTwo = mount(<QuoteCard quote={quoteTwo} />)
    expect(wrapperTwo.html()).to.include('testing this quote')
  });

  it('renders quote author from props.quote', () => {
    
    wrapper = mount(<QuoteCard quote={quoteOne} />)
    expect(wrapper.html()).to.include('test author')

    wrapperTwo = mount(<QuoteCard quote={quoteTwo} />)
    expect(wrapperTwo.html()).to.include('authoring this test')
  });

  it('renders quote votes from props.quote', () => {
    
    wrapper = mount(<QuoteCard quote={quoteOne} />)
    expect(wrapper.html()).to.include('0')

    wrapperTwo = mount(<QuoteCard quote={quoteTwo} />)
    expect(wrapperTwo.html()).to.include('10')
  });
})
