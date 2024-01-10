import logo from '../assets/logo.png';
import css from '../style/Header.module.css';
import { List } from '@phosphor-icons/react/dist/ssr';
import { useNavigate } from "react-router-dom";

const Header = () => {

	const navigate = useNavigate();
	function home(){
		navigate("/");
	}

	return (
		<header>
			<div className={css.spaceful} onClick={home}>
				<h2 className={css.logo}>
					<img src={logo} alt='spaceful logo' />
				</h2>
				<h2>spaceful</h2>
			</div>
			<button className={css.hamburger}>
				<List size='2.5rem' color='#ffffff' />
			</button>
		</header>
	);
};

export default Header;
