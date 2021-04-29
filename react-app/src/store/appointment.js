const SET_APPOINTMENT = "appointment/setAppointment";

const setAppointment = (appointment) => {
  return {
    type: SET_APPOINTMENT,
    payload: appointment,
  };
};

export const addAppointment = (date, time) => async (dispatch) => {
  const response = await fetch(`/api/appointments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      time,
    }),
  });
  const data = await response.json();
  if (!data.errors) {
    dispatch(setAppointment(date, time));
  }
  return data;
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
