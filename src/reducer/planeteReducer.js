import * as types from "../actions/types";
let initialData = {
  planetsArr: [],
  vehicleArr: [],
  mixObject: {},
  trackObject: {},
  notificationObject: "",
  resetApp: false
};

const appReducer = (state = initialData, action) => {
  switch (action.type) {
    case types.STORE_PLANETS_DATA:
      return Object.assign({}, state, {
        planetsArr: [...action.payload]
      });
    case types.STORE_VEHICLE_DATA:
      return Object.assign({}, state, {
        vehicleArr: [...action.payload]
      });
    case types.SHOW_NOTIFICATION:
      return Object.assign({}, state, { notificationObject: action.payload });
    case types.RESET_APP:
      return Object.assign({}, state, { resetApp: action.payload });
    case types.SELECT_PLANET:
      let trackObject = state.trackObject;
      let flattenArr = action.payload.split("-");
      if (!trackObject[flattenArr[1]]) {
        trackObject[flattenArr[1]] = {};
      }
      let vehicleArrIndex = trackObject[flattenArr[1]].vehicle;
      if (flattenArr[0]) {
        trackObject[flattenArr[1]]["planet"] = flattenArr[0];
        trackObject[flattenArr[1]]["planetValue"] = action.payload;
      } else {
        trackObject[flattenArr[1]]["planet"] = "";
        trackObject[flattenArr[1]]["vehicle"] = "";
        if (vehicleArrIndex) {
          vehicleArr[vehicleArrIndex].total_no =
            this.props.vehicleArr[vehicleArrIndex].total_no + 1;
        }
      }
      return Object.assign({}, state, { trackObject: trackObject });
    default:
      return state;
  }
};

export default appReducer;
