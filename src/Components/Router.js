import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";




export default function Routes() {
  return (
    <Router>
      <div>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
