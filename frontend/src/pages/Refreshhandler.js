import react, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Refreshhandler = ({setIsAuthenticated,isAuthenticated})=>{
    const location = useLocation();
    const navigate = useNavigate(); 
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setIsAuthenticated(true);
            if(
                location.pathname === "/" ||
                location.pathname === "/login" ||
                location.pathname === "/signup"
            ){
                navigate("/home",{replace: false});
            }
        }else{
            // setIsAuthenticated(false);
            // navigate("/login");
        }
    },[location,navigate])
    return(
        null
    )
}

export default Refreshhandler;