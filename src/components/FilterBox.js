import React, { Component } from "react";
import PlanetsSelect from "./PlanetsSelect";
import VehicleSelect from "./VehicleSelect";

class FilterBox extends Component {
  render() {
    let { trackObject, parentIndex } = this.props;
    console.log(trackObject[parentIndex]);
    return (
      <div className="col-sm">
        <PlanetsSelect {...this.props}></PlanetsSelect>
        {trackObject[parentIndex] && trackObject[parentIndex]["planet"] && (
          <VehicleSelect {...this.props}></VehicleSelect>
        )}
      </div>
    );
  }
}

export default FilterBox;
