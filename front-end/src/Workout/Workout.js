import React,{useEffect, useState} from 'react'
import { useParams,Link } from "react-router-dom";
import classes from "../Workout/Workout.module.css";
import Modal from "../Modal/Modal";
import Footer from '../Footer/Footer';


function Workout() {

    const param = useParams();

    const url = 'http://localhost:4000/Workout/'+param.type+"/"+ param.workout;

    const [exercise_data, setexercise_data] = useState([])

    const [modalData, setmodalData] = useState(null)

    useEffect(() => {
        fetch(url).then(response => response.json()).then(data => setexercise_data(data))
    },[url])

    const showModal = (data) => {
        setmodalData(data);
        var modal = document.getElementById("workOutModal");
        modal.style.display="block";
    }

    const deletemodalData= () => {
        setmodalData(null);
    }

    const exercise = exercise_data.map( data => {
        return <li key={data.name} className="list-group-item"><h5>{data.name}</h5> <button style={{float:"right"}} onClick={() => showModal(data)} className="btn btn-secondary float-right">View</button></li>
    })

    const path = '/Workouts/'+param.type+'/'+param.workout+'/start';

    return (
        <div className={classes.workoutClass}>
            <h1>{param.workout}</h1>
            <div className={classes.group}>
                <ul className="list-group">
                    {exercise}
                </ul>
            </div>
            <Modal data={modalData} delete = {deletemodalData}/>
           
            <Link to={path} className="btn btn-secondary btn-lg" style={{margin:"1% 0 5% 0"}}>START WORKOUT</Link>
            <Footer/>
        </div>
    )
}

export default Workout
