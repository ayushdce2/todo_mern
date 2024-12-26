import react,{useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { useNavigate } from "react-router-dom";

function Signup(){
    const [signupinfo, setSignupinfo] = useState({name:"",email:"",password:""});
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target;
        console.log(name,value);
        const copysignupinfo = {...signupinfo};
        copysignupinfo[name] = value;
        setSignupinfo(copysignupinfo);
        console.log(signupinfo,"---signupinfo");
    }
    const handleSignup = async (e)=>{
        e.preventDefault();
        const {name,email,password} = signupinfo;
        if(!name || !email || !password){
            return handleError("enter all details");
        }
        try{
            const response = await fetch('https://todo-mern-back-kxky.onrender.com/auth/signup', {
                method: 'POST',
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(signupinfo)
            });
            const result = await response.json();
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login');
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
            <form onSubmit={handleSignup}>
            <input type="text" name="name" autoFocus placeholder="name" onChange={handleChange} value={signupinfo.name}/>
            <input type="text" name="email" autoFocus placeholder="email" onChange={handleChange} value={signupinfo.email}/>
            <input type="text" name="password" autoFocus placeholder="password" onChange={handleChange} value={signupinfo.password}/>
            <button>SignUp</button>
            </form>
            <br/>
            <Link to="/login">Login</Link>
            <ToastContainer/>
        </>
    )
}

export default Signup;