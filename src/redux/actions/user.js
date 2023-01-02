import ACTION_STRING from "./actionStrings";
import { checkPin, getUserById, updateUserById, updatePin, getDataUser, updateImage, updatePassword } from "../../utils/user";

const checkPinPending = () => ({
  type: ACTION_STRING.checkPin.concat(ACTION_STRING.pending),
});

const checkPinRejected = (error) => ({
  type: ACTION_STRING.checkPin.concat(ACTION_STRING.rejected),
  payload: { error },
});

const checkPinFulfilled = (data) => ({
  type: ACTION_STRING.checkPin.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const updatePinPending = () => ({
  type: ACTION_STRING.updatePin.concat(ACTION_STRING.pending),
});

const updatePinRejected = (error) => ({
  type: ACTION_STRING.updatePin.concat(ACTION_STRING.rejected),
  payload: { error },
});

const updatePinFulfilled = (data) => ({
  type: ACTION_STRING.updatePin.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const getDataUserPending = () => ({
  type: ACTION_STRING.getDataUser.concat(ACTION_STRING.pending),
});

const getDataUserRejected = (error) => ({
  type: ACTION_STRING.getDataUser.concat(ACTION_STRING.rejected),
  payload: { error },
});

const getDataUserFulfilled = (data) => ({
  type: ACTION_STRING.getDataUser.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const getUserByIdPending = () => ({
  type: ACTION_STRING.getUserById.concat(ACTION_STRING.pending),
});

const getUserByIdRejected = (error) => ({
  type: ACTION_STRING.getUserById.concat(ACTION_STRING.rejected),
  payload: { error },
});

const getUserByIdFulfilled = (data) => ({
  type: ACTION_STRING.getUserById.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const updateUserByIdPending = () => ({
  type: ACTION_STRING.updateUserById.concat(ACTION_STRING.pending),
});

const updateUserByIdRejected = (error) => ({
  type: ACTION_STRING.updateUserById.concat(ACTION_STRING.rejected),
  payload: { error },
});

const updateUserByIdFulfilled = (data) => ({
  type: ACTION_STRING.updateUserById.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const upadateImgPending = () => ({
  type: ACTION_STRING.updateImg.concat(ACTION_STRING.pending),
});

const upadateImgRejected = (error) => ({
  type: ACTION_STRING.updateImg.concat(ACTION_STRING.rejected),
  payload: { error },
});

const upadateImgFulfilled = (data) => ({
  type: ACTION_STRING.updateImg.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const upadatePasswordPending = () => ({
  type: ACTION_STRING.updatePassword.concat(ACTION_STRING.pending),
});

const upadatePasswordRejected = (error) => ({
  type: ACTION_STRING.updatePassword.concat(ACTION_STRING.rejected),
  payload: { error },
});

const upadatePasswordFulfilled = (data) => ({
  type: ACTION_STRING.updatePassword.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const updatePinThunk = (id, body, token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(updatePinPending());
      const result = await updatePin(id, body, token);
      dispatch(updatePinFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess();
    } catch (error) {
      dispatch(updatePinRejected(error));
      if (typeof cbDenied === "function") cbDenied();
    }
  };
};

const getDataUserThunk = (param, token) => {
  return async (dispatch) => {
    try {
      dispatch(getDataUserPending());
      const result = await getDataUser(param, token);
      dispatch(getDataUserFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess();
    } catch (error) {
      dispatch(getDataUserRejected(error));
      if (typeof cbDenied === "function") cbDenied();
    }
  }
}

const getUserByIdThunk = (id, token) => {
  return async (dispatch) => {
    try {
      dispatch(getUserByIdPending());
      const result = await getUserById(id, token);
      dispatch(getUserByIdFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess();
      
    } catch (error) {
      dispatch(getUserByIdRejected(error));
      if (typeof cbDenied === "function") cbDenied();
    }
  }
}

const updateUserByIdThunk = (id, token, body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(updateUserByIdPending());
      const result = await updateUserById(id, token, body);
      dispatch(updateUserByIdFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess();
    } catch (error) {
      dispatch(updateUserByIdRejected(error));
      if (typeof cbDenied === "function") cbDenied();
    }
  };
};

const updateImgThunk = (id, body, token) => {
  return async (dispatch) => {
    try {
      dispatch(upadateImgPending());
      const result = await updateImage(id, body, token);
      dispatch(upadateImgFulfilled(result.data));
      // if (typeof cbSuccess === "function") cbSuccess();
    } catch (error) {
      dispatch(upadateImgRejected(error));
      // if (typeof cbDenied === "function") cbDenied();
    }
  };
};

const updatePasswordThunk = (id, body, token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(upadatePasswordPending());
      const result = await updatePassword(id, body, token);
      dispatch(upadatePasswordFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess();
    } catch (error) {
      dispatch(upadatePasswordRejected(error));
      if (typeof cbDenied === "function") cbDenied();
    }
  };
};

const userAction = {
  updatePinThunk,
  updateUserByIdThunk,
  getDataUserThunk,
  getUserByIdThunk,
  updateImgThunk,
  updatePasswordThunk,
};

export default userAction;
