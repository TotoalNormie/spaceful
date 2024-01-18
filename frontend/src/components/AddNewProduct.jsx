import React from 'react';
import css from "../style/AddNewProduct.module.css";
import axios from 'axios';

const NewProduct = () => {
    const [product, setProduct] = useState('');
    const [price, setprice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [other, setOther] = useState('');
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
}

const AddNewProduct = () => {
	return (
        <>
            <div className={css.mainContainer}>
                <h1>Add new product</h1>
                <div className={css.inputContainer}>
                    <div className={css.splitContainer}>
                        <input className={css.input} type='text' placeholder='Product' />
                        <input className={css.input} type='text' placeholder='Product price' />
                    </div>
                    <div className={css.splitContainer}>
                        <input className={css.input} type='text' placeholder='Product description' />
                        <input className={css.input} type='text' placeholder='Product quantity' />
                    </div>
                    <div className={css.splitContainer}>
                        <input className={css.input} type='text' placeholder='Product image' />
                        <textarea className={css.textarea} type='text'  placeholder='Other information about product' />
                    </div>
                    <button className={css.button}>Add new product</button>
                </div>
            </div>
        </>
	)
}

export default AddNewProduct;
