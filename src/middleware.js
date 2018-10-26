import { SEARCH, SORTBY } from "./constants/actionTypes";

/**
 * Local Storage Middleware.
 * Check for any data in local storage with respect to subreddit and if data exist, return the data.
 */
const localStorageMiddleware = store => next => action => {
    if (action.type === SORTBY || action.type === SEARCH) {
        window.localStorage.setItem(action.type, action.value);

        if (action.type === SORTBY) {
            action[SORTBY] = action.value;
        }
        if (action.type === SEARCH) {
            action[SEARCH] = action.value;
        }
    } else {
        let sortby = window.localStorage.getItem(SORTBY);
        let searchVal = window.localStorage.getItem(SEARCH);

        if (sortby) {
            action[SORTBY] = sortby;
        } else {
            action[SORTBY] = "title";
            window.localStorage.setItem(SORTBY, "title");
        }

        if (searchVal || searchVal === "") {
            action[SEARCH] = searchVal;
        } else {
            action[SEARCH] = "";
            window.localStorage.setItem(SEARCH, "");
        }
    }

    next(action);
};

export { localStorageMiddleware };
