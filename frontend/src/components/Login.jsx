import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import style from '../style/Login.module.css';
import flex from '../style/Flex.module.css';
import logo from '../assets/logo.png';
import { User, Lock } from '@phosphor-icons/react/dist/ssr';
import Cookies from 'js-cookie';

const Login = () => {
	const [username, setUsername] = useState(undefined);
	const [usernameError, setusernameError] = useState(false);
	const [password, setPassword] = useState(undefined);
	const [passError, setpassError] = useState(false);
	const [axiosError, setAxiosError] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();

	// Cookies.remove('token');
	useEffect(() => {
		const checkLoginStatus = () => {
			if (Cookies.get('token') !== undefined) {
				navigate('/');
			}
		};

		checkLoginStatus();
	}, [navigate]);

	function login() {
		if (username == undefined && password == undefined || username == "" && password == "") {
			setusernameError(true);
			setpassError(true);
			return;
		}else{
			setusernameError(false);
			setpassError(false);
		}
		if (username == undefined || username == "") {
			setusernameError(true);
			return;
		}else{
			setusernameError(false);
		}
		if (password == undefined || password == "") {
			setpassError(true);
			return;
		}else{
			setpassError(false);
		}
		axios
			.post('http://localhost:8000/api/login', {
				name: username,
				password: password,
			})
			.then(function (response) {
				// console.log(response.data.token);
				Cookies.set('token', response.data.token);
				navigate('/');
			})
			.catch(function (error) {
				console.log(error.response.data.error);
				setAxiosError(true);
				setErrMsg(error.response.data.error);
				// alert(error.response.data.error);
			});
	}

	return (
		<div className={[style.bg, flex.flex_cen].join(' ')}>
			<div className={[flex.flex_c, style.box, flex.flex_cen].join(' ')}>
				<h2 className={style.title}>Sign In</h2>
				<label>
					<div className={[style.border_bot, flex.flex_cen].join(' ')}>
						<User fill='#000000' size='1.5rem' />
						<div className={[flex.flex_c].join(' ')}>
							<input
								type='text'
								placeholder='Username'
								name='name'
								value={username}
								onChange={e => setUsername(e.target.value)}
								className={style.input}
							/>
							{usernameError && (
								<p className={style.error}>Username can't be empty.</p>
							)}
						</div>
					</div>
				</label>
				<label>
					<div className={[style.border_bot, flex.flex_cen].join(' ')}>
						<Lock fill='#000000' size='1.5rem' />
						<div className={[flex.flex_c].join(' ')}>
							<input
								type='password'
								placeholder='Password'
								name='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								className={style.input}
							/>
							{passError && <p className={style.error}>Password can't be empty.</p>}
						</div>
					</div>
				</label>
				{axiosError && <p className={style.error}>{errMsg}</p>}
				<button onClick={login} className={style.button}>
					Sign In
				</button>
				<img src={logo} className={[style.logo].join(' ')} />
				<p className={style.redirect}>
					Don’t have an account? <Link className={style.link} to='/register'>Sign Up here!</Link>
				</p>
				<Link className={style.link} to='/forgor'>Forgot password?💀</Link>
			</div>
		</div>
	);
};

export default Login;
