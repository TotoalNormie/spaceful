import { useState } from 'react';
import css from "../style/AddNewProduct.module.css";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddNewProduct = () => {
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [other, setOther] = useState('');
    const { warehouseId } = useParams();
    const [appId, setAppId] = useState(warehouseId);
    setAppId(warehouseId);
    const navigate = useNavigate();

    const insert = e => {
        e.preventDefault();
        const result = axios
            .post(
                'http://localhost:8000/api/new-product/insert',
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
                                placeholder='Product description' 
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            />
                            <input className={css.input} 
                                type='text' 
                                placeholder='Product quantity' 
                                onChange={e => setQuantity(e.target.value)}
                                value={quantity}
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
                                placeholder='Other information about product' 
                                onChange={e => setOther(e.target.value)}
                                value={other}
                            />
                            <input type="hidden" name="appId" value={warehouseId}/>
                        </div>
                        <button className={css.button}>Add new product</button>
                    </form>
                </div>
            </div>
        </>
	)
}

export default AddNewProduct;
