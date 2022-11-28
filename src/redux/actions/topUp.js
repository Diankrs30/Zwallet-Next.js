import ACTION_STRING from "./actionStrings";
import { topUp } from "../../utils/topUp";

const topUpPending = () => ({
  type: ACTION_STRING.transactionTopUp.concat(ACTION_STRING.pending),
});

const topUpRejected = (error) => ({
  type: ACTION_STRING.transactionTopUp.concat(ACTION_STRING.rejected),
  payload: { error },
});

const topUpFulfilled = (data) => ({
  type: ACTION_STRING.transactionTopUp.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const topUpThunk = (body, token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(topUpPending());
      const result = await topUp(body, token);
      //   console.log("cek",result);
      dispatch(topUpFulfilled(result.data.data));
      if (typeof cbSuccess === "function") cbSuccess();
      return result.data.data;
    } catch (error) {
      dispatch(topUpRejected(error));
      if (typeof cbDenied === "function") cbDenied();
    }
  };
};

const topUpAction = {
  topUpThunk,
};

export default topUpAction;
