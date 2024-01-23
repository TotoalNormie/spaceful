import Cookies from 'js-cookie';
import { Link, NavLink, useLocation } from 'react-router-dom';
import css from '../style/Sidebar.module.css';
import { useEffect, useRef, useState } from 'react';
import Logout from '../global/Logout';

const Sidebar = ({ children, seen }) => {
	const isLoggedIn = Boolean(Cookies.get('token'));
	const navElement = useRef(null);
	const location = useLocation();
	const [height, setHeight] = useState();
	const [stick, setStick] = useState();
	const [isSeen, setIsSeen] = useState(seen);
	const [width, setWidth] = useState('-100%');

	useEffect(() => {
		setIsSeen(seen);
	}, [seen]);

	// console.log('isSeen: ', isSeen);

	useEffect(() => {
		const element = navElement.current;
		if (element) {
			const rect = element.getBoundingClientRect();

			const newHeight = Math.floor(window.innerHeight - rect.top);
			setHeight(newHeight);
			setStick(Math.floor(rect.top));
			console.log('setStick: ',Math.ceil(rect.top));
			// console.log(rect);
		}
	}, [navElement, isSeen]);

	// useEffect(() =>
	const noHeader = ['/login', '/register', '/createwarehouse', '/forgor'];
	// console.log(location.pathname);
	if (noHeader.includes(location.pathname)) return null;

	return (
		<nav ref={navElement} className={isSeen ? css.seen : null}>
			<div className={css.sticky} style={{ height: height, top: stick }}>
				{navElement && (
					<>
						<div className={css.buttons}>
							{isLoggedIn ? (
								<>
									{/* <NavLink>See warehouses</NavLink> */}
									<NavLink to='/createwarehouse'>Create warehouse</NavLink>
									<NavLink to='/editprofile'>Edit profile</NavLink>
								</>
							) : null}
							{children}
						</div>
						<div className={css.auth}>
							{isLoggedIn ? <Logout /> : <Link to='login'>Login</Link>}
						</div>
					</>
				)}
			</div>
		</nav>
	);
};

export default Sidebar;
