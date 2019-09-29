import React from "react";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import PlanetsSelect from "./PlanetsSelect";

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
  const wrapper = mount(<PlanetsSelect store={store} {...dummyProps} />);
  it("match snapeshots", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("check select component", () => {
    expect(wrapper.find(".form-control").length).toBe(1);
  });
  it("check select component", () => {
    expect(wrapper.find(".form-control").find("option").length).toBe(
      dummyProps.planetsArr.length + 1
    );
  });
});
