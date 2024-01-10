import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import style from "../style/Login.module.css";
import flex from "../style/Flex.module.css";
import logo from '../assets/logo.png';
import { User, Lock } from '@phosphor-icons/react/dist/ssr';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  Cookies.remove("token");
  // axios.post('http://localhost:8000/api/login', {
  //     name: username,
  //     password: password,
  //     headers: {
  //         'Authorization': 'Bearer ' + token
  //       }
  //     }
  // )

  function login() {
    axios
      .post("http://localhost:8000/api/login", {
        name: username,
        password: password,
      })
      .then(function (response) {
        // console.log(response.data.token);
        Cookies.set("token", response.data.token);
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
        <h2 className={style.title}>Sign In</h2>
        <label>
          <div className={[style.border_bot, flex.flex_cen].join(' ')}>  
            <User fill="#000000" size='1.5rem'/>
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
        </label>
        <label>
        <div className={[style.border_bot, flex.flex_cen].join(' ')}>
          <Lock fill="#000000" size='1.5rem'/>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        </label>
        <button onClick={login}>Sign In</button>
      </div>
    </div>
  );
};

export default Login;
