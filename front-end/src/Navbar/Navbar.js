import React from 'react'
import { NavLink,useHistory,Link } from "react-router-dom";
import classes from '../Navbar/Navbar.module.css';
import { useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

function Navbar() {

    const isAuth = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    const history = useHistory();

    function logoutHandler(){
        dispatch(authActions.logout());
        history.replace("/");
    }

    return (
        <div className={classes.back}>
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><img alt="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcW9uCZc9DJIHv3JUYy8PIDmJ9Tj8NpIgig&usqp=CAU" className={classes.logo}/></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      {isAuth && <NavLink className="nav-link" activeClassName={classes.activeNav} aria-current="page" to="/Workouts">Workouts</NavLink>}
                    </li>
                    <li className="nav-item">
                      {isAuth && <NavLink className="nav-link" activeClassName={classes.activeNav} to="/Health-living">Healthy Living</NavLink>}
                    </li>
                    <li className="nav-item">
                      {<NavLink className="nav-link" activeClassName={classes.activeNav} to="/About">About</NavLink>}
                    </li>
                    <li className="nav-item">
                      {!isAuth && <NavLink className="nav-link" activeClassName={classes.activeNav} to="/Login">Login</NavLink>}
                    </li> 
                    <li className="nav-item ml-auto">
                    {isAuth && <Link className="nav-link" to="/" onClick={logoutHandler}>Logout</Link>}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        </div>
    )
}

export default Navbar
