import { APP_LOAD, SEARCH, SORTBY } from "../constants/actionTypes";

const defaultState = {
    appName: "Peerlyst",
    appLoaded: false,
    search: "",
    sortby: ""
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                sortby: action[SORTBY],
                search: action[SEARCH],
                appLoaded: true
            };
        case SEARCH:
            return {
                ...state,
                search: action[SEARCH]
            };
        case SORTBY:
            return {
                ...state,
                sortby: action[SORTBY]
            };
        default:
            return state;
    }
};
