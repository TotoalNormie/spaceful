import React from 'react'
import flex from '../style/Flex.module.css';
import style from '../style/Forgor.module.css';
import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';

const ForgorPass = () => {
    const [password, setPassword] = useState(undefined);
	const [passError, setpassError] = useState(false);
    const [email, setEmail] = useState(undefined);
    const [emailError, setEmailError] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [repeatError, setRepeatError] = useState(false);
	const [axiosError, setAxiosError] = useState(false);
    const [sucess, setSucess] = useState(false);
	const [errMsg, setErrMsg] = useState('');
    function reset(){
        if(password != repeat){
            setRepeatError("Passwords must match.");
        }
        else{
            setRepeatError(false);
        }
        if(email == undefined || email == ""){
            setEmailError('Email can\'t be empty.');
        }else{
            setEmailError(false);
        }
        if(password == undefined || password == ""){
            setpassError('Password can\'t be empty.');
        }else{
            setpassError(false);
        }
        axios
			.post('http://localhost:8000/api/pass/forgor', {
				email: email,
				password: password,
			})
			.then(function (response) {
				// console.log(response.data.token);
                console.log(response.data);
                setSucess(response.data.message);
			})
			.catch(function (error) {
				console.log(error.response.data.error);
				setAxiosError(true);
				setErrMsg(error.response.data.error);
				// alert(error.response.data.error);
			});
    }
  return (
    <div className={[flex.flex_cen, style.bg].join(' ')}>
        <div className={[style.border_bot, flex.flex_c, style.box].join(' ')}>
            <h2 className={style.title}>Reset Password</h2>
            <div className={[style.border_bot, flex.flex_c].join(' ')}>
                <input type="email" name="email" id="" onChange={e => setEmail(e.target.value)} className={style.input} placeholder='Email@email.com'/>
                {emailError && <p className={style.error}>{emailError}</p>}
            </div>
            <div className={[style.border_bot, flex.flex_c].join(' ')}>
                <input type="password" name="" id="" onChange={e => setPassword(e.target.value)} className={style.input} placeholder='password'/>
                {passError && <p className={style.error}>{passError}</p>}
            </div>
            <div className={[style.border_bot, flex.flex_c].join(' ')}>
                <input type="password" name="" id="" onChange={e => setRepeat(e.target.value)} className={style.input} placeholder='repeat password'/>
                {repeatError && <p className={style.error}>{repeatError}</p>}
            </div>
            {axiosError && <p className={style.error}>{errMsg}</p>}
            {sucess && <p className={style.sucess}>{sucess}</p>}
            <button onClick={reset} className={style.button}>Reset Password</button>
            <img src={logo} className={[style.logo].join(' ')} />
        </div>
    </div>
  )
}

export default ForgorPass