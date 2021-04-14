import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import VideoDeleteForm from "./VideoDeleteForm";
import VideoEditForm from "./VideoEditForm";
import logo from "../../Navbar/logo.png";

const VideoLink = ({ video }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const user = useSelector((state) => state.auth.user);
  const handleEdit = () => {
    setModalIsOpen(true);
    setModalType("edit");
  };
  const handleDelete = () => {
    setModalIsOpen(true);
    setModalType("delete");
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  Modal.setAppElement("#root");

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
        <div className="vidLink__thumbnail">
          <img src={video.thumbnail_url} />
          <i className="fa fa-play-circle"></i>
        </div>
        <div className="vidLink__content">
          <h1>{video.name}</h1>
          <h3 className="vidLink__posted">
            Posted: {video.created_at.split(" ").slice(0, 4).join(" ")}
          </h3>
          {video.demo ? <h3 className="vidLink__demo">Free Demo</h3> : null}
        </div>
      </NavLink>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <img src={logo} alt="Holland Running logo" />
        <button onClick={closeModal} className="modal--minimize">
          <i className="fa fa-window-minimize"></i>
        </button>
        {modalType === "delete" ? (
          <VideoDeleteForm closeModal={closeModal} video={video} />
        ) : (
          <VideoEditForm closeModal={closeModal} video={video} />
        )}
      </Modal>
    </div>
  );
};

export default VideoLink;
