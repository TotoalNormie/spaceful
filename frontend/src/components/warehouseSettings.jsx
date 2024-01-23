import {
	Briefcase,
	Eraser,
	Gear,
	IdentificationCard,
	MagnifyingGlass,
	PencilLine,
	Plus,
	SquareHalf,
	X,
} from '@phosphor-icons/react';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import css from '../style/WarehouseSettings.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { stringSimilarity } from 'string-similarity-js';

const General = ({ nameProp, descriptionProp }) => {
	const { warehouseId } = useParams();
	const [name, setName] = useState(nameProp);
	const [description, setDescription] = useState(descriptionProp);

	useEffect(() => setName(nameProp), [nameProp]);
	useEffect(() => setDescription(descriptionProp), [descriptionProp]);

	const update = e => {
		e.preventDefault();
		axios
			.post('http://localhost:8000/api/warehouse-app/update/' + warehouseId, {
				name: name,
				description: description,
			})
			.then(function (response) {
				//success
				// console.log(response.data);
				const id = response.data.id;
				if (!id) return;
				navigate(`/warehouse/${id}`);
			})
			.catch(function (error) {
				//fail
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
	const { warehouseId } = useParams();
	const [popUpSeen, setPopUpSeen] = useState(false);

	const [edit, setEdit] = useState(false);
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [role, setRole] = useState(0);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');

	const [workers, setWorkers] = useState([]);
	const [userId, setuserId] = useState('');
	const [typingTimeout, setTypingTimeout] = useState(null);

	const [search, setSearch] = useState('');

	const [rolesArray, setRolesArray] = useState([]);

	const link = edit
		? 'http://localhost:8000/api/warehouse/workers/update/' + userId
		: 'http://localhost:8000/api/warehouse/workers/add';

	const getworkers = () => {
		axios
			.get('http://localhost:8000/api/warehouse/workers/' + warehouseId)
			.then(function (response) {
				setWorkers(response.data);
			})
			.catch(function (error) {
				console.log(error.response.data.error);
				// alert(error.response.data.error);
			});
	};
	useEffect(() => {
		axios
			.get('http://localhost:8000/api/roles')
			.then(function (response) {
				setRolesArray(response.data);
			})
			.catch(function (error) {
				console.log(error.response.data.error);
				// alert(error.response.data.error);
			});
	}, []);

	useEffect(() => getworkers, []);

	useEffect(() => {
		if (!name || !surname) return;
		console.log('works');
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}
		const newTimeout = setTimeout(() => {
			axios
				.get('http://localhost:8000/api/workers/name', {
					params: {
						name: name,
						surname: surname,
					},
				})
				.then(function (response) {
					console.log(response.data);
					// setRolesArray(response.data);
					setUsername(response.data.generatedUsername);
				})
				.catch(function (error) {
					console.log(error.response);
					// alert(error.response.data.error);
				});
		}, 500);
		setTypingTimeout(newTimeout);
	}, [name, surname]);

	const showAddWorker = () => {
		setName('');
		setSurname('');
		setEmail('');
		setRole(0);
		setuserId('');
		setEdit(false);
		setPopUpSeen(true);
	};

	const showEditWorker = (editUsername, editEmail, editRole, editUserId) => {
		setUsername(editUsername);
		setEmail(editEmail);
		setRole(editRole);
		setuserId(editUserId);
		setEdit(true);
		setPopUpSeen(true);
	};

	function submit(e) {
		e.preventDefault();
		axios
			.post(link, {
				name: username,
				email: email,
				roles_id: role,
				appId: warehouseId,
			})
			.then(function (response) {
				console.log(response.data);
				setPopUpSeen(false);
				getworkers();
			})
			.catch(function (error) {
				console.log(error.response);
			});
	}

	const deleteWorker = id => {
		axios
			.delete('http://localhost:8000/api/user/' + id)
			.then(() => {
				getworkers();
			})
			.catch(response => {
				console.error(response.data);
			});
	};

	return (
		<div className={css.employees}>
			<div className={css.top}>
				<div className={css.search}>
					<input
						type='text'
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder='Search'
					/>
					<MagnifyingGlass size={32} color='#ffffff' />
				</div>
				<button onClick={showAddWorker}>
					Add worker <Plus size={32} color='#ffffff' />
				</button>
			</div>
			<div className={css.workers}>
				<h3>Workers:</h3>
				{workers
					.filter(worker => {
						if (!search) return true;

						console.log(
							worker.name.substr(0, search.length).toLowerCase(),
							search.toLowerCase(),
							stringSimilarity(
								worker.name.substr(0, search.length).toLowerCase(),
								search.toLowerCase()
							)
						);
						if (worker.user_id.toString() == search) return true;
						if (
							stringSimilarity(
								worker.name.substr(0, search.length).toLowerCase(),
								search.toLowerCase()
							) >= 0.5
						)
							return true;
						if (
							stringSimilarity(
								worker.email.substr(0, search.length).toLowerCase(),
								search.toLowerCase()
							) >= 0.5
						)
							return true;
						if (
							stringSimilarity(
								worker.RoleName.substr(0, search.length).toLowerCase(),
								search.toLowerCase()
							) >= 0.5
						)
							return true;
						// if(stringSimilarity(new String(worker.user_id), search) > 0.6) return true;
					})
					.map(worker => (
						<div key={worker.user_id}>
							<h3 className={css.number}>{worker.user_id}.</h3>
							<div className={css.bar}></div>
							<p>{worker.name}</p>
							<div className={css.bar}></div>
							<small>{worker.RoleName}</small>
							<div className={css.bar}></div>
							<div className={[css.bar, css.left].join(' ')}></div>
							<button
								onClick={() =>
									showEditWorker(
										worker.name,
										worker.email,
										worker.roles_id,
										worker.user_id
									)
								}>
								<PencilLine size={'1.5rem'} color='#ffffff' />
							</button>
							<button
								className={css.delete}
								onClick={() => deleteWorker(worker.user_id)}>
								<Eraser size={'1.5rem'} color='#ffffff' />
							</button>
						</div>
					))}
			</div>
			<form
				onSubmit={submit}
				className={css.workerOperation + ' ' + (popUpSeen ? '' : 'hidden')}>
				<button type='button' onClick={() => setPopUpSeen(false)}>
					<X size={24} color='#ffffff' />
				</button>
				{edit ? <h3>Edit worker</h3> : <h3>Add worker</h3>}
				{edit ? null : (
					<>
						<label>
							Name:
							<input
								type='text'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</label>
						<label>
							Surname:
							<input
								type='text'
								value={surname}
								onChange={e => setSurname(e.target.value)}
							/>
						</label>
					</>
				)}
				{edit ? (
					<label>
						Username:
						<input
							type='text'
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</label>
				) : (
					<label>
						Auto-generated username:
						<input type='text' disabled value={username} />
					</label>
				)}
				<label>
					Email:
					<input type='email' value={email} onChange={e => setEmail(e.target.value)} />
				</label>
				<label>
					Role:
					<select name='' id='' value={role} onChange={e => setRole(e.target.value)}>
						<option value='0' hidden>
							Choose role
						</option>
						{rolesArray.map(role => (
							<option key={role.id} value={role.id}>
								{role.roleName}
							</option>
						))}
					</select>
				</label>
				<input type='submit' value={edit ? 'Update' : 'Add'} />
			</form>
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

				// console.log(response);
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
						<SquareHalf size={32} color='#ffffff' /> categories
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
