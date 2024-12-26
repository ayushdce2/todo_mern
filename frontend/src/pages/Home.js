import react,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";
import "./assets/home.css";

function Home(){
    const [loggedInUser, setLoggedInUser] = useState("");
    const [todoAll, setTodoAll] = useState([]);
    const [descriptionData,setDescriptionData]= useState({description : ""});
    const [todoUpdated, setTodoUpdated] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        const userName = localStorage.getItem("loggedInUser");
        setLoggedInUser(userName);
    });
    
    const fetchtodo = async ()=>{
        try{

            const url = "https://todo-mern-back-kxky.onrender.com/todoall";
            const headers = {
                headers : {
                    "Authorization": localStorage.getItem("token")
                }
            }
            const response = await fetch(url,headers);
            const result = await response.json();
            setTodoAll(result);

        }catch(error){
            console.log("Error");
            handleError(error);
        }
      
    }
    useEffect(()=>{
        fetchtodo();
        // console.log("HOIT",todoUpdated);
    },[todoUpdated]);

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


    const handleChange = (e)=>{
        const {name,value} = e.target;
        console.log(name,value);
        const copydescriptionData = {...descriptionData};
        copydescriptionData[name] = value;
        setDescriptionData(copydescriptionData);
        console.log(descriptionData,"---descriptionData");
    }

    const handlenotesAdd = async (e)=>{
        e.preventDefault();
        // console.log("handlenotesAdd",descriptionData);
        
        
        try{
            const response = await fetch('https://todo-mern-back-kxky.onrender.com/auth/todoADD', {
                method: 'POST',
                headers: {
                    "content-type" : "application/json",
                    // "Email": localStorage.getItem("email"),
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify(descriptionData)
            });
            const result = await response.json();
            // console.log(result,"result");
            setTodoUpdated(result);
            const {success, message, error, jwtToken, name} = result;
            if(success){
                handleSuccess(message);
                
            }else if(error){
                
                const errorDetails = error?.details[0].message;
                handleError(errorDetails);
            }else if(!success){
                handleError(message);
            }
            
           
        }catch(error){
            handleError(error);
            
            console.log("ERROR");
            
        }
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
                        <textarea placeholder="Add Notes here . .  ." onChange={handleChange} name="description"></textarea>
                    
                        <button>Add</button>
                   </div>
                </form>
            
            <div className="home_contentmain">
                <ul>
                {todoAll.length === 0 ? (
                <p>...</p>
            ) : (
                
                todoAll.map((item, index) => (
                    
                    
                        <li className="todo_unit" key={index}>
                            <input type="checkbox"/>
                            <p>{item.description}</p>
                            <button>Del</button>
                            <button>Edit</button>
                        </li>
                    
                    )
                    
                ))
            }
                    
                    
                </ul>
            </div>
            
            
            <ToastContainer/>
            </div>
        </>
    )
}

export default Home;