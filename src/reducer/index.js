import { combineReducers } from "redux";
import appReducer from "./planeteReducer";
const totalReducer = combineReducers({
  appsData: appReducer
});

const rootReducer = (state, action) => {
  return totalReducer(state, action);
};
export default rootReducer;
