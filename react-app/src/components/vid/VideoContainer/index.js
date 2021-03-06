import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../../store/video";
import VideoLink from "./VideoLink";
import "./VideoContainer.css";
import pacer from "./pacer.jpg";
import canyon from "./canyon.jpg";

const VideoContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [demo, setDemo] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleDemo = () => {
    setDemo(!demo);
  };

  const videoObj = {
    runs: {
      title: "Full training runs streamable anywhere, anytime.",
      description:
        "Have a treadmill at home? Use these runs to run along.  Be warned- this won't be just running: there will be warmups, cooldowns, stretching and water breaks involved.",
    },
    info: {
      title: "Streamable informational running curriculum",
      description:
        "Here you'll find all other educational/informational content that I decide to put out.  If you're wondering what running shoes to get or maybe some tips on avoiding injuries, you've come to the right place.",
    },
  };

  const { videoType } = useParams();

  const videos = useSelector((state) => state.video);

  useEffect(async () => {
    await dispatch(getVideos(videoType));
    setIsLoaded(true);
  }, [dispatch, videoType]);

  if (!videoObj[videoType]) return <Redirect to="/" />;
  else if (!isLoaded) return null;
  else {
    return (
      <div className="container">
        <div className="container__hero">
          {/*<img
            src={videoType === "runs" ? canyon : canyon}
            alt="Pacing a run."
          />*/}
          <h1 className="container__title">{videoObj[videoType].title}</h1>
        </div>
        <h2 className="container__description">
          {videoObj[videoType].description}
        </h2>
        {user.role === "owner" ? (
          <div className="demoToggle">
            <label htmlFor="demoToggle__checkbox">Demo Videos</label>
            <input
              name="demoToggle__checkbox"
              type="checkbox"
              value={demo}
              checked={demo}
              onChange={handleDemo}
            />
          </div>
        ) : null}
        <ul className="container__list">
          {Object.entries(videos).length ? (
            user.role !== "owner" ? (
              Object.entries(videos).map((video) => (
                <li className="list__element" key={video[0]}>
                  <VideoLink video={video[1]} />
                </li>
              ))
            ) : (
              Object.entries(videos)
                .filter((video) => video[1].demo === demo)
                .map((video) => (
                  <li className="list__element" key={video[0]}>
                    <VideoLink video={video[1]} />
                  </li>
                ))
            )
          ) : (
            <h1 className="container__description">
              Nothing posted yet, check back soon!
            </h1>
          )}
        </ul>
      </div>
    );
  }
};

export default VideoContainer;
