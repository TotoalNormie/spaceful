import { Link, Outlet } from "react-router-dom"
import css from '../style/Sidebar.module.css';
import wrap from '../style/WarehouseWrapper.module.css';
import Cookies from "js-cookie";

const WarehouseWrapper = () => {
	const isLoggedIn = Boolean(Cookies.get('token'));
    console.log(wrap);

  return (
    <div className={wrap.wrapper}>
        <div>
        <Outlet/>
        </div>
        <nav>
			<div className={css.buttons}>
				<Link to='addnewproduct'>Add new product</Link>
				<Link to='addtowarehouse'>Add to warehouse</Link>
				<Link to=''>main</Link>
				<Link to='reports'>Reports</Link>
			</div>
			<div className={css.auth}>
				{isLoggedIn ? <button>Logout</button> : <Link to='login'>Logout</Link>}
			</div>
		</nav>
    </div>
  )
}

export default WarehouseWrapper