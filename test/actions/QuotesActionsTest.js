import { expect } from 'chai';
import uuid from 'uuid';
import {
  addQuote,
  removeQuote,
  upvoteQuote,
  downvoteQuote
} from '../../src/actions/quotes';


describe('Quotes Actions', () => {
  describe('addQuote(quote: {})', () => {
    it('should return an Object with a type of "ADD_QUOTE" and a quote object', () => {
      const quote = {
        content: 'test quote',
        author: 'test author',
        votes: 0,
        id: uuid()
      }

      expect(addQuote(quote)).to.deep.equal({
        type: 'ADD_QUOTE',
        quote
      });
    });
  });

  describe('removeQuote(quoteId: Integer)', () => {
    it('should return an Object with a type of "REMOVE_QUOTE" and a quoteId', () => {
      expect(removeQuote(10)).to.deep.equal({
        type: 'REMOVE_QUOTE',
        quoteId: 10
      });
    });
  });

  describe('upvoteQuote(quoteId: Integer)', () => {
    it('should return an Object with a type of "UPVOTE_QUOTE" and a quoteId', () => {
      expect(upvoteQuote(10)).to.deep.equal({
        type: 'UPVOTE_QUOTE',
        quoteId: 10
      });
    });
  });

  describe('downvoteQuote(quoteId: INteger)', () => {
    it('should return an Object with a type of "DOWNVOTE_QUOTE" and a quoteId', () => {
      expect(downvoteQuote(10)).to.deep.equal({
        type: 'DOWNVOTE_QUOTE',
        quoteId: 10
      });
    });
  });
});
