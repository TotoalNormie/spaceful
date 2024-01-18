import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import './style/main.css';
import Home from './components/Home';
import Header from './components/Header';
import Jabis from './components/Jabis';
import Login from './components/Login';
import Status from './components/Status';
import Register from './components/Register';
import AddNewProduct from './components/AddNewProduct';
import Test from './components/Test';
import AddToWarehouse from './components/AddToWarehouse';
import Reports from './components/Reports';
import EditProfile from './components/EditProfile';
import CreateWarehouse from './components/CreateWarehouse';
import Error404 from './components/Error404';
import axios from 'axios';
import Cookies from 'js-cookie';

// Nested component for '/nested' route
const NestedComponent = () => {
	const { warehouseId } = useParams();
	// const [name, setName] = useState('');
	// const [description, setDescription] = useState('');
	// const config = {
	// 	headers: { Authorization: `Bearer ${Cookies.get('token')}` },
	// };
	// axios
	// 	.get(
	// 		`http://localhost:8000/api/warehouse-app/${warehouseId}`,
	// 		{
	// 			withCredentials: true,
	// 		},
	// 		config
	// 	)
	// 	.then(function (response) {
	// 		console.log(response.data);
	// 		set
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 		// alert(error);
	// 	});
	return (
		<div>
			<p>warehouse ID: {warehouseId}</p>
		</div>
	);
};import ProductSearch from "./components/ProductSearch";

function App() {
	const isLoggedIn = Boolean(Cookies.get('token'));
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/addnewproduct' element={<AddNewProduct />} />
					<Route path='/resns' element={<Jabis />} />
					<Route path='/addtowarehouse' element={<AddToWarehouse />} />
					<Route path='/reports' element={<Reports />} />
					<Route path='/createwarehouse' element={<CreateWarehouse />} />
					<Route exact path='/editprofile' element={<EditProfile />} />
					<Route path='/warehouse/:warehouseId/'element={!isLoggedIn && <Navigate replace to='/'/> }>
						<Route path='' element={<NestedComponent />} />
						<Route path='status' element={<Status />} />
						<Route path='addnewproduct' element={<AddNewProduct />} />
						<Route path='addtowarehouse' element={<AddToWarehouse />} />
						<Route path='reports' element={<Reports />} />
					</Route>
					<Route path='*' element={<Error404 />} />
		  <Route exact path='/ProductSearch' element={<ProductSearch/>} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
