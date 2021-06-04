import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import classes from '../Auth/Auth.module.css';
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import Footer from '../Footer/Footer';

function Auth() {
    
    const history = useHistory();

    const dispatch = useDispatch();

    const [error, seterror] = useState(null);

    const [login, setlogin] = useState(true);

    const [email, setemail] = useState("");

    const [password, setpassword] = useState("");

    function setPasswordHandler(event){
        setpassword(event.target.value);
    }

    function setEmailHandler(event){
        setemail(event.target.value);
    }

    async function signInHandler(event){
        event.preventDefault();
        const url = 'http://localhost:4000/signin';
        fetch(url,{
            method:'POST',
            mode:'cors',
            body:JSON.stringify({
                email:email,
                password:password,
            }),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json();
        }).then( data => {
            if(data.authenticatedUser){
                dispatch(authActions.login({id:data.id}));
                history.replace("/");
            }else{
                seterror(data.message);
            }
        }).catch((error) => {
            seterror(error);
        });
    }

    async function signUpHandler(event){
        event.preventDefault();
        const url = 'http://localhost:4000/signup';
        fetch(url,{
            method:'POST',
            mode:'cors',
            body:JSON.stringify({
                email:email,
                password:password,
            }),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json();
        }).then( data => {
            if(data.authenticatedUser){
                dispatch(authActions.login({id:data.id}));
                history.replace("/");
            }else{
                seterror(data.message);
            }
        }).catch((error) => {
            seterror(error);
        });
    }

    return (
        <div className={classes.auth}>
            <div className="row">
                <div className="col-lg-6" style={{margin:"0",padding:"0"}}>
                    <img className={classes.authImg} src="https://blog.zoom.us/wp-content/uploads/2020/05/workout-main.png" alt="imh"></img>
                </div>
                <div className="col-lg-6" style={{margin:"0",padding:"0",height:"100%"}}>
                    <div className={classes.formClass}>
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title" style={{margin:"2% 0 4% 0"}}>{login ===true ? "SIGN IN" : "SIGN UP"}</h1>
                                <h6 style={{margin:"1% 0 6% 0"}}>{error}</h6>
                                <form onSubmit={login?signInHandler:signUpHandler}>
                                    <div className="form-group">
                                        <input required value={email} onChange={setEmailHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                    </div>
                                    <div className="form-group">
                                        <input required value={password} onChange={setPasswordHandler} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                    </div>
                                    <button type="submit" className="btn btn-secondary btn-lg col-12">{login ===true ? "SIGN IN" : "SIGN UP"}</button>
                                </form>
                            </div>
                        </div>
                        <div className={classes.authOption}>
                            {login===true ? <h5>Don't Have A Account ?</h5>:
                            <h5>Already Have A Account ?</h5>}
                            <Link onClick={() => setlogin(!login)} to="/Login">SWTCH TO {login !==true ? "SIGN IN" : "SIGN UP"}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Auth

