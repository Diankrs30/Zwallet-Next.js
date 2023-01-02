import logger from "redux-logger";
import ACTION_STRING from "../actions/actionStrings";

initialState = {
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
  redirectUrl: "",
};

const topUpReducer = (prevState = initialState, { type, payload }) => {
  const { transactionTopUp, pending, rejected, fulfilled } = ACTION_STRING;
  switch (type) {
    case transactionTopUp + pending:
      return {
        isLoading: true,
        isError: false,
      };
    case transactionTopUp + rejected:
      return {
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };
    case transactionTopUp + fulfilled:
      return {
        isLoading: false,
        isError: false,
        redirectUrl: payload.data.data.redirectUrl,
      };

    default:
      return prevState;
  }
};

export default topUpReducer;
