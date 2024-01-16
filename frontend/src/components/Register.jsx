import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import flex from "../style/Flex.module.css";
import style from "../style/Login.module.css";
import logo from '../assets/logo.png';
import { User, Lock, Envelope } from '@phosphor-icons/react/dist/ssr';
import Cookies from 'js-cookie';

const Login = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const navigate = useNavigate();

    function register(){

        if(password != repeat){
            return alert("Passwords don't match.");
        }

        axios.post('http://localhost:8000/api/user', {
            name: username,
            password: password,
            email: email
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
    <div className={[style.bg, flex.flex_cen].join(' ')}>
      <div className={[flex.flex_c, style.box, flex.flex_cen].join(" ")}>
        <h2 className={style.title}>Register</h2>
        <label>
          <div className={[style.border_bot, flex.flex_cen].join(' ')}>
            <User fill="#000000" size='1.5rem'/>
            <input type='text' placeholder='Username' name='name' value={username} onChange={(e) => setUsername(e.target.value)}></input>
          </div>
        </label>
        <label>
          <div className={[style.border_bot, flex.flex_cen].join(' ')}>
            <Envelope fill="#000000" size='1.5rem'/>
            <input type="email" placeholder='Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>
        </label>
        <label>
          <div className={[style.border_bot, flex.flex_cen].join(' ')}>
            <Lock fill="#000000" size='1.5rem'/>
            <input type='password' placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
        </label>
        <label>
          <div className={[style.border_bot, flex.flex_cen].join(' ')}>
            <Lock fill="#000000" size='1.5rem'/>
            <input type='password' placeholder='Repeat Password' value={repeat} onChange={(e) => setRepeat(e.target.value)}></input>
          </div>
        </label>
        <button onClick={register}>Register</button>
        <img src={logo} className={[style.logo].join(' ')}/>
      </div>
    </div>
  )
}

export default Login
