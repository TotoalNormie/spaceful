import { Link, NavLink, Outlet } from 'react-router-dom';
import wrap from '../style/WarehouseWrapper.module.css';
import Cookies from 'js-cookie';
import Logout from '../global/Logout';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';

const WarehouseWrapper = ({ seen, userInfo }) => {
	// const isLoggedIn = Boolean(Cookies.get('token'));
	const [sidebarSeen, setSidebarSeen] = useState(seen);
	const [info, setInfo] = useState(userInfo);

	useEffect(() => {
		setSidebarSeen(seen);
	}, [seen]);

	useEffect(() => {
		setInfo(userInfo);
	}, [userInfo]);

	const links = [
		{ url: 'addnewproduct', text: 'Add new product' },
		{ url: 'addtowarehouse', text: 'Add to warehouse' },
		{ url: 'reports', text: 'Reports' },
		{ url: 'itemsearch', text: 'Item search' },
		{ url: 'productsearch', text: 'Product search' },
		{ url: 'settings', text: 'Settings' },
		{ url: 'orders', text: 'Orders' },
	];

	return (
		<div className={wrap.wrapper}>
			<div>
				<Outlet />
			</div>
			<Sidebar seen={sidebarSeen} userInfo={info}>
				<NavLink to='main'>Main page</NavLink>
				{links
					.filter(
						link =>
							info && typeof info === 'object' && link.url in info && info[link.url]
					)
					.map(link => (
						<NavLink to={link.url}>{link.text}</NavLink>
					))}
			</Sidebar>
		</div>
	);
};

export default WarehouseWrapper;
