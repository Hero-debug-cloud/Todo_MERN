import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const handleform = async (e) => {
        e.preventDefault();
        const form_value = {
            username: username,
            email: email,
            password:password
        }
        await axios.post("/api/auth/register", form_value);
        navigate("/login");
    }
  return (
    <div className="register">
          <div className="inner_register">
              <h1 className="register_heading">Register</h1>
              <form action="#" className="register_form">
                  <input type="text" placeholder="Enter Username" className="register_inputing" onChange={(e)=>{setusername(e.target.value)}}/>
                  <input type="email" placeholder="Enter Email" className="register_inputing" onChange={(e)=>{setemail(e.target.value)}}/>
                  <input type="password" placeholder="Enter Password" className="register_inputing" onChange={(e)=>{setpassword(e.target.value)}}/>
                  <button className="register_submit_btn" type="submit" onClick={handleform}>SignUp</button>
                  <Link to="/login">
                  <button className="register_submit_btn">Login</button>
                  </Link>
              </form>
          </div>
      </div>
  )
}

export default Register