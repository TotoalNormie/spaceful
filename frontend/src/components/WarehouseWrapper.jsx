import { Link, NavLink, Outlet } from 'react-router-dom';
import wrap from '../style/WarehouseWrapper.module.css';
import Cookies from 'js-cookie';
import Logout from '../global/Logout';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';

const WarehouseWrapper = ( {seen} ) => {
	// const isLoggedIn = Boolean(Cookies.get('token'));
	const [sidebarSeen, setSidebarSeen ] = useState(seen);

	useEffect(() => {
		setSidebarSeen(seen);
	}, [seen])

	return (
		<div className={wrap.wrapper}>
			<div>
				<Outlet />
			</div>
			<Sidebar seen={sidebarSeen} inFlow>
				<NavLink to='main'>main page</NavLink>
				<NavLink to='addnewproduct'>Add new product</NavLink>
				<NavLink to='addtowarehouse'>Add to warehouse</NavLink>
				<NavLink to='reports'>Reports</NavLink>
			</Sidebar>
		</div>
	);
};

export default WarehouseWrapper;
