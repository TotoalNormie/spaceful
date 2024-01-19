import { Link, NavLink, Outlet } from 'react-router-dom';
import css from '../style/Sidebar.module.css';
import wrap from '../style/WarehouseWrapper.module.css';
import Cookies from 'js-cookie';
import Logout from '../global/Logout';
import Sidebar from './Sidebar';

const WarehouseWrapper = ({ seen }) => {
	// const isLoggedIn = Boolean(Cookies.get('token'));
	console.log(wrap);

	return (
		<div className={wrap.wrapper}>
			<div>
				<Outlet />
			</div>
			<Sidebar seen={seen}>
				<NavLink to=''>Main</NavLink>
				<NavLink to='addnewproduct'>Add new product</NavLink>
				<NavLink to='addtowarehouse'>Add to warehouse</NavLink>
				<NavLink to='reports'>Reports</NavLink>
			</Sidebar>
		</div>
	);
};

export default WarehouseWrapper;
