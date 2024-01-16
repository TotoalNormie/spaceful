import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import css from '../style/Header.module.css';
import { List } from '@phosphor-icons/react/dist/ssr';
import { useNavigate } from "react-router-dom";

const Header = () => {
	const location = useLocation();
	const noHeader = ['/login', '/register', '/createwarehouse']
	console.log(location.pathname);
	if (noHeader.includes(location.pathname)) return null;
	return (
		<header>
			<Link to='/' className={css.spaceful}>
				<h2 className={css.logo}>
					<img src={logo} alt='spaceful logo' />
				</h2>
				<h2>spaceful</h2>
			</Link>
			<button className={css.hamburger}>
				<List size='2.5rem' color='#ffffff' />
			</button>
		</header>
	);
};

export default Header;
