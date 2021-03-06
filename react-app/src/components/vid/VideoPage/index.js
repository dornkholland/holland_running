import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import "./VideoPage.css";

let video = null;
const VideoPage = () => {
  const { videoId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const response = await fetch(
      `/api/videos/${videoId}/byId`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      []
    );
    const data = await response.json();
    video = data.video;
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return "loading...";
  else {
    return (
      <div className="videoPage">
        <h1>{video.name}</h1>
        <iframe
          src={video.vimeo_url}
          width="640"
          height="360"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h2>{video.description}</h2>
      </div>
    );
  }
};

export default VideoPage;
