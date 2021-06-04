import React from 'react'
import classes from "../Carousel/Carousel.module.css";

function Carousel() {
    return (
        <div className={classes.carousel}>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div>
                    <h2>"Anytime Fitness helped me get my confidence back.I look great, and I feel even better! I can't imagine my life without it."</h2>
                    <h6>Debbie M.</h6>
                    </div>
                </div>
                <div className="carousel-item">
                    <div>
                    <h2>"I love the ease of working out at home with Anytime Fitness"</h2>
                    <h6>Erin G.</h6>
                    </div>
                </div>
                <div className="carousel-item">
                    <div>
                    <h2>"Finally found a website where i can do a lot of workout.I am totaly hooked"</h2>
                    <h6>John M.</h6>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Carousel


