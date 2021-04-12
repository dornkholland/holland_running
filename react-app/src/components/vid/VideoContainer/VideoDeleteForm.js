import React from "react";
import { useDispatch } from "react-redux";
import { deleteVideo } from "../../../store/video";

const VideoDeleteForm = ({ closeModal, video }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteVideo(video));
  };
  return (
    <div className="videoDelete">
      <h1 className="videoDelete__header">Are you sure?</h1>
      <button className="form__button delete" onClick={handleDelete}>
        Yes, delete!
      </button>
      <button className="form__button" onClick={closeModal}>
        No, cancel.
      </button>
    </div>
  );
};

export default VideoDeleteForm;
