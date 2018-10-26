import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { localStorageMiddleware } from "./middleware";
import reducer from "./reducer";

import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
	if (process.env.NODE_ENV === "production") {
		return applyMiddleware(myRouterMiddleware);
	} else {
		// Enable additional logging in non-production environments.
		return applyMiddleware(
			myRouterMiddleware,
			localStorageMiddleware,
			createLogger()
		);
	}
};

export const store = createStore(reducer, getMiddleware());