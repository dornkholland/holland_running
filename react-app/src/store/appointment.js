const LOAD_AVAILABILITY = "appointment/loadAvailability";
const SET_AVAILABILITY = "appointment/setAvailability";
const REMOVE_AVAILABILITY = "appointment/removeAvailability";

const setAvailability = (availability) => {
  return {
    type: SET_AVAILABILITY,
    payload: availability,
  };
};

const loadAvailability = (availability) => {
  return {
    type: LOAD_AVAILABILITY,
    payload: availability,
  };
};

const deleteAvailability = (availability) => {
  return {
    type: REMOVE_AVAILABILITY,
    payload: availability,
  };
};

export const addAvailability = (date, time, offset) => async (dispatch) => {
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
    dispatch(setAvailability(data));
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
    dispatch(loadAvailability(data));
  }
  return data;
};

export const removeAvailability = (date, time, offset) => async (dispatch) => {
  const response = await fetch(`/api/appointments/`, {
    method: "DELETE",
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
    dispatch(deleteAvailability(data));
  }
  return data;
};

const initialState = {
  appointments: {
    available: null,
    booked: null,
  },
};

const appointmentReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD_AVAILABILITY:
      newState.appointments.available = action.payload;
      return newState;
    case SET_AVAILABILITY:
      newState.appointments.available = {
        ...newState.appointments.available,
        ...action.payload,
      };
      return newState;
    case REMOVE_AVAILABILITY:
      console.log(action.payload);
      for (let key in action.payload) {
        delete newState.appointments.available[key];
      }
      return newState;
    default:
      return state;
  }
};

export default appointmentReducer;
