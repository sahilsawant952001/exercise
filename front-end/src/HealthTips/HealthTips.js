import React,{useEffect, useState} from 'react'
import Footer from '../Footer/Footer';
import classes from "../HealthTips/HealthTips.module.css";
import TipsModal from "../TipsModal/TipsModal";

function HealthTips() {

    const url = 'http://localhost:4000/healthTips'

    useEffect(() => {
        fetch(url).then(response => response.json()).then(data => settips(data))
    },[])

    const [tips, settips] = useState([]);

    const [modalData, setmodalData] = useState(null)

    const showModal = (data) => {
        setmodalData(data);
        var modal = document.getElementById("tipsModal");
        modal.style.display="block";
    }

    const deletemodalData= () => {
        setmodalData(null);
    }

    const tips_list = tips.map( data => {
        return <li key={data._id} className="list-group-item"><h5>{data._id}</h5> <button style={{float:"right"}} onClick={() => showModal(data)} class="btn btn-secondary float-right">View</button></li>
    })


    
    return (
        <div className={classes.workoutClass}>
            <h1>HEALTH TIPS</h1>
            <div className={classes.group}>
                <ul className="list-group">
                    {tips_list}
                </ul>
            </div>
            <TipsModal data={modalData} delete = {deletemodalData}/>
            <Footer/>
        </div>
    )
}

export default HealthTips
