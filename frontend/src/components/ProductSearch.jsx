import axios from "axios";
import "../style/ProductSearchungus.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductSearch = () => {
  const {warehouseId}=useParams();
  console.log(warehouseId);

  const [showFilter, setShowFilters]=useState(false);
  let filterClass;
  if(showFilter) {
    filterClass="showFilters";
  }
  else {
    filterClass="";
  };

  const [byType, showByType]=useState(false);

  const [byExpiration, showByExpiration]=useState(false);

  const [byAmount, showByAmount]=useState(false);

  const [descendingAscending, showByDescendingAscending]=useState(false);

  const [productArray, setProductArray]=useState([]);

  useEffect(()=> {
    axios
      .get(
        "http://localhost:8000/api/warehouse/"+warehouseId,
      )
      .then(function (response) {
        //success
        console.log(response.data);
        setProductArray(response.data.data);
      })
      .catch(function (error) {
        //fail
        console.error(error);
      });
  }, [])


  // const productArray = [
  //   {
  //     id: "value1",
  //     productName: "name",
  //     img: (
  //       <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/laptops-2048px-5607.jpg?auto=webp&quality=75&crop=1.91:1&width=1200"></img>
  //     ),
  //     shelfNumber: "number",
  //     inStock: "amount",
  //   },
  //   {
  //     id: "value2",
  //     productName: "name2",
  //     img: (
  //       <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/laptops-2048px-5607.jpg?auto=webp&quality=75&crop=1.91:1&width=1200"></img>
  //     ),
  //     shelfNumber: "number2",
  //     inStock: "amount2",
  //   },
  //   {
  //     id: "value3",
  //     productName: "name3",
  //     img: (
  //       <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/laptops-2048px-5607.jpg?auto=webp&quality=75&crop=1.91:1&width=1200"></img>
  //     ),
  //     shelfNumber: "number3",
  //     inStock: "amount3",
  //   },
  //   {
  //     id: "value4",
  //     productName: "name4",
  //     img: (
  //       <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/laptops-2048px-5607.jpg?auto=webp&quality=75&crop=1.91:1&width=1200"></img>
  //     ),
  //     shelfNumber: "number4",
  //     inStock: "amount4",
  //   },
  //   {
  //     id: "value5",
  //     productName: "name5",
  //     img: (
  //       <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/laptops-2048px-5607.jpg?auto=webp&quality=75&crop=1.91:1&width=1200"></img>
  //     ),
  //     shelfNumber: "number5",
  //     inStock: "amount5",
  //   },
  //   {
  //     id: "value6",
  //     productName: "name6",
  //     img: (
  //       <img src="https://cdn.thewirecutter.com/wp-content/media/2023/06/laptops-2048px-5607.jpg?auto=webp&quality=75&crop=1.91:1&width=1200"></img>
  //     ),
  //     shelfNumber: "number6",
  //     inStock: "amount6",
  //   },
  // ];
  const listProducts = productArray.map((products) => (
    <div className="ProductBox">
      <div className="wrapper">
        <strong>{products.name}</strong>
        <p>ID: {products.id}</p>
      </div>
      <div className="wrapper2">
        <img src={products.img} alt="" />
      </div>
      <div className="wrapper3">
        <p>Shelf: {products.shelfId}</p>
        <p>In stock: {products.amount}</p>
      </div>
    </div>
  ));

  return (
    <div className="center">
      <>
        <div className="SearchBox">
          <input type="text" placeholder="Search..." className="Search" />
          <button className="FilterButton" onClick={() => setShowFilters(!showFilter)}>filter options</button>
        </div>
        <div className="ProductList">{listProducts}</div>
      </>

      <div className={'FilterBox ' + filterClass}>
        <div className="FilterHeader">
          <p>filters</p>
        </div>
        <div className="Filters">
          <p>By Type</p>
          <input type="checkbox"></input>
        </div>
        <div className="Filters">
          <p>By Expiration</p>
          <input type="checkbox"></input>
        </div>
        <div className="Filters">
             <p>By Amount</p>
             <input type="checkbox"></input>
        </div>
        <div className="Filters">
          <p>Descending/Ascending</p>
          <input type="checkbox"></input>
        </div>
      </div>

    </div>
  );
};

export default ProductSearch;
