import * as types from "../actions/types";
let initialData = {
  planetsArr: [],
  vehicleArr: [],
  mixObject: {},
  trackObject: {},
  notificationObject: "",
  resetApp: false,
  result: null,
  appResultStatus:false
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
    case types.APP_LOADING:
      return Object.assign({}, state, {appResultStatus:action.status})
    case types.GOT_RESULT:
      return Object.assign({}, state, { result: action.payload, appResultStatus:false });

    default:
      return state;
  }
};

export default appReducer;
