import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPlanetesData,
  getVehcleData,
  displayNotification,
  resetAppFn,
  updateTrackerPlanet,
  updateTrackerVehicle
} from "./../actions/getDataAction";
import { bindActionCreators } from "redux";
import FilterBox from "./FilterBox";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleArr: [],
      planetsArr: [],
      trackObject: {},
      distance: 0
    };
    this.renderFilter = this.renderFilter.bind(this);
    this.selectPlanete = this.selectPlanete.bind(this);
    this.selectVehicle = this.selectVehicle.bind(this);
  }
  componentDidMount() {
    this.props.getPlanetesData();
    this.props.getVehcleData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.planetsArr !== this.props.planetsArr) {
      this.setState({
        planetsArr: JSON.parse(JSON.stringify(nextProps.planetsArr))
      });
    }
    if (nextProps.vehicleArr !== this.props.vehicleArr) {
      this.setState({
        vehicleArr: JSON.parse(JSON.stringify(nextProps.vehicleArr))
      });
    }
    if (nextProps.resetApp === true) {
      let planetsArr = JSON.parse(JSON.stringify(this.props.planetsArr));
      let vehicleArr = JSON.parse(JSON.stringify(this.props.vehicleArr));
      this.setState(
        {
          trackObject: {},
          distance: 0,
          planetsArr: planetsArr,
          vehicleArr: vehicleArr
        },
        () => {
          this.props.resetAppFn(false);
        }
      );
    }
    //return null;
  }
  selectPlanete(e) {
    let { planetsArr, vehicleArr } = this.state;
    //let { trackObject } = this.props;
    let flattenArr = e.target.value.split("-");

    // if (!trackObject[flattenArr[1]]) {
    //   trackObject[flattenArr[1]] = {};
    // }
    // let vehicleArrIndex = trackObject[flattenArr[1]].vehicle;
    // if (flattenArr[0]) {
    //   trackObject[flattenArr[1]]["planet"] = flattenArr[0];
    //   trackObject[flattenArr[1]]["planetValue"] = e.target.value;
    // } else {
    //   trackObject[flattenArr[1]]["planet"] = "";
    //   trackObject[flattenArr[1]]["vehicle"] = "";
    //   if (vehicleArrIndex) {
    //     vehicleArr[vehicleArrIndex].total_no =
    //       this.props.vehicleArr[vehicleArrIndex].total_no + 1;
    //   }
    // }
    this.props.updateTrackerPlanet(e.target.value);

    planetsArr.map((item, index) => {
      if (index === parseInt(flattenArr[0])) {
        item.disabled = true;
        item.currentIndex = flattenArr[1];
      } else {
        if (item.currentIndex === flattenArr[1]) {
          item.disabled = false;
          item.currentIndex = "";
        }
      }
      return item;
    });

    //}
    this.setState({
      planetsArr,
      //trackObject,
      vehicleArr
    });
  }
  selectVehicle(e) {
    let indexArr = e.target.value.split("-");
    let { vehicleArr, trackObject, planetsArr } = this.state;
    let oldVehicleIndex = trackObject[indexArr[1]]["vehicle"] || "";
    let max_distance = vehicleArr[indexArr[0]].max_distance;
    let planetDistance = planetsArr[indexArr[1]].distance;
    if (max_distance >= planetDistance) {
      trackObject[indexArr[1]]["vehicle"] = indexArr[0];
      trackObject[indexArr[1]]["vehicleChecked"] = true;

      vehicleArr[indexArr[0]].total_no =
        this.state.vehicleArr[indexArr[0]].total_no - 1;
      if (oldVehicleIndex) {
        vehicleArr[oldVehicleIndex].total_no =
          this.state.vehicleArr[oldVehicleIndex].total_no + 1;
      }
      this.setState({
        vehicleArr,
        trackObject
      });
    } else {
      this.props.displayNotification(
        `Planet distance ${planetDistance} is more then vehicle max distance ${max_distance}`
      );
    }
    //console.log("#### ", max_distance, planetDistance);
  }
  renderFilter() {
    console.log("changes");
    //debugger;
    let appGrid = [];
    for (let i = 0; i < 4; i++) {
      appGrid.push(
        <FilterBox
          key={i}
          planetsArr={this.state.planetsArr}
          vehicleArr={this.state.vehicleArr}
          selectPlanete={this.selectPlanete}
          trackObject={this.state.trackObject}
          selectVehicle={this.selectVehicle}
          parentIndex={i}
        ></FilterBox>
      );
    }
    return appGrid;
  }
  render() {
    let { vehicleArr, planetsArr, distance } = this.state;
    console.log(vehicleArr, planetsArr);
    return (
      <div className="row">
        {vehicleArr.length > 0 && planetsArr.length > 0 ? (
          <React.Fragment>
            {this.renderFilter()}
            <div className="col-sm">
              <h4>Time Taken:{distance}</h4>
            </div>
          </React.Fragment>
        ) : (
          "Loading 123..."
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    planetsArr: state.appsData.planetsArr,
    vehicleArr: state.appsData.vehicleArr,
    resetApp: state.appsData.resetApp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlanetesData: getPlanetesData,
      getVehcleData: getVehcleData,
      displayNotification: displayNotification,
      resetAppFn: resetAppFn,
      updateTrackerPlanet: updateTrackerPlanet,
      updateTrackerVehicle: updateTrackerVehicle
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
