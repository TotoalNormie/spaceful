import { useEffect, useState } from 'react';
import css from "../style/AddNewProduct.module.css";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

//laika funkcija lai noteiktu datumu un ievietotu <input>
var curr = new Date();
//var date = curr.toISOString().substring(0,10);

const AddToWarehouse = () => {
    const { warehouseId } = useParams();
    const [product, setProduct] = useState('');
    const [productArray, setproductArray] = useState([]);
    const [amount, setAmount] = useState('');
    const [shelfId, setShelfId] = useState('');
    const [date, setDate] = useState(curr.toISOString().substring(0,10));
    const navigate = useNavigate();

    console.log(date);
    const productoptions = productArray.map((product) => <option key={product.id} value={product.id}>{product.name}</option>) 


    useEffect(()=> {
        axios
        .get(
            'http://localhost:8000/api/products/'+warehouseId,
        )
        .then(function (response) {
            //success
            console.log(response.data);
            setproductArray(response.data);
        })
        .catch(function (error) {
            //fail
            console.error(error);
        });
    }, [])

    const insert = e => {
        e.preventDefault();
        const result = axios
            .post(
                'http://localhost:8000/api/warehouse/'+{warehouseId}+'/addtowarehouse',
                {
                    product:product,
                    amount:amount,
                    shelfId:shelfId,
                    products_id:product,
                    date:date,
                },
            )
            .then(function (response) {
                //success
                console.log(response.data);
            })
            .catch(function (error) {
                //fail
                alert('Failed to add product in warehouse!');
                console.error(error);
            });
    };


	return (
        <>
            <div className={css.mainContainer}>
                <h1 className={css.h1}>Add product to warehouse</h1>
                <div className={css.selectContainer}>
                    <div className={css.listContainer}>
                        <form className={css.form} onSubmit={insert}>
                            <select className={css.select} onChange={e => setProduct(e.target.value)}>
                                <option selected hidden>Select a product</option>
                                { productoptions} 
                            </select>
                            <input className={css.input} 
                                type='number' 
                                onChange={e => setAmount(e.target.value)} 
                                value={amount} 
                                placeholder='Amount' 
                            />
                            <input className={css.input} 
                                type='text' 
                                placeholder='Shelf Id' 
                                onChange={e => setShelfId(e.target.value)}
                                value={shelfId}
                            />
                            <input className={css.input} 
                                type='date' 
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                            <button className={css.button}>Add product</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
	)
}

export default AddToWarehouse;
