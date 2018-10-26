import common from "./reducers/common";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

export default combineReducers({
	common,
	router: routerReducer
});
