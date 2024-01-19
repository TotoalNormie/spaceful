// import React from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useState } from 'react';
import style from "../style/Login.module.css";

const Logout = () => {

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
      // navigate('/login');
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


  // useEffect(() => {
  //   console.log("token: ", Cookies.get('token'));
  //   const navigate = useNavigate();
  //   if(Cookies.get('token') == undefined){
  //     navigate('/login');
  //   }
  //   const config = {
  //       headers: { Authorization: `Bearer ${Cookies.get('token')}` }
  //   };
  //   const result = axios.post('http://localhost:8000/api/logout', {
  //     withCredentials: true
  //   }, config)
  //     .then(function (response) {
  //       //success
  //       console.log(response.data);
  //       alert(response.data.message);
  //       if(Cookies.get('token') != undefined){
  //         Cookies.remove('token');
  //       }
  //       navigate('/login');
  //       // return <Navigate to='/login'/>
  //     })
  //     .catch(function (error) {
  //       //fail
  //       console.error(error.response.data.error);
  //       alert(error.response.data.error);
  //       return navigate('/login');
  //     });
  // });

}

export default Logout