import { useEffect, useState } from 'react';
import css from "../style/AddNewProduct.module.css";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddNewProduct = () => {
    const { warehouseId } = useParams();
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [category, setCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [image, setImage] = useState('');
    const [categoryArray, setCategoryArray] = useState([]);
    const { warehouseId } = useParams();
    const [appId, setAppId] = useState(warehouseId);
    setAppId(warehouseId);

    const [supplierDescription, setSupplierDescription] = useState('');
    const navigate = useNavigate();

    console.log(category);

    const categoryoptions = categoryArray.map((category) => <option value={category.id}>{category.categoryName}</option>) 

    const config = {
		headers: { Authorization: `Bearer ${Cookies.get('token')}` },
	};

    useEffect(()=> {
        axios
        .get(
            'http://localhost:8000/api/categories/'+warehouseId,
        )
        .then(function (response) {
            //success
            console.log(response.data);
            setCategoryArray(response.data);
        })
        .catch(function (error) {
            //fail
            alert('Failed to add new product!');
            console.error(error);
        });
    }, [])

    const insert = e => {
        e.preventDefault();
        axios
            .post(
                'http://localhost:8000/api/products/create',
                {
                    name:product,
                    price:price,
                    weight:weight,
                    supplier:supplier,
                    supplier_description:supplierDescription,
                    category:category,
                    image:image,
                    appId:warehouseId,

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
                                type='number' 
                                placeholder='Product price' 
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                                min="0" 
                                step=".01"
                            />
                        </div>
                        <div className={css.splitContainer}>
                            <input className={css.input} 
                                type='number' 
                                placeholder='Product weight' 
                                onChange={e => setWeight(e.target.value)}
                                value={weight}
                                min="0" 
                                step=".01"
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
                            <input type="hidden" name="appId" value={warehouseId}/>
                        </div>
                        <div className={css.splitContainer}>
                            <select className={css.select} onChange={e => setCategory(e.target.value)}>
                                <option selected disabled>Select a category</option>
                                { categoryoptions} 
                            </select>
                        </div>
                        <button className={css.button}>Add new product</button>
                    </form>
                </div>
            </div>
        </>
	)
}

export default AddNewProduct;
