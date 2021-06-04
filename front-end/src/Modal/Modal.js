import React from 'react'
import classes from "../Modal/Modal.module.css";

function Modal(props) {

    function closeModal(){
        props.delete();
        var modal = document.getElementById("workOutModal");
        modal.style.display = "none";
    }

    const url = 'https://www.youtube.com/embed/';

    const workOutContent =  props.data && <div><h1>{props.data.name}</h1>
                            <p>{props.data.description}</p>
                            <iframe title="youtube" width="420" height="315"
                                    src={url.concat(props.data.link)}>
                            </iframe>
                            {props.data.duration !=="null" ? <h4>Duration : {props.data.duration} Seconds</h4> : null}
                            {props.data.repeat !== "null" ? <h4>Repeat : {props.data.repeat} Times</h4> : null}</div>

    return (
            <div id="workOutModal" className={classes.modal}>
                <div className={classes.modalContent}>
                {workOutContent}
                <button onClick={closeModal} className="btn btn-secondary float-right">Close</button>
                </div>
            </div>
    )
}

export default Modal
