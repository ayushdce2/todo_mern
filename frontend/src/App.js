import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import React,{useState} from "react";
import Refreshhandler from "./pages/Refreshhandler";

function App() {

  const [isAuthenticated,setIsAuthenticated] = useState(false);
    const PrivateRouting = ({element})=>{
      return isAuthenticated ? element : <Navigate to="/login" />
    }



  return (
    <>
  <Refreshhandler setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={<PrivateRouting element={<Home/>}/>} />
      </Routes> 
      
    </>
  );
}

export default App;
