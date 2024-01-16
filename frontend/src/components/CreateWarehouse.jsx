import css from '../style/CreateWarehouse.module.css';
import logo from '../assets/logo.png';

const CreateWarehouse = () => {
	return (
		<div className={css.wrapper}>
			<div className={css.warehouse}>
				<h1>Create warehouse</h1>
				<form className={css.form}>
                    <input type="text" placeholder='Warehouse name'/>
                    <input type="text" placeholder='Warehouse description' />
                    <button>Create warehouse</button>
                </form>
			</div>
            <img className={css.logo} src={logo} alt="" />
		</div>
	);
};

export default CreateWarehouse;
