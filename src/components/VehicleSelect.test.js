import React from "react";
import configureStore from "redux-mock-store";
import { shallow, mount } from "enzyme";

import VehicleSelect from "./VehicleSelect";

const middlewares = [];
const mockStore = configureStore(middlewares);
let initialData = {};
initialData["appsData"] = {};

const dummyProps = {
  planetsArr: [
    { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
    { name: "Space rocket", total_no: 1, max_distance: 300, speed: 4 },
    { name: "Space shuttle", total_no: 1, max_distance: 400, speed: 5 },
    { name: "Space ship", total_no: 2, max_distance: 600, speed: 10 }
  ],
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
  const wrapper = shallow(<VehicleSelect {...dummyProps} />);
  it("match snapeshots", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
