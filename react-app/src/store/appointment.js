const SET_APPOINTMENT = "appointment/setAppointment";

const setAppointment = (appointment) => {
  return {
    type: SET_APPOINTMENT,
    payload: appointment,
  };
};

export const addAppointment = (date, time) => async (dispatch) => {
  dispatch(setAppointment(date, time));
  //return date;
  return;
};

const initialState = { appointments: {} };

const appointmentReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_APPOINTMENT:
      console.log(action.payload);
      return newState;
    default:
      return state;
  }
};

export default appointmentReducer;
