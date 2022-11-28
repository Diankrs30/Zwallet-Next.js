import ACTION_STRING from "../actions/actionStrings";

const initialState = {
    profile: {},
    dataUser: [],
    isLoading: false,
    isError: false,
    isFulffiled: false,
    error: null,
  };

const userReducer = (prevState = initialState, {type, payload}) => {
    const {getUserById, getDataUser, pending, rejected, fulfilled} = ACTION_STRING;
    switch (type) {
        case getUserById + pending:
          return {
            ...prevState,
            isLoading: true,
            isError: false,
            isTrue: false,
          };
        case getUserById + rejected:
          return {
            ...prevState,
            isError: true,
            isLoading: false,
            error: payload.error,
          };
        case getUserById + fulfilled:
          return {
            ...prevState,
            isLoading: false,
            profile: payload.data.data,
          };

          case getDataUser + pending:
            return {
              ...prevState,
              isLoading: true,
              isError: false,
              isTrue: false,
            };
          case getDataUser + rejected:
            return {
              ...prevState,
              isError: true,
              isLoading: false,
              error: payload.error.response.data.msg,
            };
          case getDataUser + fulfilled:
            return {
              ...prevState,
              isLoading: false,
              dataUser: payload.data.data,
            };
             
        default:
          return prevState;
      }
}

export default userReducer;