import css from '../style/CreateWarehouse.module.css';
import logo from '../assets/logo.png';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateWarehouse = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const navigate = useNavigate();

	const config = {
		headers: { Authorization: `Bearer ${Cookies.get('token')}` },
	};
	const create = e => {
		alert('CreateWarehouse');
		e.preventDefault();
		const result = axios
			.post(
				'http://localhost:8000/api/warehouse-app/create',
				{
					withCredentials: true,
					name: name,
					description: description,	
				},
				config
			)
			.then(function (response) {
				//success
				console.log(response.data);
				// navigate(/)
			})
			.catch(function (error) {
				//fail
				alert('Failed to createWarehouse');
				console.error(error);
			});
	};

	return (
		<div className={css.wrapper}>
			<div className={css.warehouse}>
				<h1>Create warehouse</h1>
				<form className={css.form} onSubmit={create}>
					<input
						type='text'
						onChange={e => setName(e.target.value)}
						value={name}
						placeholder='Warehouse name'
					/>
					<input
						type='text'
						onChange={e => setDescription(e.target.value)}
						value={description}
						placeholder='Warehouse description'
					/>
					<button>Create warehouse</button>
				</form>
			</div>
			<img className={css.logo} src={logo} alt='' />
		</div>
	);
};

export default CreateWarehouse;
