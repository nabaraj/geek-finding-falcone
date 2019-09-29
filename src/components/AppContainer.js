import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPlanetesData,
  getVehcleData,
  displayNotification,
  resetAppFn,
  submitResult
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
      distance: { total: 0 },
      columnCount: 4,
      disabled: true
    };
    this.renderFilter = this.renderFilter.bind(this);
    this.selectPlanete = this.selectPlanete.bind(this);
    this.selectVehicle = this.selectVehicle.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.renderResult = this.renderResult.bind(this);
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
          distance: {},
          planetsArr: planetsArr,
          vehicleArr: vehicleArr,
          trackObject: {}
        },
        () => {
          this.props.resetAppFn(false);
        }
      );
    }
    //return null;
  }
  // reset vehicleArr if default value is selected
  selectPlanete(e) {
    let { planetsArr, vehicleArr, trackObject } = this.state;
    let flattenArr = e.target.value.split("-");

    if (!trackObject[flattenArr[1]]) {
      trackObject[flattenArr[1]] = {};
    }
    let vehicleArrIndex = trackObject[flattenArr[1]]
      ? trackObject[flattenArr[1]].vehicle
      : null;

    trackObject[flattenArr[1]]["planet"] = flattenArr[0] ? flattenArr[0] : "";
    trackObject[flattenArr[1]]["planetName"] = flattenArr[0]
      ? planetsArr[flattenArr[0]].name
      : "";

    trackObject[flattenArr[1]]["vehicle"] = "";
    //update vehicle index after each select planet
    if (vehicleArrIndex) {
      vehicleArr[vehicleArrIndex].total_no =
        vehicleArr[vehicleArrIndex].total_no + 1 >
        this.props.vehicleArr[vehicleArrIndex].total_no
          ? this.props.vehicleArr[vehicleArrIndex].total_no
          : vehicleArr[vehicleArrIndex].total_no + 1;
    }
    trackObject[flattenArr[1]]["planetValue"] = e.target.value;
    //this.props.updateTrackerPlanet(e.target.value);

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
    this.setState(
      {
        planetsArr,
        trackObject,
        vehicleArr
      },
      this.calculateDistance
    );
  }

  // on select vehicle update the total vahicle count in vehicleArr
  // need to check max_distance and planet distance
  // update trackObject vehicle and vehicleChecked

  selectVehicle(e) {
    let indexArr = e.target.value.split("-");
    let { vehicleArr, planetsArr, trackObject } = this.state;

    let oldVehicleIndex = trackObject[indexArr[1]]["vehicle"] || "";
    let max_distance = vehicleArr[indexArr[0]].max_distance;
    let planetDistance = planetsArr[indexArr[1]].distance;
    if (max_distance >= planetDistance) {
      trackObject[indexArr[1]]["vehicle"] = indexArr[0];
      trackObject[indexArr[1]]["vehicleName"] = vehicleArr[indexArr[0]].name;
      trackObject[indexArr[1]]["vehicleChecked"] = true;

      vehicleArr[indexArr[0]].total_no =
        this.state.vehicleArr[indexArr[0]].total_no - 1;
      if (oldVehicleIndex) {
        vehicleArr[oldVehicleIndex].total_no =
          this.state.vehicleArr[oldVehicleIndex].total_no + 1;
      }

      this.setState(
        {
          vehicleArr,
          trackObject
        },
        this.calculateDistance
      );
    } else {
      this.props.displayNotification(
        `Planet's distance is more then vehicle's max distance`
      );
    }
  }

  //method to add filter component
  renderFilter() {
    let appGrid = [];
    for (let i = 0; i < this.state.columnCount; i++) {
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
  // calculate the total distance

  calculateDistance() {
    let disabled = true;
    let counter = 0;
    let { trackObject, planetsArr, vehicleArr, distance } = this.state;
    let distanceTotal = 0;
    Object.keys(trackObject).map((item, index) => {
      if (trackObject[item].vehicle && trackObject[item].planet) {
        let vehicleSpeed = vehicleArr[trackObject[item].vehicle].speed;
        let planetDistance = planetsArr[trackObject[item].planet].distance;
        distanceTotal = distanceTotal + planetDistance / vehicleSpeed;
        counter++;
      }
    });
    distance.total = distanceTotal;
    if (counter === this.state.columnCount) {
      disabled = false;
    }
    this.setState({ disabled, distance });
  }
  renderResult(result) {
    return (
      <div className="text-center col-sm-12">
        {result.status && result.status !== "false" ? (
          <React.Fragment>
            <h5>
              Success! Congratulations on Finding Falcon. King Shan is mighty
              pleased.
            </h5>
            <h5>{`Time Taken: ${this.state.distance.total}`}</h5>
            <h5>{`Planet found: ${result.planet_name}`}</h5>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h5>Could not not found, try again.</h5>
          </React.Fragment>
        )}
      </div>
    );
  }
  render() {
    let { vehicleArr, planetsArr, distance, disabled } = this.state;
    return (
      <div className="row">
        {this.props.result ? (
          this.renderResult(this.props.result)
        ) : (
          <React.Fragment>
            <div className="col-sm-12">
              <h3 className="text-center">
                Select Planes You Want To Search In
              </h3>
            </div>
            {vehicleArr.length > 0 && planetsArr.length > 0 ? (
              <React.Fragment>
                {this.renderFilter()}
                <div className="col-sm">
                  <h4>Time Taken:{distance.total}</h4>
                </div>
                <div className="col-sm-12 text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={disabled}
                    onClick={e =>
                      this.props.submitResult(this.state.trackObject)
                    }
                  >
                    Submit
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <div className="col-sm-12 text-center">
                <h5>"Loading ..."</h5>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    planetsArr: state.appsData.planetsArr,
    vehicleArr: state.appsData.vehicleArr,
    resetApp: state.appsData.resetApp,
    result: state.appsData.result
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlanetesData: getPlanetesData,
      getVehcleData: getVehcleData,
      displayNotification: displayNotification,
      resetAppFn: resetAppFn,
      submitResult: submitResult
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
