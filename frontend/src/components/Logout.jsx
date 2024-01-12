import React from 'react'
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    axios.post('http://localhost:8000/api/logout', {
      withCredentials: true
    })
      .then(function (response) {
        console.log(response.data.message);
        if(response.data.message == "User logged out sucessfuly"){
          navigate("/login");
        }
        // Cookies.remove('token');
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });

  return (
    <div>Logout</div>
  )
}

export default Logout