import React from "react";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import Header from "./Header";

const middlewares = [];
const mockStore = configureStore(middlewares);
let initialData = {};
initialData["appsData"] = {};

const dummyProps = {
  notification: "error",
  resetAppFn: "fn()"
};

const store = mockStore(initialData);
describe("Test AppContainer", function() {
  const wrapper = mount(<Header store={store} {...dummyProps} />);
  it("match snapeshots", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("check header element", () => {
    expect(wrapper.find(".App-header").length).toBe(1);
  });
});
