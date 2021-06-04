import React from 'react'
import { Link } from 'react-router-dom';
import classes from "../Home/Home.module.css";
import Carousel from './Carousel/Carousel';
import { useSelector } from "react-redux";
import Footer from '../Footer/Footer';

function Home() {

    const isAuth = useSelector(state => state.auth.isAuthenticated);

    return (
        <div>
            <div className={classes.mid1}>
                <div className="row">
                    <div className="col-lg-6">
                        <h1>WORK OUT WEBSITE FOR EVERY FITNESS LEVEL.<br/><div className={classes.free}>ABSOLUTELY FREE</div></h1>
                    </div>
                    <div className="col-lg-6">
                        <img alt="man" className={classes.img1Style} src="https://www.mensjournal.com/wp-content/uploads/2018/02/beach-workout.jpg?quality=86&strip=all"/>
                    </div>
                </div>
            </div>
            
            <div className={classes.mid2}>
                    <h1>WORK OUT AT HOME FOR FREE</h1>
                    <p>We believe fitness should be accessible to everyone, everywhere, regardless of income or access to a gym. With hundreds of professional workouts, healthy recipes and informative articles, as well as one of the most positive communities on the web, you’ll have everything you need to reach your personal fitness goals – for free!</p>
                    <Link to="/Workouts" type="button" className="btn btn-secondary btn-lg" style={{margin:"2%"}}>BROWSE WORKOUTS</Link>
                    {!isAuth && <Link to="/Login" type="button" className="btn btn-secondary btn-lg" style={{margin:"2%"}}>JOIN NOW</Link>}
            </div>

            <div className={classes.mid3}>
                <h1>TESTIMONIALS</h1>
                <Carousel/>
            </div>
            <div className={classes.mid4}>
                <p>AS FEATURED IN</p>
                <div className="row">
                    <div className="col-lg-4">
                        <img alt="wsj" src="https://www.vectorlogo.zone/logos/wsj/wsj-ar21.svg"/>
                    </div>
                     <div className="col-lg-4">
                        <img alt="forbes" src="https://www.vectorlogo.zone/logos/forbes/forbes-wordmark.svg"/>
                    </div>
                    <div className="col-lg-4">
                        <img alt="hp" src="https://www.vectorlogo.zone/logos/huffingtonpost/huffingtonpost-wordmark.svg"/>
                    </div>
                </div>
            </div>
            <div>
            <div className={classes.mid5}>
                <h1>READY TO TRY ANYTIME FITNESS WORKOUT ?</h1>
                <Link to="/Workouts" type="button" className="btn btn-secondary btn-lg" style={{margin:"2%"}}>BROWSE WORKOUTS</Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home
