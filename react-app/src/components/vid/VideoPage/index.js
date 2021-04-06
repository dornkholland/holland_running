import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

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
      <div>
        <h1>{video.name}</h1>
        <video src={video.url}></video>
      </div>
    );
  }
};

export default VideoPage;
