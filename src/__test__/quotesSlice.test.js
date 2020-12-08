import { expect } from "chai";
import { v4 as uuid } from "uuid";

import reducer, {
  addQuote,
  removeQuote,
  upvoteQuote,
  downvoteQuote,
} from "../features/quotes/quotesSlice";

describe("Action Creators", () => {
  describe("addQuote(quote: {})", () => {
    it('should return an Object with a type of "quotes/add" and a quote object as a payload', () => {
      const quote = {
        content: "test quote",
        author: "test author",
        votes: 0,
        id: uuid(),
      };

      expect(addQuote(quote)).to.deep.equal({
        type: "quotes/add",
        payload: quote,
      });
    });
  });

  describe("removeQuote(quoteId: Integer)", () => {
    it('should return an Object with a type of "quotes/remove" and a payload of a quoteId', () => {
      expect(removeQuote(10)).to.deep.equal({
        type: "quotes/remove",
        payload: 10,
      });
    });
  });

  describe("upvoteQuote(quoteId: Integer)", () => {
    it('should return an Object with a type of "quotes/upvote" and a payload of a quoteId', () => {
      expect(upvoteQuote(10)).to.deep.equal({
        type: "quotes/upvote",
        payload: 10,
      });
    });
  });

  describe("downvoteQuote(quoteId: Integer)", () => {
    it('should return an Object with a type of "quotes/downvote" and a payload of a quoteId', () => {
      expect(downvoteQuote(10)).to.deep.equal({
        type: "quotes/downvote",
        payload: 10,
      });
    });
  });
});

describe("Quotes Reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).to.deep.equal([]);
  });

  it("should handle 'quotes/add'", () => {
    const quote = {
      id: uuid(),
      content: "Moral indignation is jealousy with a halo.",
      author: "H.G. Wells",
      votes: 0,
    };

    expect(
      reducer(undefined, {
        type: "quotes/add",
        payload: quote,
      })
    ).to.deep.equal([quote]);
  });

  it("should handle 'quotes/remove'", () => {
    const firstId = uuid();
    const secondId = uuid();
    const initialState = [
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 0,
      },
      {
        id: secondId,
        content:
          "The artist is nothing without the gift, but the gift is nothing without work.",
        author: "Emile Zola",
        votes: 0,
      },
    ];

    expect(
      reducer(initialState, {
        type: "quotes/remove",
        payload: firstId,
      })
    ).to.deep.equal([
      {
        id: secondId,
        content:
          "The artist is nothing without the gift, but the gift is nothing without work.",
        author: "Emile Zola",
        votes: 0,
      },
    ]);
  });

  it("should handle 'quotes/upvote'", () => {
    const firstId = uuid();
    const initialState = [
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 0,
      },
    ];

    expect(
      reducer(initialState, {
        type: "quotes/upvote",
        quoteId: firstId,
      })
    ).to.deep.equal([
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 1,
      },
    ]);
  });

  it("should handle 'quotes/downvote' and decrement vote count down 1 if vote count is positive", () => {
    const firstId = uuid();
    const initialState = [
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 3,
      },
    ];

    expect(
      reducer(initialState, {
        type: "quotes/downvote",
        payload: firstId,
      })
    ).to.deep.equal([
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 2,
      },
    ]);
  });

  it("should handle quotes/downvote and do nothing if vote count is 0", () => {
    const firstId = uuid();
    const initialState = [
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 0,
      },
    ];

    expect(
      reducer(initialState, {
        type: "quotes/downvote",
        payload: firstId,
      })
    ).to.deep.equal([
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 0,
      },
    ]);
  });
});
