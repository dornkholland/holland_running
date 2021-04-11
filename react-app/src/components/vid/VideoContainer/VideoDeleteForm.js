import React from "react";

const VideoDeleteForm = ({ closeModal }) => {
  const handleDelete = () => {};
  return (
    <div className="videoDelete">
      <h1>Are you sure?</h1>
      <button onClick={handleDelete}>Yes, delete!</button>
      <button onClick={closeModal}>No, cancel.</button>
    </div>
  );
};

export default VideoDeleteForm;
