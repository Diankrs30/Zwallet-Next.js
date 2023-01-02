import ACTION_STRING from "../actions/actionStrings";

const initialState = {
  userData: {
    id: null,
    token: null,
    pin: null,
  },
  isLoading: false,
  isError: false,
  isFulffiled: false,
  error: null,
};

const authReducer = (prevState = initialState, { type, payload }) => {
  const {
    authRegister,
    authLogin,
    authLogout,
    forgotPwd,
    resetPwd,
    pending,
    rejected,
    fulfilled,
  } = ACTION_STRING;
  switch (type) {
    case authRegister + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authRegister + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response.data.msg,
      };
    case authRegister + fulfilled:
      return {
        ...prevState,
        isLoading: false,
      };

    case authLogin + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authLogin + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error,
      };
    case authLogin + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        userData: {
          id: payload.data.data.id,
          token: payload.data.data.token,
          pin: payload.data.data.pin,
        },
      };

    case authLogout + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authLogout + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error,
      };
    case authLogout + fulfilled:
      return initialState;

    case forgotPwd + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case forgotPwd + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error,
      };
    case forgotPwd + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        userData: {
          id: payload.data.data.id,
          token: payload.data.data.token,
          pin: payload.data.data.pin,
        },
      };

    case resetPwd + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case resetPwd + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error,
      };
    case resetPwd + fulfilled:
      return {
        ...prevState,
        isLoading: false,
      };

    default:
      return prevState;
  }
};

export default authReducer;
