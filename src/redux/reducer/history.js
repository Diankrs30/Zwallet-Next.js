import ACTION_STRING from "../actions/actionStrings";

const initialState = {
  history: [],
  pagination: {},
  isLoading: false,
  isError: false,
  isFulffiled: false,
  error: null,
};

const historyReducer = (prevState = initialState, { type, payload }) => {
  const { getHistory, getHistoryById, pending, rejected, fulfilled } =
    ACTION_STRING;
  switch (type) {
    case getHistory + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulffiled: false,
      };
    case getHistory + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error,
      };
    case getHistory + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isFulffiled: true,       
        history: payload.data.data,
        pagination: payload.data.pagination,
      };

    case getHistoryById + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulffiled: false,
      };
    case getHistoryById + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response.data.msg,
      };
    case getHistoryById + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isFulffiled: true,
        history: payload.data.data,
      };

    default:
      return prevState;
  }
};

export default historyReducer;
