import React, { Component } from "react";

class PlanetsSelect extends Component {
  render() {
    let { parentIndex, trackObject, planetsArr } = this.props;
    console.log(
      "##### ",
      trackObject[parentIndex] ? trackObject[parentIndex].planet : {}
    );
    let defaultValue = this.props.trackObject[parentIndex]
      ? this.props.trackObject[parentIndex].planetValue
      : `-${parentIndex}`;
    return (
      <div>
        <select onChange={this.props.selectPlanete} value={defaultValue}>
          <option defaultValue value={`-${parentIndex}`}>
            Select Planet
          </option>
          {this.props.planetsArr.map((item, index) => {
            return (
              <option
                key={`${item.name}-${index}`}
                value={`${index}-${parentIndex}`}
                disabled={item.disabled}
              >
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default PlanetsSelect;
