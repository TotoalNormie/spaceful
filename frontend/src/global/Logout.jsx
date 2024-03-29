// import React from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import style from '../style/Login.module.css';

const Logout = () => {
	const navigate = useNavigate();

	const config = {
		headers: { Authorization: `Bearer ${Cookies.get('token')}` },
	};
	const logout = () => {
		axios
			.post(
				'http://localhost:8000/api/logout',
				{
					withCredentials: true,
				},
				config
			)
			.then(function (response) {
				//success
				console.log(response.data);
				// alert(response.data.message);
				if (Cookies.get('token') != undefined) {
					Cookies.remove('token');
				}
				navigate('/login');
				// return <Navigate to='/login'/>
			})
			.catch(function (error) {
				//fail
				// setAxiosError(true);
				// setAxiosMessage(error.response.data.error);
				console.error(error.response.data.error);
				// alert(error.response.data.error);
				// return navigate('/login');
			});
	};

	return <button onClick={logout}>Logout</button>;
};

export default Logout;
