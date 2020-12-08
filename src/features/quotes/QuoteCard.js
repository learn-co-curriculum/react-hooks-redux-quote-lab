import React from "react";
import { useDispatch } from "react-redux";
import { downvoteQuote, removeQuote, upvoteQuote } from "./quotesSlice";

function QuoteCard({ quote }) {
  const dispatch = useDispatch();

  function handleUpvoteClick() {
    dispatch(upvoteQuote(quote.id));
  }

  function handleDownvoteClick() {
    dispatch(downvoteQuote(quote.id));
  }

  function handleDeleteClick() {
    dispatch(removeQuote(quote.id));
  }

  return (
    <div>
      <div className="card card-inverse card-success card-primary mb-3 text-center">
        <div className="card-block">
          <blockquote className="card-blockquote">
            <p>{quote.content}</p>
            <footer>
              - author <cite title="Source Title">{quote.author}</cite>
            </footer>
          </blockquote>
        </div>
        <div className="float-right">
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpvoteClick}
            >
              Upvote
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDownvoteClick}
            >
              Downvote
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div>Votes: {quote.votes}</div>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;
