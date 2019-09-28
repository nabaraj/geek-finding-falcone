import {
  STORE_PLANETS_DATA,
  STORE_VEHICLE_DATA,
  SHOW_NOTIFICATION,
  RESET_APP,
  SELECT_PLANET
} from "./types";
import { requestApi } from "./../service/request";

export function getPlanetesData() {
  return dispatch => {
    let options = {
      method: "GET",
      url: "https://findfalcone.herokuapp.com/planets"
    };
    requestApi(options).then(result => {
      dispatch({ type: STORE_PLANETS_DATA, payload: result.data });
    });
  };
}
export function getVehcleData() {
  return dispatch => {
    let options = {
      method: "GET",
      url: "https://findfalcone.herokuapp.com/vehicles"
    };
    requestApi(options).then(result => {
      dispatch({ type: STORE_VEHICLE_DATA, payload: result.data });
    });
  };
}
export function displayNotification(data) {
  return dispatch => {
    dispatch({ type: SHOW_NOTIFICATION, payload: data });
    let timer;
    clearTimeout(timer);
    setTimeout(() => {
      dispatch({ type: SHOW_NOTIFICATION, payload: "" });
    }, 5000);
  };
}
export function resetAppFn(data) {
  return dispatch => {
    dispatch({ type: RESET_APP, payload: data });
  };
}
export function updateTrackerPlanet(value) {
  return dispatch => {
    dispatch({ type: SELECT_PLANET, payload: value });
  };
}
export function updateTrackerVehicle() {}
