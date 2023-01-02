import ACTION_STRING from "../actions/actionStrings";

const initialState = {
  profile: {},
  dataUser: [],
  isLoading: false,
  isError: false,
  isFulffiled: false,
  error: null,
  msgWrongPass: null,
};

const userReducer = (prevState = initialState, { type, payload }) => {
  const {
    getUserById,
    getDataUser,
    updateUserById,
    updateImg,
    updatePassword,
    pending,
    rejected,
    fulfilled,
  } = ACTION_STRING;
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
        error: payload.error.response.data.msg,
      };
    case getUserById + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        profile: payload.data.data,
      };

    case updateUserById + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isTrue: false,
      };
    case updateUserById + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response,
      };
    case updateUserById + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isFulffiled: true,
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

    case updateImg + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulffiled: false,
      };
    case updateImg + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulffiled: false,
        error: payload.error.response.data.msg,
      };
    case updateImg + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulffiled: true,
        // profile: payload.data.data,
      };

    case updatePassword + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulffiled: false,
      };

    case updatePassword + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        // error: payload.error.response.data.msg,
        msgWrongPass: payload.error.response.data.msg,
      };

    case updatePassword + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulffiled: true,
      };

    default:
      return prevState;
  }
};

export default userReducer;
