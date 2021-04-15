const LOAD_VIDEOS = "video/loadVideos";
const SET_VIDEO = "video/setVideo";
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

const putVideo = (video) => {
  return {
    type: SET_VIDEO,
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

export const editVideo = (formData, id) => async (dispatch) => {
  console.log(id);
  console.log(JSON.stringify(formData));
  const response = await fetch(`/api/videos/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!data.errors) {
    dispatch(putVideo(data.video));
    data.ok = 200;
  }
  return data;
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
    case SET_VIDEO:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default videoReducer;
