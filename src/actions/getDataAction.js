import {
  STORE_PLANETS_DATA,
  STORE_VEHICLE_DATA,
  SHOW_NOTIFICATION,
  RESET_APP,
  GOT_RESULT
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
    }, 3000);
  };
}
export function resetAppFn(data) {
  return dispatch => {
    dispatch({ type: RESET_APP, payload: data });
  };
}
//first getting token and onsuccess sending game results
export function submitResult(trackObject) {
  return dispatch => {
    let tokenOption = {
      url: "https://findfalcone.herokuapp.com/token",
      method: "POST",
      headers: { Accept: "application/json" }
    };
    requestApi(tokenOption).then(result => {
      let planet_names = [],
        vehicle_names = [];
      Object.keys(trackObject).map((item, index) => {
        planet_names.push(trackObject[item].planetName);
        vehicle_names.push(trackObject[item].vehicleName);
      });
      let postFindOption = {
        url: "https://findfalcone.herokuapp.com/find",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        data: {
          token: result.data.token,
          planet_names,
          vehicle_names
        }
      };
      requestApi(postFindOption).then(result => {
        dispatch({ type: GOT_RESULT, payload: result.data });
      });
    });
  };
}
