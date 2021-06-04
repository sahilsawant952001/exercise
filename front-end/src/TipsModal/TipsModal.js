import React from 'react'
import classes from "../Modal/Modal.module.css";

function Modal(props) {

    function closeModal(){
        props.delete();
        var modal = document.getElementById("tipsModal");
        modal.style.display = "none";
    }

    const workOutContent =  props.data && <div><h1>{props.data._id}</h1>
                                <img style={{height:"300px",width:"300px"}} src={props.data.image} alt={props.data._id}></img>
                                <p>{props.data.tip}</p>
                            </div>

    return (
            <div id="tipsModal" className={classes.modal}>
                <div className={classes.modalContent}>
                {workOutContent}
                <button onClick={closeModal} className="btn btn-secondary float-right">Close</button>
                </div>
            </div>
    )
}

export default Modal
