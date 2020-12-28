import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "../reducer";
import QuoteCard from "../features/quotes/QuoteCard";

describe("QuoteCard props", () => {
  let quoteOne = {
    content: "test quote",
    author: "test author",
    votes: 0,
    id: 5,
  };

  beforeEach(() => {
    const store = createStore(rootReducer);

    render(
      <Provider store={store}>
        <QuoteCard quote={quoteOne} />
      </Provider>
    );
  });

  test("renders quote content from props.quote", () => {
    expect(screen.queryByText(/test quote/g)).toBeInTheDocument();
  });

  test("renders quote author from props.quote", () => {
    expect(screen.queryByText(/test author/g)).toBeInTheDocument();
  });

  test("renders quote votes from props.quote", () => {
    expect(screen.queryByText(/Votes: 0/g)).toBeInTheDocument();
  });
});

describe("QuoteCard events", () => {
  let store;

  beforeEach(() => {
    const quote = {
      content: "As you wish",
      author: "Wesley",
      votes: 999,
      id: 1,
    };
    store = createStore(rootReducer);

    store.dispatch({ type: "quotes/add", payload: quote });
    render(
      <Provider store={store}>
        <QuoteCard quote={quote} />
      </Provider>
    );
  });

  test("calls upvoteQuote action creator and updates the quote's vote count in the Redux store", () => {
    expect(screen.queryByText(/Votes: 999/g)).toBeInTheDocument();
    const button = screen.queryByText(/Upvote/);
    fireEvent.click(button);

    expect(store.getState().quotes).toHaveLength(1);
    expect(store.getState().quotes[0].votes.toString()).toBe("1000");
  });

  test("calls downvoteQuote action creator and updates the quote's vote count in the Redux store", () => {
    expect(screen.queryByText(/Votes: 999/g)).toBeInTheDocument();
    const button = screen.queryByText(/Downvote/);
    fireEvent.click(button);

    expect(store.getState().quotes).toHaveLength(1);
    expect(store.getState().quotes[0].votes.toString()).toBe("998");
  });
});
