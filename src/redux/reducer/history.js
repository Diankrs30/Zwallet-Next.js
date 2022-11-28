import ACTION_STRING from "../actions/actionStrings";

const initialState = {
    history: [],
    pagination: {},
    isLoading: false,
    isError: false,
    isFulffiled: false,
    error: null,
  };

  const historyReducer = (prevState = initialState, {type, payload}) => {
    const {getHistory, getHistoryById, pending, rejected, fulfilled} = ACTION_STRING;
    switch (type) {
        case getHistory + pending:
          return {
            ...prevState,
            isLoading: true,
            isError: false,
            isTrue: false,
          };
        case getHistory + rejected:
          // console.log("cek eror dmana",payload);
          return {
            ...prevState,
            isError: true,
            isLoading: false,
            error: payload.error,
          };
          // console.log("cek payload",payload);
        case getHistory + fulfilled:
          return {
            ...prevState,
            isLoading: false,
            history: payload.data,
          };

          case getHistoryById + pending:
            return {
              ...prevState,
              isLoading: true,
              isError: false,
              isTrue: false,
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
              history: payload.data.data,
            };
             
        default:
          return prevState;
      }
}

export default historyReducer;