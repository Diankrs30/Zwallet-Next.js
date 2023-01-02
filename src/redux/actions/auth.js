import ACTION_STRING from "./actionStrings";
import { login, register, logout, forgotPassword, resetPassword  } from "../../utils/auth";

const registerPending = () => ({
  type: ACTION_STRING.authRegister.concat(ACTION_STRING.pending),
});

const registerRejected = (error) => ({
  type: ACTION_STRING.authRegister.concat(ACTION_STRING.rejected),
  payload: { error },
});

const registerFulfilled = (data) => ({
  type: ACTION_STRING.authRegister.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const loginPending = () => ({
  type: ACTION_STRING.authLogin.concat(ACTION_STRING.pending),
});

const loginRejected = (error) => ({
  type: ACTION_STRING.authLogin.concat(ACTION_STRING.rejected),
  payload: { error },
});

const loginFulfilled = (data) => ({
  type: ACTION_STRING.authLogin.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const logoutPending = () => ({
  type: ACTION_STRING.authLogout.concat(ACTION_STRING.pending),
});

const logoutRejected = (error) => ({
  type: ACTION_STRING.authLogout.concat(ACTION_STRING.rejected),
  payload: { error },
});

const logoutFulfilled = (data) => ({
  type: ACTION_STRING.authLogout.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const forgotPending = () => ({
  type: ACTION_STRING.forgotPwd.concat(ACTION_STRING.pending),
});

const forgotRejected = (error) => ({
  type: ACTION_STRING.forgotPwd.concat(ACTION_STRING.rejected),
  payload: { error },
});

const forgotFulfilled = (data) => ({
  type: ACTION_STRING.forgotPwd.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const resetPending = () => ({
  type: ACTION_STRING.resetPwd.concat(ACTION_STRING.pending),
});

const resetRejected = (error) => ({
  type: ACTION_STRING.resetPwd.concat(ACTION_STRING.rejected),
  payload: { error },
});

const resetFulfilled = (data) => ({
  type: ACTION_STRING.resetPwd.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const registerThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(registerPending());
      const result = await register(body);
      dispatch(registerFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess();
    } catch (error) {
      dispatch(registerRejected(error));
      if (typeof cbDenied === "function") cbDenied(error);
    }
  };
};

const loginThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      const result = await login(body);
      dispatch(loginFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess(result.data);
    } catch (error) {
      dispatch(loginRejected(error));
      if (typeof cbDenied === "function") cbDenied(error);
    }
  };
};

const logoutThunk = (cbSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(logoutPending());
      const result = await logout();
      dispatch(logoutFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess(result.data);
    } catch (error) {
      dispatch(logoutRejected(error));
    }
  };
};

const forgotThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPending());
      const result = await forgotPassword(body);
      dispatch(forgotFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess(result.data);
    } catch (error) {
      dispatch(forgotRejected(error));
      if (typeof cbDenied === "function") cbDenied(error);
    }
  };
};

const resetThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(resetPending());
      console.log("cek result",body);
      const result = await resetPassword(body);
      dispatch(resetFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess(result.data);
    } catch (error) {
      dispatch(resetRejected(error));
      if (typeof cbDenied === "function") cbDenied();
    }
  };
};

const authAction = {
  registerThunk,
  loginThunk,
  forgotThunk,
  resetThunk,
  logoutThunk,
};

export default authAction;


