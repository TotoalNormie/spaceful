import React from 'react';
import css from "../style/AddNewProduct.module.css";

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
