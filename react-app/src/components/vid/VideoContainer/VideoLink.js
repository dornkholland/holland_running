import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoLink = ({ video, setModalIsOpen, setModalType }) => {
  const user = useSelector((state) => state.auth.user);
  const handleEdit = () => {
    setModalIsOpen(true);
    setModalType("edit");
  };
  const handleDelete = () => {
    setModalIsOpen(true);
    setModalType("delete");
  };
  return (
    <div>
      {user.role === "owner" ? (
        <div className="tools">
          <button onClick={handleEdit}>
            <i className="fa fa-pencil"></i>
          </button>
          <button onClick={handleDelete}>
            <i className="fa fa-trash trash"></i>
          </button>
        </div>
      ) : null}
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
    </div>
  );
};

export default VideoLink;
