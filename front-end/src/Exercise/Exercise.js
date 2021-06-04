import React, { useState,useEffect } from 'react'
import classes from "../Exercise/Exercise.module.css";
import { useSelector } from "react-redux";
import { useParams,useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Exercise() {

    let history = useHistory();

    const [exercises, setexercises] = useState(null);

    const [index, setindex] = useState(0);

    const [restTime, setrestTime] = useState(5)

    const [exerciseTime, setexerciseTime] = useState(0);

    const [count, setCount] = useState(0);

    const param = useParams();

    const id = useSelector(state => state.auth.id);

    const type = param.type;

    const workout = param.workout;

    const url = 'http://localhost:4000/Workout/'+param.type+"/"+ param.workout;

    let restInfo = null;

    let exerciseInfo = null;

    useEffect(() => {
        fetch(url).then(response => response.json()).then(data => {
            setexercises(data)
        });
    },[url]);

    useEffect(() => {
        if(exercises!==null && exercises[index].duration!=="null"){
            setexerciseTime(exercises[index].duration);
            setCount(count+1)
        }
    },[ exerciseTime===restTime && count<=1 ])

    function GetExercise(params) {
       if(index<exercises.length-1){
            setindex(index+1);
            setrestTime(5);
            setexerciseTime(0);
            restInfo=null;
            exerciseInfo=null;
            setCount(0);
       }
    }

    function decreaseTime(params) {
        const x = setTimeout(() => {
            const newRestTime = restTime-1;
            setrestTime(newRestTime);
        },1000)

        if(restTime===-1){
            clearTimeout(x);
        }
    }

    function decreaseExerciseTime(params) {
        const y = setTimeout(() => {
            const newExerciseTime = exerciseTime-1;
            setexerciseTime(newExerciseTime);
        },1000)

        if(exerciseTime===0){
            clearTimeout(y);
        }
    }

    if(exercises!==null && restTime>0){
       decreaseTime();
    }

    if(restTime===0){
        decreaseExerciseTime();
    }
    
    if(exercises!==null){
        restInfo = <div className="row"><div className="col-lg-6" style={{padding:"8%"}}><h1>START {exercises[index].name} IN {restTime} SECONDS</h1></div><div className="col-lg-6" style={{padding:"8%"}}><img alt="af-img" src={exercises[index].gif}></img></div></div>
    }

    if(exercises!==null){
        if(exercises[index].duration !== "null"){
            exerciseInfo = 
            <div className="row">
                <div className="col-lg-4" style={{padding:"7%"}}>
                    <h1>{exercises[index].name}</h1>
                </div>
                <div className="col-lg-4" style={{padding:"7%"}}>
                    <h1>{exerciseTime}</h1>
                    <h3>SECONDS LEFT</h3>
                </div>
                <div className="col-lg-4" style={{padding:"4%"}}>
                    <img alt="exercise" src={exercises[index].gif}></img>
                </div>
            </div>
        }
    }
  
    function updateVal(){
        const url = 'http://localhost:4000/update';
        fetch(url,{
            method:'POST',
            mode:'cors',
            body:JSON.stringify({
                id:id,
                type:type,
                workout:workout
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json();
        }).then( data => {
            history.replace('/Workouts');
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <div>
            <div className={classes.main}>
                    {exercises!==null && index===exercises.length-1 && restTime===0 && exerciseTime===0 ? <h1>Well Done You Completed {param.workout.toLowerCase()} <button to onClick={updateVal} className="btn btn-secondary btn-lg">Click Here</button></h1>:<div>
                    {restTime !==0 ? restInfo :null}
                    {restTime ===0 && exerciseTime!==0 ? exerciseInfo : null}
                    {exercises!==null && restTime ===0 && exerciseTime===0 && count!==0 ? <div className="row"><div className="col-lg-6" style={{padding:"7%"}}><h1 className={classes.sph1}> READY FOR {exercises[index+1].name} </h1> <button className="btn btn-secondary btn-lg" onClick={GetExercise}>READY</button> </div> <div className="col-lg-6" style={{padding:"8%"}}>    <img alt="at-img" src={exercises[index+1].gif}></img></div> </div>:null}
                </div>}
            </div>
            <Footer/>
        </div>
    )
}

export default Exercise
