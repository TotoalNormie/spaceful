import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../style/Login.module.css";
import flex from "../style/Flex.module.css";
import logo from '../assets/logo.png';
import { User, Lock } from '@phosphor-icons/react/dist/ssr';
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState();
  const [usernameError, setusernameError] = useState(false);
  const [password, setPassword] = useState();
  const [passError, setpassError] = useState(false);
  const navigate = useNavigate();

  // Cookies.remove('token');
  if(Cookies.get('token') != undefined){
    navigate('/');
  }

  // axios.post('http://localhost:8000/api/login', {
  //     name: username,
  //     password: password,
  //     headers: {
  //         'Authorization': 'Bearer ' + token
  //       }
  //     }
  // )

  // useEffect(
  //   () => {
  //     axios
  //     .post("http://localhost:8000/api/login", {
  //       name: username,
  //       password: password,
  //     })
  //     .then(function (response) {
  //       // console.log(response.data.token);
  //       navigate("/");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       alert(error);
  //     });
  //   }, []);
  // function checkLogin(){
  //   axios
  //     .post("http://localhost:8000/api/login", {
  //       name: username,
  //       password: password,
  //     })
  //     .then(function (response) {
  //       // console.log(response.data.token);
  //       navigate("/");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       alert(error);
  //     });
  // }


  function login() {
    if(username == undefined && password == undefined){
      setusernameError(true);
      setpassError(true);
      return;
    }
    if(username == undefined){
      setusernameError(true);
      return;
    }
    if(password == undefined){
      setpassError(true);
      return;
    }
    axios
      .post("http://localhost:8000/api/login", {
        name: username,
        password: password,
      })
      .then(function (response) {
        // console.log(response.data.token);
        Cookies.set('token', response.data.token);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        // alert(error.response.data.error);
      });
  }

  return (
    <div className={[style.bg, flex.flex_cen].join(' ')}>
      <div className={[flex.flex_c, style.box, flex.flex_cen].join(" ")}>
        <h2 className={style.title}>Sign In</h2>
        <label>
          <div className={[style.border_bot, flex.flex_cen].join(' ')}>  
            <User fill="#000000" size='1.5rem'/>
            <div className={[flex.flex_c].join(' ')}>
              <input
                type="text"
                placeholder="Username"
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              {usernameError &&
              <p className={style.error}>Username can't be empty.</p>
              }
            </div>
          </div>
        </label>
        <label>
        <div className={[style.border_bot, flex.flex_cen].join(' ')}>
          <Lock fill="#000000" size='1.5rem'/>
          <div className={[flex.flex_c].join(' ')}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {passError &&
            <p className={style.error}>Password can't be empty.</p>
            }
          </div>
        </div>
        </label>
        <button onClick={login} className={style.button}>Sign In</button>
        <img src={logo} className={[style.logo].join(' ')}/>
      </div>
    </div>
  );
};

export default Login;
