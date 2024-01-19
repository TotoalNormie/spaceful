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
import Cookies from 'js-cookie';
import WarehouseApp from './components/WarehouseApp';
import Sidebar from './components/Sidebar';
import WarehouseWrapper from './components/WarehouseWrapper';

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
					{isLoggedIn ? (
						<Route path='/warehouse/:warehouseId/*' element={<WarehouseWrapper/>}>
							<Route index element={<WarehouseApp />} />
							<Route path='addnewproduct' element={<AddNewProduct />} />
							<Route path='addtowarehouse' element={<AddToWarehouse />} />
							<Route path='reports' element={<Reports />} />
						</Route>
					) : null}
					<Route path='*' element={<Error404 />} />
				</Routes>
			</main>
			{/* {isLoggedIn ? <Sidebar /> : null} */}
		</BrowserRouter>
	);
}

export default App;
