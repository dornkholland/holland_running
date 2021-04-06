import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../../store/video";
import VideoLink from "./VideoLink";

const VideoContainer = () => {
  const dispatch = useDispatch();
  const videoObj = {
    recordings: {
      title: "Past Zoom Class Recordings",
      description:
        "If you couldn't make it to a live zoom class, fret not!  We record all of the classes and post them regularly below.",
    },
    runs: {
      title: "Training Runs",
      description:
        "Have a treadmill at home? Use these runs to run along.  Be warned- this won't be just running: there will be warmups, cooldowns, stretching and water breaks involved.",
    },
    info: {
      title: "Informational Videos",
      description:
        "Here you'll find all other educational/informational content that I decide to put out.  If you're wondering what running shoes to get or maybe some tips on avoiding injuries, you've come to the right place.",
    },
  };

  const { videoType } = useParams();

  const videos = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(getVideos(videoType));
  }, []);

  if (!videoObj[videoType]) return <Redirect to="/" />;
  else {
    return (
      <div>
        <h1>{videoObj[videoType].title}</h1>
        <h2>{videoObj[videoType].description}</h2>
        <ul>
          {Object.entries(videos).map((video) => (
            <li>
              <VideoLink key={video[0]} video={video[1]} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default VideoContainer;
