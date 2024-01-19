import Cookies from 'js-cookie';
import { Link, useParams } from 'react-router-dom';
import css from '../style/Sidebar.module.css';

const Sidebar = () => {
	const isLoggedIn = Boolean(Cookies.get('token'));
	const { WarehouseId } = useParams();

	const link = `warehouse/${WarehouseId}/`

	return (
		<nav>
			<div className={css.buttons}>
				<Link to='addnewproduct'>Add new product</Link>
				<Link to='addtowarehouse'>Add to warehouse</Link>
				<Link to='reports'>Reports</Link>
			</div>
			<div className={css.auth}>
				{isLoggedIn ? <button>Logout</button> : <Link to='login'>Logout</Link>}
			</div>
		</nav>
	);
};

export default Sidebar;
