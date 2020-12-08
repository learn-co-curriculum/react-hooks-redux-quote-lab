// Action Creators
export function addQuote(quote) {
  return {
    type: "quotes/add",
    payload: quote,
  };
}

export function removeQuote(quoteId) {
  return {
    type: "quotes/remove",
    payload: quoteId,
  };
}

export function upvoteQuote(quoteId) {
  return {
    type: "quotes/upvote",
    payload: quoteId,
  };
}

export function downvoteQuote(quoteId) {
  return {
    type: "quotes/downvote",
    payload: quoteId,
  };
}

// Reducer
const initialState = [];

export default function quotesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "quotes/add":
      return [...state, payload];
    case "quotes/remove":
      return state.filter((quote) => quote.id !== payload);
    case "quotes/upvote":
      return state.map((quote) => {
        if (quote.id === payload) {
          return {
            ...quote,
            votes: quote.votes + 1,
          };
        } else {
          return quote;
        }
      });
    case "quotes/downvote":
      return state.map((quote) => {
        if (quote.id === payload && quote.votes > 0) {
          return {
            ...quote,
            votes: quote.votes - 1,
          };
        } else {
          return quote;
        }
      });
    default:
      break;
  }
  return state;
}
