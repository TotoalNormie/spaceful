import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const navigate = useNavigate();
    // Cookies.remove("token");
    // axios.post('http://localhost:8000/api/login', {
    //     name: username,
    //     password: password,
    //     headers: {
    //         'Authorization': 'Bearer ' + token
    //       }
    //     }
    // )

    function register(){

        if(password != repeat){
            return alert("Passwords don't match.");
        }

        axios.post('http://localhost:8000/api/user', {
            name: username,
            password: password
          })
          .then(function (response) {
            // console.log(response.data.token);
          })
          .catch(function (error) {
            console.log(error);
            alert(error);
        });

        axios.post('http://localhost:8000/api/login', {
            name: username,
            password: password
          })
          .then(function (response) {
            // console.log(response.data.token);
            // Cookies
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
    <div>Register</div>
    <p>Token: {Cookies.get("token")}</p>
    <label>
    Username:
        <input type='text' name='name' value={username} onChange={(e) => setUsername(e.target.value)}></input>
    </label>
    <label>
    Password:
    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
    </label>
    <label>
    Repeat Password:
    <input type='password' value={repeat} onChange={(e) => setRepeat(e.target.value)}></input>
    </label>
    <button onClick={register}>Register</button>
    </>
  )
}

export default Login
