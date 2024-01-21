import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const WarehouseReport = () => {
    //sitas tikai testesanai
    let warehouseid = 1;
    useEffect(() => {
        axios.get(`http://localhost:8000/api/warehouse/report/${warehouseid}`,)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
        });
	}, []);
  return (
    <div>WarehouseReport</div>
  )
}

export default WarehouseReport