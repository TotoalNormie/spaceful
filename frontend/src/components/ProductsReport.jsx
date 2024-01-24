import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useParams } from 'react-router-dom';

const ProductsReport = () => {
    const { warehouseId } = useParams();
    const doc = new jsPDF();
    const [products, setProducts] = useState([]);
    // async function getReport(){
        
    // }
    // await getReport();
    useEffect(() => {
        // let products = getReport();
        // setProducts(getReport());
        axios.get(`http://localhost:8000/api/products/report/`,)
        .then(function (response) {
            setProducts(response.data);
            console.log(response.data);
            // let products = response.data.map(product => <td key={product.name}>{product}</td>);
            // return products;
        })
        .catch(function (error) {
            console.error(error);
        });
        // console.log(products);
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
                <th>Product name</th>
                <th>Product category</th>
                <th>Product price</th>
                <th>Product supplier</th>
                <th>Product weight</th>
            </tr>
        </thead>
        <tbody>
                {products.map(product => <><tr><td key={product.name}>{product.name}</td><td>{product.categoryName}</td><td>{Math.round(product.price * 100)/100}</td><td>{product.supplier}</td><td>{product.weight} Kg</td></tr></>)}
            {/* <tr>
                <td>Product name</td>
                <td>Product price</td>
                <td>Product quantity</td>
            </tr> */}
        </tbody>
    </table>
    <button onClick={getPdf}>Get PDF</button>
    </>
  )
}

export default ProductsReport