import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure, shallow } from 'enzyme';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from '../../src/reducers/index'
import App from '../../src/App';
import QuoteForm from '../../src/components/QuoteForm';

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('QuoteForm Component', () => {
  const initialState = { ingredients: [] };

  const addQuote = (recipe) => 'noop';
  let wrapper;
  let store;
  chai.use(spies);



  it('renders without crashing', () => {
    const div = document.createElement('div');
    store = createStore(rootReducer)
    store.dispatch({type: 'ADD_QUOTE', quote: {content: '', author: '', id: 1} })
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
  });
  //
  // it('has a default state', () => {
  //   store = createStore(rootReducer)
  //   wrapper = mount(<Provider store={store}><App /></Provider>);
  //
  //   console.log('hi');
  //
  //   expect(swrapper.state()).to.deep.equal({
  //     content: '',
  //     author: ''
  //   });
  // });

  it('always renders a form tag', () => {
    store = createStore(rootReducer)
    wrapper = mount(<Provider store={store}><QuoteForm addQuote={addQuote} /></Provider>);
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

  it('should control its inputs based on internal state', () => {
    store = createStore(rootReducer)
    wrapper = mount(<Provider store={store}><App /></Provider>);

    wrapper.find('input[name="author"]').simulate('change', { target: { name: 'author', value: 'test author' }});
    wrapper.find('textarea[name="content"]').simulate('change', { target: { name: 'content', value: 'test content' }})

    expect(wrapper.find('input[name="author"]').html()).to.include('value="test author"');
    expect(wrapper.find('textarea[name="content"]').html()).to.include('test content');

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

    expect(wrapper.find('input[name="author"]').html()).to.include('value="test author"');
    expect(wrapper.find('textarea[name="content"]').html()).to.include('test content');


    wrapper.find('form').simulate('submit', { preventDefault });

    expect(wrapper.find('input[name="author"]').html()).to.include('value=""');
    expect(wrapper.find('textarea[name="content"]').html()).to.not.include('test content');


  });

  it('should modify the store on handleOnSubmit', () => {
    store = createStore(rootReducer)
    wrapper = mount(<Provider store={store}><App /></Provider>);

    expect(store.getState().quotes.length).to.equal(0);

    wrapper.find('input[name="author"]').simulate('change', { target: { name: 'author', value: 'test author' }});
    wrapper.find('textarea[name="content"]').simulate('change', { target: { name: 'content', value: 'test content' }})

    expect(wrapper.find('input[name="author"]').html()).to.include('value="test author"');
    expect(wrapper.find('textarea[name="content"]').html()).to.include('test content');

    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(store.getState().quotes.length).to.equal(1);
    expect(store.getState().quotes[0].author).to.equal('test author')
    expect(store.getState().quotes[0].content).to.equal('test content')

  })
});
