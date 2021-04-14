const LOAD_VIDEOS = "video/loadVideos";
const SET_VIDEOS = "video/setVideos";
const REMOVE_VIDEO = "video/removeVideos";

const loadVideos = (videos) => {
  return {
    type: LOAD_VIDEOS,
    payload: videos,
  };
};

const removeVideo = (video) => {
  return {
    type: REMOVE_VIDEO,
    payload: video,
  };
};

export const getVideos = (type) => async (dispatch) => {
  const response = await fetch(`/api/videos/${type}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!data.errors) {
    dispatch(loadVideos(data.videos));
  }
  return data;
};

export const deleteVideo = (video) => async (dispatch) => {
  const { id, thumbnail_url } = video;
  const response = await fetch(`/api/videos/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      thumbnail_url,
    }),
  });
  const data = await response.json();
  if (!data.errors) {
    dispatch(removeVideo(data.video));
  }
};

const initialState = { video: {} };

const videoReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOAD_VIDEOS:
      newState = action.payload;
      return newState;
    case REMOVE_VIDEO:
      delete newState[action.payload];
      return newState;

    default:
      return state;
  }
};

export default videoReducer;
