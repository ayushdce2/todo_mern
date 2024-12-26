import react,{useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { useNavigate } from "react-router-dom";
import "./assets/login.css";
function Login(){
    const [logininfo, setLogininfo] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target;
        console.log(name,value);
        const copyLogininfo = {...logininfo};
        copyLogininfo[name] = value;
        setLogininfo(copyLogininfo);
        console.log(logininfo,"---logininfo");
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        const {email,password} = logininfo;
        if(!email || !password){
            return handleError("enter all details");
        }
        try{
            const response = await fetch('https://todo-mern-back-kxky.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(logininfo)
            });
            const result = await response.json();
            const {success, message, error, jwtToken, name} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem("token",jwtToken);
                localStorage.setItem("loggedInUser",name);

                setTimeout(()=>{
                    navigate('/home');
                },1000);
            }else if(error){
                
                const errorDetails = error?.details[0].message;
                handleError(errorDetails);
            }else if(!success){
                handleError(message);
            }
            console.log(result,"result");
        }catch(error){
            handleError(error);
            console.error(error);
        }
    }

    return(
        <>
            <div className="login_wrap">
            <div className="login-container">
                <label>LOGIN</label>
                <form onSubmit={handleLogin} className="login_form">
                    <input type="text" name="email" autoFocus placeholder="email" onChange={handleChange} value={logininfo.email}/>
                    <input type="text" name="password" autoFocus placeholder="password" onChange={handleChange} value={logininfo.password}/>
                    
                    <button className="button-9" role="button">Login</button>
                </form>
            <br/>
            <Link to="/signup" className="bottomLabel">Click to SignUp </Link>
            <ToastContainer/>
            </div>
            </div>
        </>
    )
}

export default Login;