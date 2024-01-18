import React from 'react';
import css from '../style/Home.module.css';
import Select from './Select';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<section className={css.space}>
				<div>
					<p className={css.title}>spaceful</p>
					<h1>the best solution for your warehouse management needs</h1>
					<p className={css.scroll}>Scroll down to see more</p>
				</div>
			</section>
			<section className={css.text}>
				<h2>
					Spaceful is an app that simplifies and automates your daily warehouse
					operations.
				</h2>
				<p>
					With spaceful, you can access the following general services from your mobile
					device:
				</p>
				<ul>
					<li>
						<strong>Inventory management:</strong> Track and update your inventory
						levels, locations, and movements in real time using barcode scanning and
						data synchronization.
					</li>
					<li>
						<strong>Order management:</strong> Process and fulfill orders faster and
						more accurately with optimized picking, packing, and shipping workflows.
					</li>
					<li>
						<strong>Staff manegment:</strong> Manege your staff with custom roles and
						diferent data access.
					</li>
				</ul>
				<p>
					Spaceful is compatible with Windows, Android, and iOS devices. Whether you run a
					small business or a large enterprise, spaceful can help you reduce costs,
					increase efficiency, and enhance customer satisfaction. Start your jurney on
					spaceful today and take your warehouse operations to the next level!
				</p>
				<div className={css.wrap}>
					<Link to='/createwarehouse' className={css['make-account']}>
						<h2>Start your journey</h2>
					</Link>
				</div>
			</section>
		</>
	);
};

export default Home;
