import * as types from "../actions/types";
let initialData = {
  planetsArr: [],
  vehicleArr: [],
  mixObject: {},
  trackObject: {},
  notificationObject: "",
  resetApp: false,
  result: null
};

const appReducer = (state = initialData, action) => {
  let { trackObject, result } = state;
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
      if (action.payload) {
        trackObject = {};
        result = null;
      }
      return Object.assign({}, state, {
        resetApp: action.payload,
        trackObject,
        result
      });
    // case types.SELECT_PLANET:
    //   trackObject = state.trackObject;
    //   let flattenArr = action.payload.split("-");
    //   if (!trackObject[flattenArr[1]]) {
    //     trackObject[flattenArr[1]] = {};
    //   }
    //   //let vehicleArrIndex = trackObject[flattenArr[1]].vehicle;
    //   if (flattenArr[0]) {
    //     trackObject[flattenArr[1]]["planet"] = flattenArr[0];
    //     trackObject[flattenArr[1]]["planetValue"] = action.payload;
    //   } else {
    //     trackObject[flattenArr[1]]["planet"] = "";
    //     trackObject[flattenArr[1]]["vehicle"] = "";
    //     trackObject[flattenArr[1]]["planetValue"] = "";
    //     // if (vehicleArrIndex) {
    //     //   vehicleArr[vehicleArrIndex].total_no =
    //     //     this.props.vehicleArr[vehicleArrIndex].total_no + 1;
    //     // }
    //   }
    //   return Object.assign({}, state, { trackObject: trackObject });
    // case types.SELECT_VEHICLE:
    //   trackObject = state.trackObject;
    //   let indexArr = action.payload;
    //   trackObject[indexArr[1]]["vehicle"] = indexArr[0];
    //   trackObject[indexArr[1]]["vehicleChecked"] = true;
    //   return Object.assign({}, state, { trackObject: trackObject });
    case types.GOT_RESULT:
      return Object.assign({}, state, { result: action.payload });

    default:
      return state;
  }
};

export default appReducer;
