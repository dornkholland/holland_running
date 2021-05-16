const LOAD_AVAILABILITY = "appointment/loadAvailability";
const SET_APPOINTMENT = "appointment/setAppointment";

const setAppointment = (appointment) => {
  return {
    type: SET_APPOINTMENT,
    payload: appointment,
  };
};

const loadAvailability = (availability) => {
  return {
    type: LOAD_AVAILABILITY,
    payload: availability,
  };
};

export const addAppointment = (date, time, offset) => async (dispatch) => {
  const response = await fetch(`/api/appointments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      time,
      offset,
    }),
  });
  const data = await response.json();
  if (!data.errors) {
    dispatch(setAppointment(date, time));
  }
  return data;
};

export const getAvailability = (date, offset) => async (dispatch) => {
  date = date.toISOString().split("T")[0];
  const response = await fetch(`/api/appointments/${date}/${offset}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!data.errors) {
    dispatch(loadAvailability(date));
  }
  return data;
};

const initialState = { appointments: {} };

const appointmentReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD_AVAILABILITY:
      console.log(action.payload);
    case SET_APPOINTMENT:
      console.log(action.payload);
      return newState;
    default:
      return state;
  }
};

export default appointmentReducer;
