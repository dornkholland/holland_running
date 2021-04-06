const LOAD_VIDEOS = "video/loadVideos";
const SET_VIDEOS = "video/setVideos";

const loadVideos = (videos) => {
  return {
    type: LOAD_VIDEOS,
    payload: videos,
  };
};

export const getVideos = (type) => async (dispatch) => {
  console.log(type);
  const response = await fetch(`/api/videos/${type}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!data.errors) {
    dispatch(loadVideos(data));
  }
  return data;
};

const initialState = { video: {} };

const videoReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD_VIDEOS:
      console.log(action.payload);
      return newState;
    default:
      return state;
  }
};

export default videoReducer;
