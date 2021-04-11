import React from "react";

const VideoDeleteForm = ({ closeModal }) => {
  const handleDelete = () => {};
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
