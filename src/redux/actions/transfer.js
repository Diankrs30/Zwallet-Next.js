import ACTION_STRING from "./actionStrings";
import { transfer, getAllUser } from "utils/transfer";

const transferPending = () => ({
  type: ACTION_STRING.transfer.concat(ACTION_STRING.pending),
});

const transferRejected = (error) => ({
  type: ACTION_STRING.transfer.concat(ACTION_STRING.rejected),
  payload: { error },
});

const transferFulfilled = (data) => ({
  type: ACTION_STRING.transfer.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const transferReset = () => {
  return {
    type: ACTION_STRING.resetTransfer,
  };
};

const getAllUserPending = () => ({
  type: ACTION_STRING.getAllUser.concat(ACTION_STRING.pending),
});

const getAllUserRejected = (error) => ({
  type: ACTION_STRING.getAllUser.concat(ACTION_STRING.rejected),
  payload: { error },
});

const getAllUserFulfilled = (data) => ({
  type: ACTION_STRING.getAllUser.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const dataTransfer = (data) => {
  return {
    type: ACTION_STRING.transferData,
    payload: { data },
  };
};

const transferThunk = (token, body) => {
  return async (dispatch) => {
    try {
      dispatch(transferPending());
      const result = await transfer(token, body);
      dispatch(transferFulfilled(result.data));
      return result.data;
    } catch (error) {
      dispatch(transferRejected(error));
    }
  };
};

const getAllUserThunk = (token, page, search) => {
  return async (dispatch) => {
    try {
      dispatch(getAllUserPending());
      const result = await getAllUser(token, page, search);
      dispatch(getAllUserFulfilled(result.data));
    } catch (error) {
      console.log(error);
      dispatch(getAllUserRejected(error));
    }
  };
};

const transferAction = {
  transferThunk,
  dataTransfer,
  transferReset,
  getAllUserThunk
};

export default transferAction;
