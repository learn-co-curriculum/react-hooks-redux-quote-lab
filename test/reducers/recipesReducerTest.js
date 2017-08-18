import uuid from 'uuid';
import { expect } from 'chai';
import reducer from '../../src/reducers/recipes';

describe('Recipes Reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal([]);
  });

  it('should handle ADD_RECIPE', () => {
    const recipe = {
      id: uuid(),
      name: 'cookies',
      ingredientIds: [2,4]
    };

    expect(reducer(undefined, {
      type: 'ADD_RECIPE',
      recipe
    })).to.deep.equal([recipe]);
  });

  it('should handle REMOVE_RECIPE', () => {
    const firstID = uuid();
    const secondID = uuid();
    const initialState = [
      {
        id: firstID,
        name: 'cookies',
        ingredientIds: [1,2,3]
      }, {
        id: secondID,
        name: 'pizza',
        ingredientIds: [2,3,4]
      }
    ];

    expect(reducer(initialState, {
      type: 'REMOVE_RECIPE',
      id: firstID
    })).to.deep.equal([
      {
        id: secondID,
        name: 'pizza',
        ingredientIds: [2,3,4]
      }
    ]);
  });

  it('should handle REMOVE_INGREDIENT', () => {
    const firstID = uuid();
    const recipe = {
      id: firstID,
      name: 'cookies',
      ingredientIds: [1,2,3]
    };

    expect(reducer([recipe], {
      type: 'REMOVE_INGREDIENT',
      id: 2
    })).to.deep.equal([
      {
        id: firstID,
        name: 'cookies',
        ingredientIds: [1,3]
      }
    ]);
  });
});