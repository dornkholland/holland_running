import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";

const VideoContainer = () => {
  const history = useHistory();
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
  const [isLoaded, setIsLoaded] = useState(false);

  const { videoType } = useParams();

  if (!videoObj[videoType]) return <Redirect to="/" />;
  else {
    return (
      <div>
        <h1>{videoObj[videoType].title}</h1>
        <h2>{videoObj[videoType].description}</h2>
      </div>
    );
  }
};

export default VideoContainer;
