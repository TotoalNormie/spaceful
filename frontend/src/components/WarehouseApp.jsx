import { Warehouse } from '@phosphor-icons/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const WarehouseApp = () => {
	const { warehouseId } = useParams();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

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
				navigate('/');
			}
		};

		fetchData();
	}, [warehouseId, navigate]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div>
			<p>Warehouse ID: {warehouseId}</p>
			<h1>
				<Warehouse /> {name}
			</h1>
			<p>{description}</p>
		</div>
	);
};

export default WarehouseApp;
