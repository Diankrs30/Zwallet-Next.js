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
        error: payload.error,
      };
    case transactionTopUp + fulfilled:
      console.log("cek payload reducer", payload.data);
      return {
        isLoading: false,
        isError: false,
        redirectUrl: payload.data.data.redirectUrl,
      };

    default:
      return prevState;
  }
};
