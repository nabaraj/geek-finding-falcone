import React, { Component } from "react";

class PlanetsSelect extends Component {
  render() {
    let { parentIndex, trackObject, planetsArr } = this.props;
    let defaultValue = trackObject[parentIndex]
      ? this.props.trackObject[parentIndex].planetValue
      : `-${parentIndex}`;
    return (
      <div className="form-group">
        <select
          onChange={this.props.selectPlanete}
          value={defaultValue}
          className="form-control"
        >
          <option defaultValue value={`-${parentIndex}`}>
            Select Planet
          </option>
          {planetsArr.map((item, index) => {
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
