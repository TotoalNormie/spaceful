import React from 'react';
import css from "../style/AddNewProduct.module.css";
import Header from "./Header";


const AddNewProduct = () => {
	return (
        <>
            <div className={css.mainContainer}>
                <h1>Add new product</h1>
                <div className={css.inputContainer}>
                    <div className={css.splitContainer}>
                        <input type='text' placeholder='Product' />
                        <input type='text' placeholder='Product price' />
                    </div>
                    <div className={css.splitContainer}>
                        <input type='text' placeholder='Product description' />
                        <input type='text' placeholder='Product quantity' />
                    </div>
                    <div className={css.splitContainer}>
                        <input type='text' placeholder='Product image' />
                        <textarea type='text'  placeholder='Other information about product' />
                    </div>
                    <button>Add new product</button>
                </div>
            </div>
        </>
	)
}

export default AddNewProduct;
