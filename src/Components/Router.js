import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect

} from "react-router-dom";
import Educations from "./Educations";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Students from "./Students";
import Teachers from "./Teachers";





export default function Routes() {
  return (
    <Router>
      <div>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
          <Route exact path="/">
          <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/students">
            <Students />
          </Route>
          <Route path="/teachers">
            <Teachers />
          </Route>
          <Route path="/educations">
            <Educations />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
