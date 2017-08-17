import uuid from 'uuid';
import reducer from '../src/reducers/ingredients';
import { expect } from 'chai';

describe('Ingredients Reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal([]);
  });

  it('should handle ADD_INGREDIENT', () => {
    const ingredient = {
      id: uuid(),
      name: 'flour'
    };

    expect(reducer(undefined, {
      type: 'ADD_INGREDIENT',
      ingredient
    })).to.deep.equal([ingredient]);
  });

  it('should handle REMOVE_INGREDIENT', () => {
    const firstID = uuid();
    const secondID = uuid();
    const initialState = [
      {
        id: firstID,
        name: 'flour'
      }, {
        id: secondID,
        name: 'salt'
      }
    ];

    expect(reducer(initialState, {
      type: 'REMOVE_INGREDIENT',
      id: firstID
    })).to.deep.equal([
      {
        id: secondID,
        name: 'salt'
      }
    ]);
  });
});