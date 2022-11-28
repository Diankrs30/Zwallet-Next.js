import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./user";
import historyReducer from "./history";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    history: historyReducer,
})