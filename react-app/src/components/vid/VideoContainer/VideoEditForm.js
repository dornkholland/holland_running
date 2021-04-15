import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editVideo } from "../../../store/video";

const VideoEditForm = ({ closeModal, video }) => {
  const [name, setName] = useState(video.name);
  const [description, setDescription] = useState(video.description);
  const [demo, setDemo] = useState(video.demo);
  const [url, setUrl] = useState(
    `<iframe src=${video.vimeo_url} width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen ></iframe>`
  );
  const [errors, setErrors] = useState([]);
  const [type, setType] = useState(video.type);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const updateType = (e) => {
    setType(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateDemo = () => {
    setDemo(!demo);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updateUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("editVideoForm"));
    formData.append("image", image);
    formData.set("vimeo_url", url.split('"')[1]);
    console.log(JSON.stringify(Object.fromEntries(formData)));
    const res = await dispatch(
      editVideo(Object.fromEntries(formData), video.id)
    );
    if (res.ok) {
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} id="editVideoForm">
      <ul className="errors">
        {errors.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
      <div className="form__element form__element__row">
        <label htmlFor="type">Video Category:</label>
        <select name="type" onChange={updateType} value={type}>
          <option value="recordings">Class Recording</option>
          <option value="runs">Training Run</option>
          <option value="info">Informational Video</option>
        </select>
      </div>
      <div className="form__element">
        <label htmlFor="name"> Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={updateName}
          required={true}
        />
      </div>
      <div className="form__element">
        <label htmlFor="description"> Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={updateDescription}
          required={true}
        />
      </div>
      <div className="form__element">
        <label htmlFor="vimeo_url"> Vimeo Link:</label>
        <input
          type="text"
          name="vimeo_url"
          value={url}
          onChange={updateUrl}
          required={true}
        />
      </div>
      <div className="form__element  form__element__checkbox">
        <label htmlFor="demo"> Demo/Free?</label>
        <input
          name="demo"
          type="checkbox"
          value={demo}
          checked={demo}
          onChange={updateDemo}
        />
      </div>
      <div className="form__element form__element__row form__element__file">
        <label htmlFor="file">Upload Thumbnail:</label>
        <input
          type="file"
          name="file"
          accept="image/png image/jpeg"
          onChange={updateImage}
        />
      </div>
      <button className="form__button" type="submit">
        Submit
      </button>
      {imageLoading && <p>Loading...</p>}
    </form>
  );
};

export default VideoEditForm;
