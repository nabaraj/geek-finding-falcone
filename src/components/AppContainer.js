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
      disabled: true,
      progress: 0,
      loading: false
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
          distance: { total: 0 },
          planetsArr: planetsArr,
          vehicleArr: vehicleArr,
          trackObject: {}
        },
        () => {
          this.calculateDistance();
          this.props.resetAppFn(false);
        }
      );
    }
    //return null;
  }
  /**  
    reset vehicleArr if default value is selected
    calculate distance
  * @param {String} selectedPlanet - selected planet index and parent filterbox index
  */
  selectPlanete(selectedPlanet) {
    let { planetsArr, vehicleArr, trackObject } = this.state;
    let flattenArr = selectedPlanet.split("-");

    //assign empty object to trackObject with parent index for first time
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

    //update vehicle quantity after each select planet
    if (vehicleArrIndex) {
      vehicleArr[vehicleArrIndex].total_no =
        vehicleArr[vehicleArrIndex].total_no + 1 >
        this.props.vehicleArr[vehicleArrIndex].total_no
          ? this.props.vehicleArr[vehicleArrIndex].total_no
          : vehicleArr[vehicleArrIndex].total_no + 1;
    }
    trackObject[flattenArr[1]]["planetValue"] = selectedPlanet;
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

  /** 
   on select vehicle update the total vahicle count in vehicleArr
   check max_distance and planet distance
   update trackObject vehicle and vehicleChecked
   calculate distance
   @param {Object} vehicle- selected vehicle index and parent filterbox index
   
*/
  selectVehicle(e) {
    let indexArr = e.target.value.split("-");
    let { vehicleArr, planetsArr, trackObject } = this.state;

    let oldVehicleIndex = trackObject[indexArr[1]]["vehicle"] || "";
    let planetIndex = trackObject[indexArr[1]]["planet"];
    let max_distance = vehicleArr[indexArr[0]].max_distance;
    let planetDistance = planetsArr[planetIndex].distance;
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
          resetApp={this.props.resetApp}
        ></FilterBox>
      );
    }
    return appGrid;
  }

  /* 
  calculate the total distance and enable submit button
  will check all filter box planet and vehicle selected 
*/
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
    this.setState({
      disabled,
      distance,
      progress: counter / this.state.columnCount
    });
  }

  /**
   * display result for find end point
   * handle false result
   * @param {object} result -  got from find end poin
   */
  renderResult(result) {
    return (
      <div className="text-center col-sm-12">
        {result.status && result.status !== "false" ? (
          <React.Fragment>
            <h5 className="helperText">
              Success! Congratulations on Finding Falcon. King Shan is mighty
              pleased.
            </h5>
            <h5>{`Time Taken: ${this.state.distance.total}`}</h5>
            <h5>{`Planet found: ${result.planet_name}`}</h5>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h5 className="helperText">Could not found, try again.</h5>
          </React.Fragment>
        )}
      </div>
    );
  }
  render() {
    let { vehicleArr, planetsArr, distance, disabled, progress } = this.state;
    let { loading } = this.props;
    let disabledStatus = disabled || loading;

    let progressStyle = { width: `${progress * 100}%` };
    return (
      <div className="row">
        {this.props.result ? (
          this.renderResult(this.props.result)
        ) : (
          <React.Fragment>
            <div className="col-sm-12">
              <h6 className="text-center helperText">
                Select Planes You Want To Search In
              </h6>
            </div>
            {vehicleArr.length > 0 && planetsArr.length > 0 ? (
              <React.Fragment>
                {/* render filter box start */}
                {this.renderFilter()}
                {/* render filter box end */}

                <div className="col-sm">
                  <h4>Time Taken:{distance.total}</h4>
                </div>
                {/* button container */}
                <div className="col-sm-12 text-center">
                  <button
                    type="button"
                    className="btn btn-outline-purple"
                    disabled={disabledStatus}
                    onClick={e =>
                      this.props.submitResult(this.state.trackObject)
                    }
                  >
                    Find Falcon!
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {!loading && (
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped bg-purple"
                          role="progressbar"
                          style={progressStyle}
                          aria-valuenow="10"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    )}
                  </button>
                </div>
                {/* button container */}
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
    result: state.appsData.result,
    loading: state.appsData.appResultStatus
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
