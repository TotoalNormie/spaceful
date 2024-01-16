
import '../style/ProductSearchungus.css';

const ProductSearch = () => {
	const productArray = [
		{
			id: 'value1',
			productName: 'name',
			img: 'link',
			shelfNumber: 'number',
			inStock: 'amount',
		},
		{
			id: 'value2',
			productName: 'name2',
			img: 'link2',
			shelfNumber: 'number2',
			inStock: 'amount2',
		},
		{
			id: 'value3',
			productName: 'name3',
			img: 'link3',
			shelfNumber: 'number3',
			inStock: 'amount3',
		},
	];
	const listProducts = productArray.map(products => <li>{products}</li>);
	return (
		<div class='center'>
			<>
				<div class='SearchBox'>
					<input type='text' placeholder='Search...' className='Search' />
					<button class='FilterButton'>filter options</button>
				</div>
				<ul>{listProducts}</ul>;
			</>
		</div>
	);
};

export default ProductSearch;
