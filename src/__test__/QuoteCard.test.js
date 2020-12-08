import React from "react";
import { configure, mount } from "enzyme";
import { expect } from "chai";
import { Provider } from "react-redux";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import store from "../store";
import QuoteCard from "../features/quotes/QuoteCard";

configure({ adapter: new Adapter() });

describe("QuoteCard Component", () => {
  let wrapper;

  let quoteOne = {
    content: "test quote",
    author: "test author",
    votes: 0,
    id: 5,
  };
  let quoteTwo = {
    content: "testing this quote",
    author: "authoring this test",
    votes: 10,
    id: 5,
  };

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <QuoteCard />
      </Provider>
    );
  });

  it("renders quote content from props.quote", () => {
    let quoteOneWrapper = mount(<QuoteCard quote={quoteOne} />);
    expect(quoteOneWrapper.html()).to.include("test quote");

    let quoteTwoWrapper = mount(<QuoteCard quote={quoteTwo} />);
    expect(quoteTwoWrapper.html()).to.include("testing this quote");
  });

  it("renders quote author from props.quote", () => {
    let quoteOneWrapper = mount(<QuoteCard quote={quoteOne} />);
    expect(quoteOneWrapper.html()).to.include("test author");

    let quoteTwoWrapper = mount(<QuoteCard quote={quoteTwo} />);
    expect(quoteTwoWrapper.html()).to.include("authoring this test");
  });

  it("renders quote votes from props.quote", () => {
    let quoteOneWrapper = mount(<QuoteCard quote={quoteOne} />);
    expect(quoteOneWrapper.html()).to.include("0");

    let quoteTwoWrapper = mount(<QuoteCard quote={quoteTwo} />);
    expect(quoteTwoWrapper.html()).to.include("10");
  });

  it("calls upvoteQuote action creator and updates the quote's vote count in the Redux store", () => {
    store.dispatch({
      type: "quotes/add",
      payload: { content: "As you wish", author: "Wesley", votes: 999, id: 1 },
    });

    let button = wrapper
      .find(QuoteCard)
      .findWhere(
        (n) =>
          n.html() ===
          '<button type="button" class="btn btn-primary">Upvote</button>'
      );
    button.simulate("click");
    expect(store.getState().quotes.length).to.equal(1);
    expect(store.getState().quotes[0].votes).to.be.oneOf([1000, "1000"]);
  });

  it("calls downvoteQuote action creator and updates the quote's vote count in the Redux store", () => {
    store.dispatch({
      type: "quotes/add",
      payload: { content: "Gently", author: "Wesley", votes: 1, id: 1 },
    });

    let button = wrapper
      .find(QuoteCard)
      .findWhere(
        (n) =>
          n.html() ===
          '<button type="button" class="btn btn-secondary">Downvote</button>'
      );

    button.simulate("click");
    expect(store.getState().quotes.length).to.equal(1);
    expect(store.getState().quotes[0].votes).to.be.oneOf([0, "0"]);
  });
});
