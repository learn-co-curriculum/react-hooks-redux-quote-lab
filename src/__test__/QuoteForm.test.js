import React from "react";
import { mount, configure } from "enzyme";
import chai, { expect } from "chai";
import spies from "chai-spies";
import { Provider } from "react-redux";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import store from "../store";
import QuoteForm from "../features/quotes/QuoteForm";

configure({ adapter: new Adapter() });

describe("QuoteForm Component", () => {
  let wrapper;
  chai.use(spies);

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <QuoteForm />
      </Provider>
    );
  });

  it("always renders a form tag", () => {
    const form = wrapper.find("form");

    expect(form.length).to.equal(1, "QuoteForm must contain a <form> tag");
  });

  it('always renders a textarea[name="content"] tag for quote content', () => {
    const input = wrapper.find('textarea[name="content"]');

    expect(input.length).to.equal(
      1,
      'QuoteForm must contain one <textarea name="content" /> tag'
    );
  });

  it('always renders a input[name="author"] tag for quote author', () => {
    const input = wrapper.find('input[name="author"]');

    expect(input.length).to.equal(
      1,
      'QuoteForm must contain one <input name="author" /> tag'
    );
  });

  it("should control its inputs based on internal state", () => {
    wrapper
      .find('input[name="author"]')
      .simulate("change", { target: { name: "author", value: "test author" } });
    wrapper.find('textarea[name="content"]').simulate("change", {
      target: { name: "content", value: "test content" },
    });

    expect(wrapper.find('input[name="author"]').html()).to.include(
      'value="test author"'
    );
    expect(wrapper.find('textarea[name="content"]').html()).to.include(
      "test content"
    );
  });

  it("should handleSubmit and preventDefault()", () => {
    const preventDefault = chai.spy(function () {});

    wrapper
      .find('input[name="author"]')
      .simulate("change", { target: { name: "author", value: "test author" } });
    wrapper.find('textarea[name="content"]').simulate("change", {
      target: { name: "content", value: "test content" },
    });
    wrapper.find("form").simulate("submit", { preventDefault });

    expect(preventDefault).to.have.been.called();
  });

  it("should reset state after form handleSubmit", () => {
    const preventDefault = chai.spy(function () {});

    wrapper
      .find('input[name="author"]')
      .simulate("change", { target: { name: "author", value: "test author" } });
    wrapper.find('textarea[name="content"]').simulate("change", {
      target: { name: "content", value: "test content" },
    });

    expect(wrapper.find('input[name="author"]').html()).to.include(
      'value="test author"'
    );
    expect(wrapper.find('textarea[name="content"]').html()).to.include(
      "test content"
    );

    wrapper.find("form").simulate("submit", { preventDefault });

    expect(wrapper.find('input[name="author"]').html()).to.include('value=""');
    expect(wrapper.find('textarea[name="content"]').html()).to.not.include(
      "test content"
    );
  });

  it("should modify the store on handleOnSubmit", () => {
    const quotesLength = store.getState().quotes.length;

    wrapper
      .find('input[name="author"]')
      .simulate("change", { target: { name: "author", value: "test author" } });
    wrapper.find('textarea[name="content"]').simulate("change", {
      target: { name: "content", value: "test content" },
    });

    expect(wrapper.find('input[name="author"]').html()).to.include(
      'value="test author"'
    );
    expect(wrapper.find('textarea[name="content"]').html()).to.include(
      "test content"
    );

    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(store.getState().quotes.length).to.equal(quotesLength + 1);
    expect(store.getState().quotes[quotesLength - 1].author).to.equal(
      "test author"
    );
    expect(store.getState().quotes[quotesLength - 1].content).to.equal(
      "test content"
    );
  });
});
