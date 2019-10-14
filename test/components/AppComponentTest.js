import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import App from '../../src/App';
import Quotes from '../../src/containers/Quotes';
import QuoteForm from '../../src/components/QuoteForm';
import { store } from '../../src/store';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
  });

  it('always renders an h1 tag with "Quote Maker"', () => {
    const headerTags = wrapper.find('h1');

    expect(headerTags.length).to.equal(1);
    expect(headerTags.text()).to.equal('Quote Maker', 'H1 Tag text does not match');
  });

  it('always renders a `QuoteForm` component', () => {
    expect(wrapper.find(QuoteForm).length).to.equal(1, 'Missing a QuoteForm Component');
  });

  it('always renders a `Quotes` components', () => {
    expect(wrapper.find(Quotes).length).to.equal(1, 'Missing a Quotes Component');
  });
});
