import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./user";
import historyReducer from "./history";
import transferReducer from "./transfer";
import getDashboardReducer from "./getDashboard";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    history: historyReducer,
    transfer: transferReducer,
    getDashboard: getDashboardReducer,
})