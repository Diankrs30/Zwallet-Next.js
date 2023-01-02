import ACTION_STRING from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  error: false,
  data: {},
};

const getDasboardReducer = (prevState = initialState, { type, payload }) => {
  const { getDashboard, pending, rejected, fulfilled } = ACTION_STRING;

  switch (type) {
    case getDashboard.concat(pending):
      return { ...prevState, isLoading: true, isError: false };
    case getDashboard.concat(rejected):
      return {
        prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response,
      };
    case getDashboard.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
        data: payload.data.data,
      };

    default:
      return prevState;
  }
};

export default getDasboardReducer;