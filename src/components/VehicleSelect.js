import React, { Component } from "react";

class VehicleSelect extends Component {
  render() {
    let { vehicleArr, parentIndex, trackObject } = this.props;
    return (
      <div>
        <ul className="list-unstyled">
          {vehicleArr.map((item, index) => {
            let checked = false;
            let radioId = `${item.name
              .toLowerCase()
              .split(" ")
              .join("-")}-${parentIndex}`;
            if (
              index === parseInt(trackObject[parentIndex].vehicle) &&
              trackObject[parentIndex].vehicleChecked
            ) {
              checked = true;
            }
            return (
              <li key={item.name} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={`${index}-${parentIndex}`}
                  name={`radio-${parentIndex}`}
                  onChange={this.props.selectVehicle}
                  disabled={item.total_no === 0 ? true : false}
                  id={`${radioId}`}
                  checked={checked}
                />
                <label htmlFor={`${radioId}`} className="form-check-label">
                  {item.name}({item.total_no})
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default VehicleSelect;
