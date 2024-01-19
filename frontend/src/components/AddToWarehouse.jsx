import { useState } from 'react';
import css from "../style/AddNewProduct.module.css";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

//laika funkcija lai noteiktu datumu un ievietotu <input>
var curr = new Date();
var date = curr.toISOString().substring(0,10);

const AddToWarehouse = () => {
    const { warehouseId } = useParams();

    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [supplier, setSupplier] = useState('');
    //const [date, setDate] = useState('');
    const navigate = useNavigate();

    const insert = e => {
        e.preventDefault();
        const result = axios
            .post(
                'http://localhost:8000/api/add-product/insert',
                {
                    withCredentials: true,   
                },
                config
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
                            <select className={css.select}>
                                <option selected disabled>Select a product</option>
                                <option>Product 1</option>
                                <option>Product 2</option>
                                <option>Product 3</option>
                            </select>
                            <input className={css.input} 
                                type='number' 
                                onChange={e => setQuantity(e.target.value)} 
                                value={quantity} 
                                placeholder='Quantity' 
                            />
                            <input className={css.input} 
                                type='text' 
                                placeholder='Supplier' 
                                onChange={e => setSupplier(e.target.value)}
                                value={supplier}
                            />
                            <input className={css.input} 
                                type='date' 
                                value={date}
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
