import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './style/main.css';
import Home from './components/Home';
import Header from './components/Header';
import Jabis from './components/Jabis';
import Login from './components/Login';
import Register from './components/Register';
import AddNewProduct from './components/AddNewProduct';
import Logout from './components/Logout';
import AddToWarehouse from './components/AddToWarehouse';
import CreateWarehouse from './components/CreateWarehouse';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/addnewproduct' element={<AddNewProduct />} />
					<Route exact path='/logout' element={<Logout />} />
					<Route exact path='/resns' element={<Jabis />} /> {/* !!! OBLIGATI ATSTAT !!!*/}
					<Route exact path='/addtowarehouse' element={<AddToWarehouse />} />
					<Route exact path='/createwarehouse' element={<CreateWarehouse />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
