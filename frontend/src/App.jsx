import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
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
import WarehouseApp from './components/WarehouseApp';
import Sidebar from './components/Sidebar';
import WarehouseWrapper from './components/WarehouseWrapper';
import { useState } from 'react';

const WarehouseCheck = () => {
	const location = useLocation();
	const route = location.pathname.split('/')[0];
	console.log(route);
	const isWarehouse  = route === 'warehouse';

};

function App() {
	const isLoggedIn = Boolean(Cookies.get('token'));
	const [sidebarSeen, setSidebarSeen] = useState(false);

	const toggleSidebar = () => {
		setSidebarSeen(!sidebarSeen);
	};
	const isWarehouse = () => {
		const location = useLocation();
		const route = location.pathname.split('/')[0];
		console.log(route);
		return route === 'warehouse';
	};
	return (
		<BrowserRouter>
			<Header hamburger={toggleSidebar} />
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/addnewproduct' element={<AddNewProduct />} />
					<Route path='/resns' element={<Jabis />} />
					<Route path='/addtowarehouse' element={<AddToWarehouse />} />
					<Route path='/reports' element={<Reports />} />
					{isLoggedIn
						? [
								<Route
									path='/warehouse/:warehouseId/*'
									element={<WarehouseWrapper />}>
									<Route index element={<WarehouseApp />} />
									<Route path='addnewproduct' element={<AddNewProduct />} />
									<Route path='addtowarehouse' element={<AddToWarehouse />} />
									<Route path='reports' element={<Reports />} />
								</Route>,
								<Route path='/createwarehouse' element={<CreateWarehouse />} />,
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
				<Sidebar seen={sidebarSeen}>
					<NavLink to='/'>root</NavLink>
				</Sidebar>
			</main>
			{/* {isLoggedIn ? <Sidebar /> : null} */}
		</BrowserRouter>
	);
}

export default App;
