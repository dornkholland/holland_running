const SET_DATE = "date/setDate";

const setDate = (date) => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

export const updateDate = (date) => async (dispatch) => {
  dispatch(setDate(date));
  return date;
};

const date = new Date();
const initialState = { date: new Date(date.getTime() + 86400000 * 2) }; // increment by two days after current day for initial state

const calendarReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_DATE:
      newState["date"] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default calendarReducer;
