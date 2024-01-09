import logo from '../assets/logo.png';
import css from '../style/Header.module.css';

const Header = () => {
	return (
		<header>
			<div className={css.spaceful}>
				<div className={css.logo}>
					<img src={logo} alt='spaceful logo' />
				</div>
				<h2>spaceful</h2>
			</div>
			<button className={css.hamburger}>
				<List size={32} color='#ffffff' />
			</button>
		</header>
	);
};

export default Header;
