import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../store";
import App from "../App";

beforeEach(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

test('renders an h1 tag with "Quote Maker"', () => {
  const header = screen.queryByText(/Quote Maker/g);

  expect(header).toBeInTheDocument();
  expect(header.tagName).toBe("H1");
});

test("renders a `QuoteForm` component", () => {
  expect(screen.queryByText(/Add/)).toBeInTheDocument();
});

test("renders a `Quotes` components", () => {
  const h2 = screen.queryByText(/Quotes/g);

  expect(h2).toBeInTheDocument();
  expect(h2.tagName).toBe("H2");
});
