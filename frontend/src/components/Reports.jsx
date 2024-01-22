import React from 'react';
import css from "../style/Reports.module.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Reports = () => {
    const [closed, setClosed] = useState(0);
    const [products, setProducts] = useState(0);
    const [open, setOpen] = useState(0);
    const [appId, setAppId] = useState(0);
    const [role, setRoleName] = useState("");
    const config = {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` }
    };
    useEffect(() => {
        axios.get(`http://localhost:8000/api/warehouse/legit/`,)
        .then(function (response) {
            console.log(response.data);
            setClosed(response.data[0]);
            setProducts(response.data[1]);
            setOpen(response.data[2]);
            // setReport(response.data);
        })
        .catch(function (error) {
            alert(error);
        });
        axios.get(`http://127.0.0.1:8000/api/fitogus/`, config)
        .then(function (response) {
            console.log(response.data);
            setAppId(response.data[0]);
            setRoleName(response.data[1]);
            // setReport(response.data);
        })
        .catch(function (error) {
            alert(error);
        });
	}, []);
    
	return (
        <>
            <div className={css.mainContainer}>
                <h1 className={css.h1}> "Warehouse name" reports</h1>  
                <div className={css.chartsContainer}>
                    {/* <div className={css.chart}>chart1</div>
                    <div className={css.chart}>chart2</div> */}
                    <div className={css.chart}>
                        WareHouse AppId:<br></br>{appId}</div>
                    <div className={css.chart}>Role Name:<br></br>{role}</div>
                </div>
                <div className={css.reportsContainer}>
                    <div className={css.report}>
                        <div className={css.reportTitle}>Closed orders</div>
                        <div className={css.reportCount}>{closed}</div>
                    </div>
                    <div className={css.report}>
                        <div className={css.reportTitle}>Products in warehouse</div>
                        <div className={css.reportCount}>{products}</div>
                    </div>
                    <div className={css.report}>
                        <div className={css.reportTitle}>Open orders</div>
                        <div className={css.reportCount}>{open}</div>
                    </div>
                </div>
                <button className={css.convertButton}>Convert to xml</button>
                <button className={css.convertButton}><a href='/reports/products'>View Products Report</a></button>
                <button className={css.convertButton}><a href='/reports/warehouse'>View Warehouses Report</a></button>
            </div>
        </>
    )


}

export default Reports;