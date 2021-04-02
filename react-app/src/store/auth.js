const SET_USER = "auth/setUser";
const REMOVE_USER = "auth/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//restore auth user thunk action
export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data)
  if (!data.errors) {
    dispatch(setUser(data));
  }
  return data;
};

//signup user thunk action
export const signup = (first_name, last_name, email, password) => async (
  dispatch
) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    }),
  });
  const data = await response.json();
  if (!data.errors) {
    dispatch(setUser(data));
  }
  return response;
};

//login user thunk action
export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log(data)
  if (!data.errors) {
    dispatch(setUser(data));
  }
  return data;
};

//logout user thunk action
export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const initialState = { user: null };

const authReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_USER:
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default authReducer;
