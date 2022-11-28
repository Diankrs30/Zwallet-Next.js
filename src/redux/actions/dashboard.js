import ACTION_STRING from "./actionStrings";
import { getDashBoard } from "../../utils/dashboard";

const { getDashboard, pending, rejected, fulfilled } = ACTION_STRING;

const getStatisticPending = () => {
  return {
    type: getDashboard.concat(pending),
  };
};
const getStatisticRejected = (error) => {
  return {
    type: getDashboard.concat(rejected),
    payload: { error },
  };
};
const getStatisticFulfilled = (data) => {
  return {
    type: getDashboard.concat(fulfilled),
    payload: { data },
  };
};

const statisticThunk = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(getStatisticPending());
      const result = await getDashBoard(token, id);
      dispatch(getStatisticFulfilled(result.data));
    } catch (error) {
      dispatch(getStatisticRejected(error));
    }
  };
};

const dashboardAction = {
  statisticThunk,
};

export default dashboardAction;