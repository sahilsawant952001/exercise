import React from "react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Auth from "./Auth/Auth";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Workouts from "./Workouts/Workouts";
import About from "./About/About";
import Workout from "./Workout/Workout";
import HealthTips from "./HealthTips/HealthTips";
import Exercise from "../src/Exercise/Exercise";
import { useSelector } from "react-redux";

function App() {

  const isAuth = useSelector(state => state.auth.isAuthenticated);

  let routes = <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/Login" component={Auth} exact/>
                    <Route path="/About" component={About} exact/>
                    <Redirect to="/Login" />
               </Switch>

  if(isAuth){
    routes =  <Switch>
                  <Route path="/" component={Home} exact/>
                  <Route path="/Workouts" component={Workouts} exact/>
                  <Route path="/Workouts/:type/:workout" component={Workout} exact/>
                  <Route path="/Workouts/:type/:workout/start" component={Exercise} exact/>
                  <Route path="/About" component={About} exact/>
                  <Route path="/Health-Living" component={HealthTips} exact/>
                  <Redirect to="/" />
              </Switch>
  }
                
  return (
    <div className="App">
        <Navbar/>
        {routes}
    </div>
  );
}

export default withRouter(App);
