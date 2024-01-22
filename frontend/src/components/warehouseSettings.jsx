import {
	Briefcase,
	Eraser,
	Gear,
	IdentificationCard,
	MagnifyingGlass,
	PencilLine,
	Plus,
} from '@phosphor-icons/react';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import css from '../style/WarehouseSettings.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const General = ({ nameProp, descriptionProp }) => {
	const { warehouseId } = useParams();
	const [name, setName] = useState(nameProp);
	const [description, setDescription] = useState(descriptionProp);


	
	useEffect(() => setName(nameProp), [nameProp]);
	useEffect(() => setDescription(descriptionProp), [descriptionProp]);

	const update = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:8000/api/warehouse-app/update/'+warehouseId,
				{
					name: name,
					description: description,
				},
			)
			.then(function (response) {
				//success
				console.log(response.data);
				const id = response.data.id;
				if (!id) return;
				navigate(`/warehouse/${id}`);
			})
			.catch(function (error) {
				//fail
				alert('Failed to createWarehouse');
				console.error(error);
			});
	};

	return (
		<div className={css.general}>
			<form onSubmit={update}>
				<h3>General settings</h3>
				<label>
					Warehouse name:
					<input type='text' value={name} onChange={e => setName(e.target.value)} />
				</label>
				<label>
					Warehouse description:
					<input
						type='text'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</label>
				<input type='submit' value='Save Chnages' />
			</form>
		</div>
	);
};


const Employees = () => {
	return (
		<div className={css.employees}>
			<div className={css.top}>
				<div className={css.search}>
					<input type='text' placeholder='Search' />
					<MagnifyingGlass size={32} color='#ffffff' />
				</div>
				<button>
					Add worker <Plus size={32} color='#ffffff' />
				</button>
			</div>
			<div className={css.workers}>
				<div>
					<h3 className={css.number}>1.</h3>
					<div className={css.bar}></div>
					<p>John Doe</p>
					<div className={css.bar}></div>
					<small>role</small>
					<div className={css.bar}></div>
					<div className={[css.bar, css.left].join(' ')}></div>
					<button>
						<PencilLine size={'1.5rem'} color='#ffffff' />
					</button>
					<button>
						<Eraser size={'1.5rem'} color='#ffffff' />
					</button>
				</div>
				<div>
					<h3 className={css.number}>1.</h3>
					<div className={css.bar}></div>
					<p>John Doe</p>
					<div className={css.bar}></div>
					<small>role</small>
					<div className={css.bar}></div>
					<div className={[css.bar, css.left].join(' ')}></div>
					<button>
						<PencilLine size={'1.5rem'} color='#ffffff' />
					</button>
					<button>
						<Eraser size={'1.5rem'} color='#ffffff' />
					</button>
				</div>
				<div>
					<h3 className={css.number}>1.</h3>
					<div className={css.bar}></div>
					<p>John Doe</p>
					<div className={css.bar}></div>
					<small>role</small>
					<div className={css.bar}></div>
					<div className={[css.bar, css.left].join(' ')}></div>
					<button>
						<PencilLine size={'1.5rem'} color='#ffffff' />
					</button>
					<button>
						<Eraser size={'1.5rem'} color='#ffffff' />
					</button>
				</div>
				<div>
					<h3 className={css.number}>1.</h3>
					<div className={css.bar}></div>
					<p>John Doe</p>
					<div className={css.bar}></div>
					<small>role</small>
					<div className={css.bar}></div>
					<div className={[css.bar, css.left].join(' ')}></div>
					<button>
						<PencilLine size={'1.5rem'} color='#ffffff' />
					</button>
					<button>
						<Eraser size={'1.5rem'} color='#ffffff' />
					</button>
				</div>
				<div>
					<h3 className={css.number}>1.</h3>
					<div className={css.bar}></div>
					<p>John Doe</p>
					<div className={css.bar}></div>
					<small>role</small>
					<div className={css.bar}></div>
					<div className={[css.bar, css.left].join(' ')}></div>
					<button>
						<PencilLine size={'1.5rem'} color='#ffffff' />
					</button>
					<button>
						<Eraser size={'1.5rem'} color='#ffffff' />
					</button>
				</div>
			</div>
		</div>
	);
};

const CustomNavLink = ({ to, children }) => {
	return (
		<NavLink to={to} className={({ isActive }) => (isActive ? css.active : '')}>
			{children}
		</NavLink>
	);
};

const WarehouseSettings = () => {
	const { warehouseId } = useParams();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/warehouse-app/${warehouseId}`,
					{ headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
				);

				console.log(response);
				setName(response.data.data.name);
				setDescription(response.data.data.description);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setError(error.message);
				setLoading(false);
			}
		};

		fetchData();
	}, [warehouseId]);

	if (loading) {
		return null;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className={css.mainWrapper}>
			<h2>Warehouse app setting for {name}</h2>
			<div className={css.wrapper}>
				<div>
					<CustomNavLink to='general'>
						<Gear size={32} color='#ffffff' /> general settings
					</CustomNavLink>
					<CustomNavLink to='employees'>
						<Briefcase size={32} color='#ffffff' /> employees
					</CustomNavLink>
					<CustomNavLink to='roles'>
						<IdentificationCard size={32} color='#ffffff' /> roles
					</CustomNavLink>
					<CustomNavLink to='categories'>
						<IdentificationCard size={32} color='#ffffff' />
						categories
					</CustomNavLink>
				</div>
				<div>
					<Routes>
						<Route
							path='general'
							element={<General nameProp={name} descriptionProp={description} />}
						/>
						<Route path='employees' element={<Employees />} />
						<Route path='*' element={<div></div>} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default WarehouseSettings;
