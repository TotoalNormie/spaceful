import React from 'react';
import css from '../style/Error404.module.css';

const Error404 = () => {
	return (
		<div className={css.wrapper}>
			<div>
				<div className={css.title}>404 Not found</div>
				<h3>try a different link</h3>
			</div>
		</div>
	);
};

export default Error404;
