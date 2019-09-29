import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import { shallow } from "enzyme";
import {
  getPlanetesData,
  getVehcleData,
  displayNotification,
  resetAppFn,
  submitResult
} from "./../actions/getDataAction";
import AppContainer from "./../components/AppContainer";

const middlewares = [];
const mockStore = configureStore(middlewares);
let initialData = {};
initialData["appsData"] = {};
const store = mockStore(initialData);
describe("Test AppContainer", function() {
  //before;
  const wrapper = shallow(<AppContainer store={store} />).dive();
  it("match snapeshots", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
