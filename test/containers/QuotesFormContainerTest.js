import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { QuoteForm } from '../../src/containers/QuoteForm';
import ConnectedQuoteForm from '../../src/containers/QuoteForm';

describe('QuoteForm Component', () => {
  const mockStore = configureStore([]);
  const initialState = { ingredients: [] };
  const store = mockStore(initialState);
  const addQuote = (recipe) => 'noop';
  let wrapper;
  chai.use(spies);

  beforeEach(() => {
    wrapper = shallow(<QuoteForm addQuote={addQuote} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedQuoteForm />
      </Provider>, 
      div
    );
  });

  it('has a default state', () => {
    expect(wrapper.state()).to.deep.equal({
      content: '',
      author: ''
    });
  });

  it('always renders a form tag', () => {
    const form = wrapper.find('form');

    expect(form.length).to.equal(1, 'QuoteForm must contain a <form> tag');
  });

  it('always renders a textarea[name="content"] tag for quote content', () => {
    const input = wrapper.find('textarea[name="content"]');

    expect(input.length).to.equal(1, 'QuoteForm must contain one <textarea name="content" /> tag');
  });

  it('always renders a input[name="author"] tag for quote author', () => {
    const input = wrapper.find('input[name="author"]');

    expect(input.length).to.equal(1, 'QuoteForm must contain one <input name="author" /> tag');
  });

  it('should pass a new value to state using the handleOnChange function', () => {

    wrapper.find('input[name="author"]').simulate('change', { target: { name: 'author', value: 'test author' }});
    wrapper.find('textarea[name="content"]').simulate('change', { target: { name: 'content', value: 'test content' }})

    expect(wrapper.state()).to.deep.equal({
      content: 'test content', 
      author: 'test author'
    });
  });

  it('should handleOnSubmit and preventDefault()', () => {
    const preventDefault = chai.spy(function() {});

    wrapper.find('input[name="author"]').simulate('change', { target: { name: 'author', value: 'test author' }});
    wrapper.find('textarea[name="content"]').simulate('change', { target: { name: 'content', value: 'test content' }})
    wrapper.find('form').simulate('submit', { preventDefault });

    expect(preventDefault).to.have.been.called();
  });

  it('should reset state after form handleOnSubmit', () => {
    const preventDefault = chai.spy(function() {});

    wrapper.find('input[name="author"]').simulate('change', { target: { name: 'author', value: 'test author' }});
    wrapper.find('textarea[name="content"]').simulate('change', { target: { name: 'content', value: 'test content' }})
    
    expect(wrapper.state()).to.deep.equal({
      content: 'test content', 
      author: 'test author'
    });

    wrapper.find('form').simulate('submit', { preventDefault });

    expect(wrapper.state()).to.deep.equal({ 
      content: '',
      author: ''
    });  
  });

  it('should call addQuote prop on handleOnSubmit', () => {
    const preventDefault = chai.spy(function() {});
    const addQuoteSpy = chai.spy(addQuote);
    const wrapperWithProps = shallow(<QuoteForm addQuote={addQuoteSpy} />)

    wrapperWithProps.find('form').simulate('submit', { preventDefault });
    expect(addQuoteSpy, "Expected this.props.addQuote to have been called").to.have.been.called();
  })
});

