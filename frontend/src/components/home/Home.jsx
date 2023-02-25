import React, { useEffect, useState } from 'react';
import {redirect, useNavigate } from "react-router-dom";
import "./home.css"
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [task_name, settask_name] = useState("");
  const [task_array, settask_array] = useState([]);

  const change_input = (e) => {
    settask_name(e.target.value);
    e.target.value = "";
  }

  //inserting into db;
  const addingtolist = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "Authorization":`Bearer ${token}`}
    }
    const response=await axios.post("/api/list/task", {
      name: task_name
    }, config).catch((err) => {
      navigate("/");
      return 0;
    });
    fetchData();
  }

  //deleting from database
  const taskClicked = async (e) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "Authorization":`Bearer ${token}`}
    }
    await axios.post("/api/list/deleting", {
      id: e.target.id
    }, config).catch((err) => {
      redirect("/");
      return 0;
    });
    fetchData();
  }
  useEffect(() => {
    fetchData();
  }, []);
    

  // getting all tasks from db;
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { "Authorization":`Bearer ${token}`}
    }
    await axios.get("/api/list/all", config).then(res => {
      settask_array(res.data);
    }).catch((err) => {
      navigate("/login");
      return 0;
    });
    // settask_array(Array.from(data));
  }
  return (
    <div className="Home">
      <div className="innerhome">
        <div className="inputing">
          <input type="text" className='adding_input' onChange={change_input} placeholder="Enter Task Name"/>
          <button className="add_btn" onClick={addingtolist}>Add</button>
        </div>
        <div className="listing_task">
          {task_array.map((value) => {
            return (<li key={value.id} className='item' id={value.id} onClick={taskClicked}>{value.name}</li>);
          })}
        </div>
      </div>
    </div> 
  )
}

export default Home