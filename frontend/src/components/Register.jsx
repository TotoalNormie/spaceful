import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import flex from "../style/Flex.module.css";
import style from "../style/Login.module.css";
import logo from '../assets/logo.png';
import { User, Lock, Envelope } from '@phosphor-icons/react/dist/ssr';
import Cookies from 'js-cookie';

const Register = () => {

    const [username, setUsername] = useState('');
    const [userNameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [repeat, setRepeat] = useState('');
    const [repeatError, setRepeatError] = useState(false);
    
    const navigate = useNavigate();
    if(Cookies.get('token') != undefined){
      navigate('/');
    }

    function register(){
        if(password != repeat){
            setRepeatError(true);
            // return;
        }else{
          setRepeatError(false);
        }
        if(!email){
          setEmailError(true);
          // return;
        }else{
          setEmailError(false);
        }
        if(!password){
          setPasswordError(true);
          // return;
        }else{
          setPasswordError(false);
        }
        if(!username){
          setUsernameError(true);
          return
        }else{
          setUsernameError(false);
        }
        if(passwordError || emailError || repeatError || userNameError){
          return;
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
            alert(error.response.data.message);
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
            {userNameError &&
            <p className={style.error}>Username can't be empty.</p>
            }
          </div>
        </label>
        <label>
          <div className={[style.border_bot, flex.flex_cen].join(' ')}>
            <Envelope fill="#000000" size='1.5rem'/>
            <input type="email" placeholder='Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            {emailError &&
            <p className={style.error}>Email can't be empty.</p>
            }
          </div>
        </label>
        <label>
          <div className={[style.border_bot, flex.flex_cen].join(' ')}>
            <Lock fill="#000000" size='1.5rem'/>
            <input type='password' placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            {passwordError &&
            <p className={style.error}>Password can't be empty.</p>
            }
          </div>
        </label>
        <label>
          <div className={[style.border_bot, flex.flex_cen].join(' ')}>
            <Lock fill="#000000" size='1.5rem'/>
            <input type='password' placeholder='Repeat Password' value={repeat} onChange={(e) => setRepeat(e.target.value)}></input>
            {repeatError &&
            <p className={style.error}>Passwords must match.</p>
            }
          </div>
        </label>
        <button onClick={register} className={style.button}>Register</button>
        <img src={logo} className={[style.logo].join(' ')}/>
      </div>
    </div>
  )
}

export default Register
