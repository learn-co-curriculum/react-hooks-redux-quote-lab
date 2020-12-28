import { v4 as uuid } from "uuid";

import reducer, {
  addQuote,
  removeQuote,
  upvoteQuote,
  downvoteQuote,
} from "../features/quotes/quotesSlice";

describe("Action Creators", () => {
  describe("addQuote(quote: {})", () => {
    test('returns an Object with a type of "quotes/add" and a quote object as a payload', () => {
      const quote = {
        content: "test quote",
        author: "test author",
        votes: 0,
        id: uuid(),
      };

      expect(addQuote(quote)).toEqual({
        type: "quotes/add",
        payload: quote,
      });
    });
  });

  describe("removeQuote(quoteId: Integer)", () => {
    test('returns an Object with a type of "quotes/remove" and a payload of a quoteId', () => {
      expect(removeQuote(10)).toEqual({
        type: "quotes/remove",
        payload: 10,
      });
    });
  });

  describe("upvoteQuote(quoteId: Integer)", () => {
    test('returns an Object with a type of "quotes/upvote" and a payload of a quoteId', () => {
      expect(upvoteQuote(10)).toEqual({
        type: "quotes/upvote",
        payload: 10,
      });
    });
  });

  describe("downvoteQuote(quoteId: Integer)", () => {
    test('returns an Object with a type of "quotes/downvote" and a payload of a quoteId', () => {
      expect(downvoteQuote(10)).toEqual({
        type: "quotes/downvote",
        payload: 10,
      });
    });
  });
});

describe("Quotes Reducer", () => {
  test("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  test("should handle 'quotes/add'", () => {
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
    ).toEqual([quote]);
  });

  test("should handle 'quotes/remove'", () => {
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
    ).toEqual([
      {
        id: secondId,
        content:
          "The artist is nothing without the gift, but the gift is nothing without work.",
        author: "Emile Zola",
        votes: 0,
      },
    ]);
  });

  test("should handle 'quotes/upvote'", () => {
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
        payload: firstId,
      })
    ).toEqual([
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 1,
      },
    ]);
  });

  test("should handle 'quotes/downvote' and decrement vote count down 1 if vote count is positive", () => {
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
    ).toEqual([
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 2,
      },
    ]);
  });

  test("should handle quotes/downvote and do nothing if vote count is 0", () => {
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
    ).toEqual([
      {
        id: firstId,
        content: "Moral indignation is jealousy with a halo.",
        author: "H.G. Wells",
        votes: 0,
      },
    ]);
  });
});
