import React, { useState } from "react";

const VideoEditForm = ({ closeModal, video }) => {
  const [name, setName] = useState(video.name);
  const [description, setDescription] = useState(video.description);
  const [demo, setDemo] = useState(false);
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [type, setType] = useState(video.type);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(null);

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

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit} id="uploadVideoForm">
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
          requred={true}
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
