import react,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";

function Home(){
    const [loggedInUser, setLoggedInUser] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const userName = localStorage.getItem("loggedInUser");
        setLoggedInUser(userName);
    });
    const fetchProducts = async ()=>{
        try{

            const url = "http://localhost:8080/products";
            const headers = {
                headers : {
                    "Authorization": localStorage.getItem("token")
                }
            }
            const response = await fetch(url,headers);
            const result = await response.json();
            setProducts(result);

        }catch(error){
            console.log("Error");
            handleError(error);
        }
      
    }
    useEffect(()=>{
        fetchProducts();
        
    },[]);
    const handleLogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("token");
        setLoggedInUser("");
        handleSuccess("Logging Out . . .  .")
        setTimeout(()=>{
            navigate("/login")
        },1000)

    }
    return(
        <>
            <p>{loggedInUser}</p>
            <button onClick={handleLogout}>LogOut</button>
            <hr/>
             {
                products && products?.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item.name} - Rs. {item.price}</p>
                            
                        </div>
                    );
                })
            }
            <ToastContainer/>
        </>
    )
}

export default Home;