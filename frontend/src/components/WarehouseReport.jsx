import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const WarehouseReport = () => {
    //sitas tikai testesanai
    // let warehouseid = 1;
    const doc = new jsPDF();
    const [report, setReport] = useState([]);
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        };
        // console.log(Cookies.get('token'));
        axios.get(`http://localhost:8000/api/warehouse/report/`, config)
        .then(function (response) {
            console.log(response.data);
            setReport(response.data);
        })
        .catch(function (error) {
        });
	}, []);
    function getPdf(){
        autoTable(doc, { html: '#report', theme: 'striped' });
        doc.save('table.pdf');
    }
  return (
    <>
    <table id='report'>
        <thead>
            <tr>
                <th>Warehouse Id</th>
                <th>Product amount</th>
                <th>Product name</th>
                <th>Product ShelfId</th>
                {/* <th>Total</th> */}
            </tr>
        </thead>
        <tbody>
                {report.map(reported => <><tr><td key={reported.id}>{reported.id}</td><td>{reported.amount}</td><td>{reported.name}</td><td>{reported.shelfId}</td></tr></>)}
                {/* <tr><td></td><td></td><td></td><td></td><td>{report.forEach()}</td></tr> */}

        </tbody>
    </table>
    <button onClick={getPdf}>Get PDF</button>
    </>
  )
}

export default WarehouseReport