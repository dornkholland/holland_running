import React from "react";
import { NavLink } from "react-router-dom";

const VideoLink = ({ video }) => {
  return (
    <NavLink to={`/videos/${video.id}`} className="vidLink">
      <div className="vidLink__content">
        <h1>{video.name}</h1>
        <h2>{video.description}</h2>
        <h3 className="vidLink__posted">
          Posted: {video.date.split(" ").slice(0, 4).join(" ")}
        </h3>
      </div>
      <i className="fa fa-play-circle"></i>
    </NavLink>
  );
};

export default VideoLink;
