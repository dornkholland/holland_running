import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const VideoForm = () => {
  const history = useHistory(); // so that we can redirect after the video upload is successful
  const [video, setVideo] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [demo, setDemo] = useState(true);
  const [errors, setErrors] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("uploadVideoForm"));
    formData.append("video", video);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setVideoLoading(true);

    const res = await fetch("/api/videos/", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      setVideoLoading(false);
      history.push("/");
    } else {
      setVideoLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log(data.errors);
      setErrors(data.errors);
    }
  };

  const updateVideo = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  return (
    <form onSubmit={handleSubmit} id="uploadVideoForm">
      <ul className="errors">
        {errors.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
      <div className="form__element">
        <label htmlFor="type">Video Category</label>
        <select name="type" onChange={updateType} value={type}>
          <option value="recordings">Class Recording</option>
          <option value="runs">Training Run</option>
          <option value="info">Informational Video</option>
        </select>
      </div>
      <div className="form__element">
        <label htmlFor="name"> name</label>
        <input type="text" name="name" value={name} onChange={updateName} />
      </div>
      <div className="form__element">
        <label htmlFor="description"> description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={updateDescription}
        />
      </div>
      <div className="form__element element__checkbox">
        <label htmlFor="demo"> demo:</label>
        <input
          name="demo"
          type="checkbox"
          value={demo}
          checked={demo}
          onChange={updateDemo}
        />
      </div>
      <input type="file" accept="video/*" onChange={updateVideo} />
      <button type="submit">Submit</button>
      {videoLoading && <p>Loading...</p>}
    </form>
  );
};

export default VideoForm;
