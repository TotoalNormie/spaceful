import React from 'react'
import axios from 'axios';

const Status = () => {
    axios.get('http://localhost:8000/api/status/')
    .then(function (response) {
      console.log(response.data);
      // Cookies.remove('token');
    })
    .catch(function (error) {
      console.log(error);
      alert(error.response.data.error);
    });
  return (
    <div>Status</div>
  )
}

export default Status