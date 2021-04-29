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

const initialState = { date: new Date() };

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
