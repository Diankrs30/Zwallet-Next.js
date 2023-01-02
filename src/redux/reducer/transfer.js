import ACTION_STRING from "../actions/actionStrings";

const initialState = {
  transferData: {
    receiverId: "",
    amount: "",
    notes: "",
    date: "",
    receiverData: null,
  },
  transferResult: {
    isLoading: false,
    isFulfilled: false,
    isError: false,
    status: 0,
    msg: "",
    data: null,
    error: "",
  },
};

const transferReducer = (prevState = initialState, { type, payload }) => {
  const {
    transferData,
    resetTransfer,
    transfer,
    pending,
    rejected,
    fulfilled,
  } = ACTION_STRING;
  switch (type) {
    case resetTransfer:
      return initialState;

    case transferData:
      return {
        ...prevState,
        transferData: {
          receiverId: payload.data.receiverId,
          date: payload.data.data,
          amount: payload.data.amount,
          notes: payload.data.notes,
          receiverData: payload.data.receiverData,
        },
      };

    case transfer + pending:
      return {
        ...prevState,
        transferResult: {
          isLoading: true,
          isFulfilled: false,
          isError: false,
        },
      };
    case transfer + rejected:
      return {
        ...prevState,
        transferResult: {
          isLoading: false,
          isFulfilled: false,
          isError: true,
          error: payload.error.response.data.msg,
        },
      };
    case transfer + fulfilled:
      return {
        ...prevState,
        transferResult: {
          isLoading: false,
          isFulfilled: true,
          status: payload.data.status,
          data: payload.data.data,
          msg: payload.data.msg,
        },
      };

    default:
      return initialState;
  }
};

export default transferReducer;