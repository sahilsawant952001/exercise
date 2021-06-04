import React from 'react'
import classes from "../About/About.module.css";
import Footer from '../Footer/Footer';

function About() {
    return (
        <div className={classes.main}>
             <div className={classes.about}>
                <h1>ABOUT</h1>
                 <h3>
                    We believe fitness should be accessible to everyone, everywhere, regardless of income or access to a gym. With hundreds of professional workouts, healthy recipes and informative articles, as well as one of the most positive communities on the web, you’ll have everything you need to reach your personal fitness goals – for free!
                 </h3>
             </div>
             <Footer/>
        </div>
    )
}

export default About
