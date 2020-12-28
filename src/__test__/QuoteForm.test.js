import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import QuoteForm from "../features/quotes/QuoteForm";

beforeEach(() => {
  render(
    <Provider store={store}>
      <QuoteForm />
    </Provider>
  );
});

test('renders a textarea[name="content"] tag for quote content', () => {
  const input = screen.queryByLabelText(/Quote/);

  expect(input).toBeInTheDocument();
  expect(input.tagName).toBe("TEXTAREA");
  expect(input.name).toBe("content");
});

test('renders a input[name="author"] tag for quote author', () => {
  const input = screen.queryByLabelText(/Author/);

  expect(input).toBeInTheDocument();
  expect(input.tagName).toBe("INPUT");
  expect(input.name).toBe("author");
});

test("controls its inputs based on internal state", () => {
  const authorInput = screen.queryByLabelText(/Author/);
  const contentInput = screen.queryByLabelText(/Quote/);

  fireEvent.change(authorInput, {
    target: { name: "author", value: "test author" },
  });
  fireEvent.change(contentInput, {
    target: { name: "content", value: "test content" },
  });

  expect(authorInput.value).toBe("test author");
  expect(contentInput.value).toBe("test content");
});

test("handles the form submit and calls preventDefault()", () => {
  fireEvent.change(screen.queryByLabelText(/Author/), {
    target: { name: "author", value: "test author" },
  });
  fireEvent.change(screen.queryByLabelText(/Quote/), {
    target: { name: "content", value: "test content" },
  });

  const isPrevented = fireEvent.submit(screen.queryByText(/Add/));

  expect(isPrevented).toBe(false);
});

test("resets state after form submit", () => {
  const authorInput = screen.queryByLabelText(/Author/);
  const contentInput = screen.queryByLabelText(/Quote/);

  fireEvent.change(authorInput, {
    target: { name: "author", value: "test author" },
  });
  fireEvent.change(contentInput, {
    target: { name: "content", value: "test content" },
  });

  const isPrevented = fireEvent.submit(screen.queryByText(/Add/));

  expect(isPrevented).toBe(false);

  expect(authorInput.value).toBe("");
  expect(contentInput.value).toBe("");
});

test("adds a new quote to the store on submit", () => {
  const quotesLength = store.getState().quotes.length;

  const authorInput = screen.queryByLabelText(/Author/);
  const contentInput = screen.queryByLabelText(/Quote/);

  fireEvent.change(authorInput, {
    target: { name: "author", value: "test author" },
  });
  fireEvent.change(contentInput, {
    target: { name: "content", value: "test content" },
  });

  expect(authorInput.value).toBe("test author");
  expect(contentInput.value).toBe("test content");

  fireEvent.submit(screen.queryByText(/Add/));

  expect(store.getState().quotes.length).toBe(quotesLength + 1);
  expect(store.getState().quotes[quotesLength - 1].author).toBe("test author");
  expect(store.getState().quotes[quotesLength - 1].content).toBe(
    "test content"
  );
});
