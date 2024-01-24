import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './style/main.css';
import Home from './components/Home';
import Header from './components/Header';
import Jabis from './components/Jabis';
import Login from './components/Login';
import Register from './components/Register';
import AddNewProduct from './components/AddNewProduct';
import AddToWarehouse from './components/AddToWarehouse';
import Reports from './components/Reports';
import EditProfile from './components/EditProfile';
import CreateWarehouse from './components/CreateWarehouse';
import Error404 from './components/Error404';
import Cookies from 'js-cookie';
import ProductSearch from './components/ProductSearch';
import WarehouseApp from './components/WarehouseApp';
import Sidebar from './components/Sidebar';
import WarehouseWrapper from './components/WarehouseWrapper';
import WarehouseReport from './components/WarehouseReport';
import ProductsReport from './components/ProductsReport';
import WarehouseSettings from './components/warehouseSettings';
import ItemSearch from './components/ItemSearch';
import ForgorPass from './components/ForgorPass';
import axios from 'axios';

const WarehouseCheck = ({ children }) => {
	const location = useLocation();
	const route = location.pathname.split('/')[1];
	// console.log(location, route);
	const isWarehouse = route === 'warehouse';
	// console.log(isWarehouse);
	return !isWarehouse && children;
};

function App() {
	const isLoggedIn = Boolean(Cookies.get('token'));
	const [sidebarSeen, setSidebarSeen] = useState(false);
	const [userData, setUserData] = useState(null);

	console.log(isLoggedIn, Cookies.get('token'));

	const toggleSidebar = () => {
		setSidebarSeen(!sidebarSeen);
	};

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/user/info', {
				headers: { Authorization: `Bearer ${Cookies.get('token')}` },
			})
			.then(response => {
				setUserData(response.data);
			})
			.catch(response => {
				if(response.response.data.error === 'not logged in') 
				setUserData(false);
			});
	}, []);

	if(userData === null) return null;

	return (
		<BrowserRouter>
			<Header hamburger={toggleSidebar} />
			<main>
				<Routes>
					<Route path='/forgor' element={<ForgorPass />} />
					<Route path='/' element={userData?.isWorker ? <Navigate replace to={'/warehouse/'+userData?.warehouse_app_id} /> :<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					{/* <Route path='/addnewproduct' element={<AddNewProduct />} /> */}
					<Route path='/resns' element={<Jabis />} />
					{/* <Route path='/addtowarehouse' element={<AddToWarehouse />} />
					<Route path='/reports' element={<Reports />} />
					<Route exact path='/ProductSearch' element={<ProductSearch />} /> */}
					{isLoggedIn
						? [
								<Route
									path='/warehouse/:warehouseId/*'
									element={<WarehouseWrapper seen={sidebarSeen} userInfo={userData} />}>
									<Route index element={<WarehouseApp />} />
									<Route path='main' element={<WarehouseApp />} />
									<Route path='addnewproduct' element={<AddNewProduct />} />
									<Route path='addtowarehouse' element={<AddToWarehouse />} />
									<Route path='reports/*'>
										<Route index element={<Reports />} />
										<Route path='warehouse' element={<WarehouseReport />} />
										<Route path='products' element={<ProductsReport />} />
									</Route>
									<Route path='productsearch' element={<ProductSearch />} />
									<Route path='itemsearch' element={<ItemSearch />} />
									<Route path='settings/*' element={<WarehouseSettings />} />
								</Route>,
								<Route
									path='/createwarehouse'
									element={
										userData?.isWorker ? (
											<Navigate replace to='/login' />
										) : (
											<CreateWarehouse />
										)
									}
								/>,
								<Route exact path='/editprofile' element={<EditProfile />} />,
						  ]
						: [
								<Route
									path='/warehouse/*'
									element={<Navigate replace to='/login' />}
								/>,
								<Route
									path='/createwarehouse'
									element={<Navigate replace to='/login' />}
								/>,
								<Route
									path='/editprofile'
									element={<Navigate replace to='/login' />}
								/>,
						  ]}
					<Route path='*' element={<Error404 />} />
				</Routes>
				<WarehouseCheck>
					<Sidebar seen={sidebarSeen} userInfo={userData}></Sidebar>
				</WarehouseCheck>
			</main>
		</BrowserRouter>
	);
}

export default App;
