import React from 'react';
import css from "../style/AddNewProduct.module.css";
import Header from "./Header";

var curr = new Date();
var date = curr.toISOString().substring(0,10);

const AddToWarehouse = () => {
	return (
        <>
            <div className={css.mainContainer}>
                <h1>Add product to warehouse</h1>
                <div className={css.inputContainer}>
                    <div className={css.listContainer}>
                        <input className={css.input} type='text' placeholder='Select a product' />
                        <input className={css.input} type='text' placeholder='Warehouse' />
                        <input className={css.input} type='number' placeholder='Quantity' />
                        <input className={css.input} type='text' placeholder='Supplier' />
                        <input className={css.input} type='date' value={date}/>
                        <button className={css.button}>Add product</button>
                    </div>
                </div>
            </div>
        </>
	)
}

export default AddToWarehouse;
