import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import NavbarBuffer from "./components/Navbar/NavbarBuffer";
import Landing from "./components/Landing";
import VideoContainer from "./components/vid/VideoContainer";
import VideoPage from "./components/vid/VideoPage";
import PersonalizedTraining from "./components/train/PersonalizedTraining";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/auth";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate()).then((user) => {
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <NavbarBuffer />
      <Switch>
        {/*test routs begin here*/}
        {/*test routs end here*/}
        <Route path="/" exact={true}>
          <Landing />
        </Route>
        <ProtectedRoute path="/videos/:videoId(\d+)">
          <VideoPage />
        </ProtectedRoute>
        <ProtectedRoute path="/videos/:videoType">
          <VideoContainer />
        </ProtectedRoute>
        <ProtectedRoute path="/training">
          <PersonalizedTraining />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
