import React from "react";
import configureStore from "redux-mock-store";
import { shallow } from "enzyme";
import App from "./App";

const middlewares = [];
const mockStore = configureStore(middlewares);
let initialData = {};
initialData["appsData"] = {};

const dummyProps = {
  planetsArr: ["Object", "Object", "Object", "Object", "Object", "Object"],
  vehicleArr: ["Object", "Object", "Object", "Object"],
  selectPlanete: "bound selectPlanete()",
  trackObject: {
    "0": "Object",
    "1": "Object",
    "2": "Object",
    "3": "Object"
  },
  selectVehicle: "bound selectVehicle()",
  parentIndex: 0
};

const store = mockStore(initialData);

describe("Test AppContainer", function() {
  const wrapper = shallow(<App store={store} {...dummyProps} />);
  it("match snapeshots", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
