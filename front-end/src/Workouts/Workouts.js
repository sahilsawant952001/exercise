import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import classes from "../Workouts/Workouts.module.css";

function Workouts() {

    const [beginner, setbeginner] = useState([])
    const [intermediate, setintermediate] = useState([])
    const [advanced, setadvanced] = useState([])

    const url1 = 'http://localhost:4000/Workout/Beginner';
    const url2 = 'http://localhost:4000/Workout/Intermediate';
    const url3 = 'http://localhost:4000/Workout/Advanced';


    useEffect(() => {
        fetch(url1).then(response => response.json()).then(data1 => setbeginner(data1));
        fetch(url2).then(response => response.json()).then(data2 => setintermediate(data2));
        fetch(url3).then(response => response.json()).then(data3 => setadvanced(data3));
     
    },[])

    

    const beginnerWorkouts = beginner.map((data) => {
        const path = "/Workouts/beginner/"+data._id;
        return  <Link key={data._id} to={path}>
                    <div className="card" style={{width:"18rem",textAlign:"center",display:"inline-block",margin:"1% 3%"}}>
                        <img alt="k1" className="card-img-top" style={{height:"200px",width:"100%"}} src={data.image}/>
                        <div className="card-body">
                        <p className="card-text">{data._id}</p>
                        </div>
                    </div>
                </Link>
    })

    const intermediateWorkouts = intermediate.map((data) => {
        const path = "/Workouts/intermediate/"+data._id;
        return  <Link key={data._id} to={path}>
                    <div className="card" style={{width:"18rem",textAlign:"center",display:"inline-block",margin:"1% 3%"}}>
                        <img alt="k2" className="card-img-top" style={{height:"200px",width:"100%"}} src={data.image}/>
                        <div className="card-body">
                        <p className="card-text">{data._id}</p>
                        </div>
                    </div>
                </Link>
    })

    const advancedWorkouts = advanced.map((data) => {
        const path = "/Workouts/advanced/"+data._id;
        return <Link key={data._id} to={path}>
                    <div className="card" style={{width:"18rem",textAlign:"center",display:"inline-block",margin:"1% 3%"}}>
                        <img alt="k3" className="card-img-top" style={{height:"200px",width:"100%"}} src={data.image}/>
                        <div className="card-body">
                        <p className="card-text">{data._id}</p>
                        </div>
                    </div>
                </Link>
    })

    return (
        <div className={classes.outer}>
            <div className={classes.workOut}>
                <h2>BEGINNER WORKOUTS</h2>
                {beginnerWorkouts}
                <h2>INTERMEDIATE WORKOUTS</h2>
                {intermediateWorkouts}
                <h2>ADVANCED WORKOUTS</h2>
                {advancedWorkouts}
            </div>
            <Footer/>
        </div>
    )
}

export default Workouts
