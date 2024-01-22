import { useState } from 'react';
import css from "../style/AddNewProduct.module.css";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddNewProduct = () => {
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [categoty, setCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [image, setImage] = useState('');
    const [supplierDescription, setSupplierDescription] = useState('');
    const navigate = useNavigate();

    const config = {
		headers: { Authorization: `Bearer ${Cookies.get('token')}` },
	};

    const insert = e => {
        e.preventDefault();
        const result = axios
            .post(
                'http://localhost:8000/api/products/create',
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
                alert('Failed to add new product!');
                console.error(error);
            });
    };

	return (
        <>
            <div className={css.mainContainer}>
                <h1>Add new product</h1>
                <div className={css.inputContainer}>
                    <form className={css.form} onSubmit={insert}>
                        <div className={css.splitContainer}>
                            <input className={css.input} 
                                type='text' 
                                placeholder='Product' 
                                onChange={e => setProduct(e.target.value)}
                                value={product}
                            />
                            <input className={css.input} 
                                type='text' 
                                placeholder='Product price' 
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>
                        <div className={css.splitContainer}>
                            <input className={css.input} 
                                type='text' 
                                placeholder='Product category' 
                                onChange={e => setCategory(e.target.value)}
                                value={category}
                            />
                            <input className={css.input} 
                                type='text' 
                                placeholder='Supplier' 
                                onChange={e => setSupplier(e.target.value)}
                                value={supplier}
                            />
                        </div>
                        <div className={css.splitContainer}>
                            <input className={css.input} 
                                type='text' 
                                placeholder='Product image' 
                                onChange={e => setImage(e.target.value)}
                                value={image}
                            />
                            <textarea className={css.textarea} 
                                type='text'  
                                placeholder='Supplier description' 
                                onChange={e => setSupplierDescription(e.target.value)}
                                value={supplierDescription}
                            />
                        </div>
                        <button className={css.button}>Add new product</button>
                    </form>
                </div>
            </div>
        </>
	)
}

export default AddNewProduct;
