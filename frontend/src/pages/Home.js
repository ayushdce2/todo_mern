import react,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";
import "./assets/home.css";

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

            const url = "https://todo-mern-back-kxky.onrender.com/products";
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
    const handlenotesAdd = (e)=>{
        e.preventDefault();
        console.log("handlenotesAdd");
    }
    return(
        <>
        <div className="home_wrap">

            <div className="home_topbar">
                <div className="home_name">
                    <p>{loggedInUser}</p>
                </div>
                <div className="home_logout">
                    <button onClick={handleLogout}>LogOut</button>
                </div>
            </div>

               <form onSubmit={handlenotesAdd}>
                   <div className="home_contenttop">
                        <textarea placeholder="Add Notes here . .  ." ></textarea>
                    
                        <button>Add</button>
                   </div>
                </form>
            
            <div className="home_contentmain">
                <ul>
                    <li className="todo_unit">
                        <input type="checkbox"/>
                        <p>This is sample notes 1 : demo content here demo content here demo content here demo content here demo content here demo content here demo content here demo content here demo content here demo content here demo content here demo content here demo content here demo content here demo content here demo content here </p>
                        <button>Del</button>
                        <button>Edit</button>
                    </li>
                    
                </ul>
            </div>
            
            {/* {products.length === 0 ? (
                <p>Data loading...</p>
            ) : (
                
                products.map((item, index) => (
                    <div key={index}>
                        <p>{item.name} - Rs. {item.price}</p>
                    </div>
                ))
            )} */}
            <ToastContainer/>
            </div>
        </>
    )
}

export default Home;