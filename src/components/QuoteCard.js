import React from 'react';

const QuoteCard = ({ quote, removeQuote, upvoteQuote, downvoteQuote }) => 
  <div>
    <p>Quote: {quote.content} - Author: {quote.author} - Votes: {quote.votes}</p>
    <button onClick={() => removeQuote(quote.id)}>Delete Quote</button>
    <button onClick={() => upvoteQuote(quote.id)}>Upvote</button>
    <button onClick={() => downvoteQuote(quote.id)}>Downvote</button>
  </div>;

export default QuoteCard;