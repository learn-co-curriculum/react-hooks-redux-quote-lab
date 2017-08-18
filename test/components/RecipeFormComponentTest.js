import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import RecipeForm from '../../src/containers/RecipeForm';

describe('RecipeForm Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RecipeForm />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeForm />, div);
  });

  it('has a default state', () => {
    expect(wrapper.state()).to.deep.equal({
      name: '',
      ingredientIds: []
    });
  });

  it('always renders an form tag', () => {
    const form = wrapper.find('form');

    expect(form.length).to.equal(1, 'RecipeForm must contain a <form> tag');
  });

  it('always renders a input[name="name"] for a recipe name', () => {
    const input = wrapper.find('input[name="name"]');

    expect(input.length).to.equal(1, 'RecipeForm must contain one <input name="name" /> tag');
  });

  it('should pass a new value to state using the handleOnChange function', () => {

    wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'cookies' }});

    expect(wrapper.state()).to.deep.equal({
      name: 'cookies',
      ingredientIds: []
    });
  });
});

