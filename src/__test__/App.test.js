import React from "react";
import { configure, mount } from "enzyme";
import { expect } from "chai";
import { Provider } from "react-redux";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import store from "../store";
import App from "../App";
import Quotes from "../features/quotes/Quotes";
import QuoteForm from "../features/quotes/QuoteForm";

configure({ adapter: new Adapter() });

describe("App Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('always renders an h1 tag with "Quote Maker"', () => {
    const headerTags = wrapper.find("h1");

    expect(headerTags.length).to.equal(1);
    expect(headerTags.text()).to.equal(
      "Quote Maker",
      "H1 Tag text does not match"
    );
  });

  it("always renders a `QuoteForm` component", () => {
    expect(wrapper.find(QuoteForm).length).to.equal(
      1,
      "Missing a QuoteForm Component"
    );
  });

  it("always renders a `Quotes` components", () => {
    expect(wrapper.find(Quotes).length).to.equal(
      1,
      "Missing a Quotes Component"
    );
  });
});
