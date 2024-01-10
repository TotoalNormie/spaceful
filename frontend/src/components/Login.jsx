import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    if(Cookies.get('token') != undefined){
      navigate("/");
    }
    // axios.post('http://localhost:8000/api/login', {
    //     name: username,
    //     password: password,
    //     headers: {
    //         'Authorization': 'Bearer ' + token
    //       }
    //     }
    // )
    

    function login(){

        axios.post('http://localhost:8000/api/login', {
            name: username,
            password: password
          })
          .then(function (response) {
            // console.log(response.data.token);
            Cookies.set('token', response.data.token);
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
            alert(error);
          });
    }

  return (
    <>
    <div>Login</div>
    <p>Token: {Cookies.get("token")}</p>
    <label>
    Username:
        <input type='text' name='name' value={username} onChange={(e) => setUsername(e.target.value)}></input>
    </label>
    <label>
    Password:
    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
    </label>
    <button onClick={login}>Login</button>
    </>
  )
}

export default Login
