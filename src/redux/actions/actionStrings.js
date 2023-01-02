import { ActionType } from "redux-promise-middleware";

const ACTION_STRING = {
  authRegister: "AUTH_REGISTER",
  authLogin: "AUTH_LOGIN",
  checkPin: "USER_CHECKPIN",
  updatePin: "USER_UPDATEPIN",
  getUserById: "USER_GETUSERBYID",
  getHistory: "TRANSACTION_GETHISTORY",
  getHistoryById: "TRANSACTION_GETHISTORYBYID",
  getDataUser: "USER_GETDATAUSER",
  updateUserById: "UPDATE_USER_BY_ID",
  updateImg: "USER_UPDATEIMAGE",
  updatePassword: "USER_UPDATE_PASSWORD",
  forgotPwd: "AUTH_FORGOTPASSWORD",
  resetPwd: "AUTH_RESETPASSWORD",
  authLogout: "AUTH_LOGOUT",
  transactionTopUp: "TOP_UP",
  transferData: "TRANSFER_DATA",
  resetTransfer: "TRANSFER_RESET",
  transfer: "TRANSFER",
  getDashboard: "GET_DASHBOARD",
  getAllUser: "GET_ALL_USER",
  pending: `_${ActionType.Pending}`,
  fulfilled: `_${ActionType.Fulfilled}`,
  rejected: `_${ActionType.Rejected}`,
};

export default ACTION_STRING;
