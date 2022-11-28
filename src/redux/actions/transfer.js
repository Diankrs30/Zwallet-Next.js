import ACTION_STRING from "./actionStrings";
import { transfer } from "utils/transfer";

const transferPending = () => ({
    type: ACTION_STRING.transferData.concat(ACTION_STRING.pending),
})

const transferRejected = (error) => ({
    type: ACTION_STRING.transferData.concat(ACTION_STRING.rejected),
    payload: { error },
  });
  
  const transferFulfilled = (data) => ({
    type: ACTION_STRING.transferData.concat(ACTION_STRING.fulfilled),
    payload: { data },
  });

  const transferReset = () => {
    return {
      type: ACTION_STRING.resetTransfer,
    };
  };
  
  const transferData = (data) => {
    return {
      type: ACTION_STRING.transferData,
      payload: { data },
    };
  };

  const transferThunk = (token, body, cbSuccess, cbDenied) => {
    return async (dispatch) => {
      try {
        dispatch(transferPending());
        const result = await transfer(token, body);
        //   console.log("cek",result);
        dispatch(transferFulfilled(result.data.data));
        if (typeof cbSuccess === "function") cbSuccess();
        return result.data.data;
      } catch (error) {
        dispatch(transferRejected(error));
        if (typeof cbDenied === "function") cbDenied();
      }
    };
  };
  
  const transferAction = {
    transferThunk,
    transferData,
    transferReset
  };
  
  export default transferAction;