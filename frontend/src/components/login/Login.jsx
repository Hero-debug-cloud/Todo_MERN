import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const form_value = async (e) => {
        e.preventDefault();
        const value = {
            username: username,
            password:password
        }
        const token = await axios.post("/api/auth/login", value);
        localStorage.setItem("token", token.data);
        navigate("/home");
        
    }
  return (
      <div className="login">
          <div className="inner_login">
              <h1 className="login_heading">Login</h1>
              <form action="#" className="login_form">
                  <input type="text" placeholder="Enter Username" className="login_inputing" onChange={(e)=>{setusername(e.target.value)}}/>
                  <input type="password" placeholder="Enter Password" className="login_inputing" onChange={(e)=>{setpassword(e.target.value)}}/>
                  <button className="login_submit_btn" onClick={form_value}>Login</button>
                  <Link to="/">
                   <button className="login_submit_btn">SignUp</button>
                  </Link>
                  
              </form>
          </div>
      </div>
  )
}

export default Login