import React from 'react'
import axios from 'axios';
import { Navigate, redirect, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Logout = () => {

    // const navigate = useNavigate();
    // console.log(Cookies.get('token'));
    // if(Cookies.get('token') == undefined){
    //   navigate('/login');
    // }

    const config = {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` }
    };

    const result = axios.post('http://localhost:8000/api/logout', {
      withCredentials: true
    }, config)
      .then(function (response) {
        //success
        console.log(response.data);
        alert(response.data.message);
        if(Cookies.get('token') != undefined){
          Cookies.remove('token');
        }
        redirect('/login');
        return <Navigate to='/login'/>
      })
      .catch(function (error) {
        //fail
        console.error(error.response.data);
        alert(error.response.data.error);
      });

}

export default Logout