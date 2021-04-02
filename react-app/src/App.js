import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
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
      <Switch>
        {/*test routs begin here*/}g {/*test routs end here*/}
        <Route path="/" exact={true}>
          <Landing />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
