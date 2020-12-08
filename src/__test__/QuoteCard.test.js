import React from "react";
import { configure, mount } from "enzyme";
import { expect } from "chai";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import rootReducer from "../reducer";
import QuoteCard from "../features/quotes/QuoteCard";

configure({ adapter: new Adapter() });

describe("QuoteCard props", () => {
  let store;
  let wrapper;
  let wrapperTwo;

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
    store = createStore(rootReducer);
    wrapper = mount(
      <Provider store={store}>
        <QuoteCard quote={quoteOne} />
        );
      </Provider>
    );
    wrapperTwo = mount(
      <Provider store={store}>
        <QuoteCard quote={quoteTwo} />
        );
      </Provider>
    );
  });

  it("renders quote content from props.quote", () => {
    expect(wrapper.html()).to.include("test quote");

    expect(wrapperTwo.html()).to.include("testing this quote");
  });

  it("renders quote author from props.quote", () => {
    expect(wrapper.html()).to.include("test author");

    expect(wrapperTwo.html()).to.include("authoring this test");
  });

  it("renders quote votes from props.quote", () => {
    expect(wrapper.html()).to.include("Votes: 0");

    expect(wrapperTwo.html()).to.include("Votes: 10");
  });
});

describe("QuoteCard events", () => {
  let store;
  let wrapper;
  let quote = { content: "As you wish", author: "Wesley", votes: 999, id: 1 };

  beforeEach(() => {
    store = createStore(rootReducer);

    store.dispatch({ type: "quotes/add", payload: quote });
    wrapper = mount(
      <Provider store={store}>
        <QuoteCard quote={quote} />
      </Provider>
    );
  });

  it("calls upvoteQuote action creator and updates the quote's vote count in the Redux store", () => {
    expect(wrapper.html()).to.include("Votes: 999");
    let button = wrapper.find(".btn-primary");
    button.simulate("click");
    expect(store.getState().quotes.length).to.equal(1);
    expect(store.getState().quotes[0].votes).to.be.oneOf([1000, "1000"]);
  });

  it("calls downvoteQuote action creator and updates the quote's vote count in the Redux store", () => {
    expect(wrapper.html()).to.include("Votes: 999");
    let button = wrapper.find(".btn-secondary");
    button.simulate("click");
    expect(store.getState().quotes.length).to.equal(1);
    expect(store.getState().quotes[0].votes).to.be.oneOf([998, "998"]);
  });
});
