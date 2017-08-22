import uuid from 'uuid';

export const addQuote = quote => {
  return {
    type: 'ADD_QUOTE',
    quote: Object.assign({}, quote, { id: uuid(), votes: 0 })
  }
}

export const removeQuote = quoteId => {
  return {
    type: 'REMOVE_QUOTE',
    quoteId
  }
}

export const upvoteQuote = quoteId => {
  return {
    type: 'UPVOTE_QUOTE',
    quoteId
  }
}

export const downvoteQuote = quoteId => {
  return {
    type: 'DOWNVOTE_QUOTE',
    quoteId
  }
}
