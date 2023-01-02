import ACTION_STRING from "./actionStrings";
import { getHistoryById, getHistory } from "../../utils/history";

const getHistoryPending = () => ({
  type: ACTION_STRING.getHistory.concat(ACTION_STRING.pending),
});

const getHistoryRejected = (error) => ({
  type: ACTION_STRING.getHistory.concat(ACTION_STRING.rejected),
  payload: { error },
});

const getHistoryFulfilled = (data) => ({
  type: ACTION_STRING.getHistory.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const getHistoryByIdPending = () => ({
  type: ACTION_STRING.getHistory.concat(ACTION_STRING.pending),
});

const getHistoryByIdRejected = (error) => ({
  type: ACTION_STRING.getHistory.concat(ACTION_STRING.rejected),
  payload: { error },
});

const getHistoryByIdFulfilled = (data) => ({
  type: ACTION_STRING.getHistory.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const getHistoryThunk = (param, token) => {
  return async (dispatch) => {
    try {
      dispatch(getHistoryPending());
      const result = await getHistory(param, token);
      dispatch(getHistoryFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess();
    } catch (error) {
      dispatch(getHistoryRejected(error));
      if (typeof cbDenied === "function") cbDenied();
    }
  };
};

const getHistoryByIdThunk = (id, token) => {
    return async (dispatch) => {
      try {
        dispatch(getHistoryByIdPending());
        const result = await getHistoryById(id, token);
        dispatch(getHistoryByIdFulfilled(result.data));
        if (typeof cbSuccess === "function") cbSuccess();
      } catch (error) {
        dispatch(getHistoryByIdRejected(error));
        if (typeof cbDenied === "function") cbDenied();
      }
    };
  };

const historyAction = {
    getHistoryThunk,
    getHistoryByIdThunk,
}

export default historyAction;