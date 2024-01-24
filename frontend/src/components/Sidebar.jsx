import Cookies from 'js-cookie';
import { Link, NavLink, useLocation } from 'react-router-dom';
import css from '../style/Sidebar.module.css';
import { useEffect, useRef, useState } from 'react';
import Logout from '../global/Logout';

const Sidebar = ({ children, seen, userInfo }) => {
	const isLoggedIn = Boolean(Cookies.get('token'));
	const navElement = useRef(null);
	const location = useLocation();
	const [height, setHeight] = useState();
	const [stick, setStick] = useState();
	const [isSeen, setIsSeen] = useState(seen);
	const [info, setinfo] = useState(userInfo);

	useEffect(() => {
		setIsSeen(seen);
	}, [seen]);

	useEffect(() => {
		setinfo(userInfo);
	}, [userInfo]);

	// console.log('isSeen: ', isSeen);

	useEffect(() => {
		const element = navElement.current;
		if (element) {
			const rect = element.getBoundingClientRect();

			const newHeight = Math.floor(window.innerHeight - rect.top);
			setHeight(newHeight);
			setStick(Math.floor(rect.top));
			// console.log('setStick: ',Math.ceil(rect.top));
			// console.log(rect);
		}
	}, [navElement, isSeen, userInfo]);

	// useEffect(() =>
	const noSidebar = ['/login', '/register', '/createwarehouse', '/forgor'];
	// console.log(location.pathname);
	if (noSidebar.includes(location.pathname)) return null;
	// console.log(info);

	return (
		<nav ref={navElement} className={isSeen ? css.seen : null}>
			<div className={css.sticky} style={{ height: height, top: stick }}>
				{navElement && (
					<>
						<div className={css.buttons}>
							{isLoggedIn ? (
								<>
									{info?.isWorker ? null : (
										<NavLink to='/createwarehouse'>Create warehouse</NavLink>
									)}
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
