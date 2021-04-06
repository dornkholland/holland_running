import React from "react";

const VideoLink = ({ video }) => {
  return (
    <div className="vidLink">
      <h1>{video.name}</h1>
      <h2>{video.description}</h2>
    </div>
  );
};

export default VideoLink;
