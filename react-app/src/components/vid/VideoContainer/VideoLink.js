import React from "react";
import { NavLink } from "react-router-dom";

const VideoLink = ({ video }) => {
  return (
    <div className="vidLink">
      <NavLink to={`/videos/${video.id}`}>
        <h1>{video.name}</h1>
        <h2>{video.description}</h2>
        <h3>Posted: {video.date.split(" ").slice(0, 4).join(" ")}</h3>
      </NavLink>
    </div>
  );
};

export default VideoLink;
