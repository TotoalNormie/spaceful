import React from 'react';
import css from "../style/AddNewProduct.module.css";

var curr = new Date();
var date = curr.toISOString().substring(0,10);

const AddToWarehouse = () => {
	return (
        <>
            <div className={css.mainContainer}>
                <h1 className={css.h1}>Add product to warehouse</h1>
                <div className={css.selectContainer}>
                    <div className={css.listContainer}>
                        <select className={css.select}>
                            <option selected disabled>Select a product</option>
                            <option>Product 1</option>
                            <option>Product 2</option>
                            <option>Product 3</option>
                        </select>
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
