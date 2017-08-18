import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../../src/App';
import Recipes from '../../src/containers/Recipes';
import RecipeForm from '../../src/containers/RecipeForm';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('always renders an h1 tag with "Cooking With Redux"', () => {
    const headerTags = wrapper.find('h1');

    expect(headerTags.length).to.equal(1);
    expect(headerTags.text()).to.equal('Cooking With Redux', 'H1 Tag text does not match');
  });

  it('always renders a `RecipeForm` component', () => {
    expect(wrapper.find(RecipeForm).length).to.equal(1, 'Missing a RecipeForm Component');
  });

  it('always renders a `Recipes` components', () => {
    expect(wrapper.find(Recipes).length).to.equal(1, 'Missing a Recipes Component');
  });
});

