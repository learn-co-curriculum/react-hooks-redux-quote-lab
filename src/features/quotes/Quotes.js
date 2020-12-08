import React from "react";
import { useSelector } from "react-redux";
import QuoteCard from "./QuoteCard";

function Quotes() {
  const quotes = useSelector((state) => state.quotes);

  return (
    <div>
      <hr />
      <div className="row justify-content-center">
        <h2>Quotes</h2>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            {quotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quotes;
