import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./../reducer/index";
import { composeWithDevTools } from "redux-devtools-extension";
//import { composeWithDevTools } from "redux-devtools-extension";
const middlewares = [];

middlewares.push(thunk);
if (process.env.NODE_ENV === `development`) {
  //const { logger } = require(`redux-logger`);
  //middlewares.push(logger);
}

//const store = createStore(rootReducer, applyMiddleware(...middlewares));
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;
