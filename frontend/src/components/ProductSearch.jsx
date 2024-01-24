import axios from "axios";
import "../style/ProductSearchungus.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductSearch = () => {
  const { warehouseId } = useParams();
  console.log(warehouseId);
  const [search, setSearch] = useState("");
  console.log(search);
  const [showFilter, setShowFilters] = useState(false);
  let filterClass;
  if (showFilter) {
    filterClass = "showFilters";
  } else {
    filterClass = "";
  }

  const [byType, showByType] = useState(false);

  const [byExpiration, showByExpiration] = useState(false);

  const [byAmount, showByAmount] = useState(false);

  const [descendingAscending, showByDescendingAscending] = useState(false);

  const [productArray, setProductArray] = useState([]);

  let neverFound = "";
  if (productArray.length == 0) {
    neverFound = "ShowNotFound";
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/" + warehouseId)
      .then(function (response) {
        //success
        console.log(response);
        setProductArray(response.data);
      })
      .catch(function (error) {
        //fail
        console.error(error);
      });
  }, []);

  const listProducts = productArray
    .filter((products) => {
      return search.toLowerCase() === ""
        ? products
        : products.name.toLowerCase().includes(search);
    })
    .map((products) => (
      <div className="ProductBox">
        <div className="wrapper">
          <strong>{products.name}</strong>
          <p key={products.id}>ID: {products.id}</p>
        </div>
        <div className="wrapper2">
          <img src={products.img} alt="" />
        </div>

        <div className="wrapper3">
          <p>Price: {products.price}</p>
          <p>Weight: {products.weight}</p>
        </div>
        <div className="wrapper3">
          <p>
            Supplier:
            {products.supplier}
          </p>
        </div>
        <div className="description">
          <p>
            Supplier Description:
            {products.supplierDescription}
          </p>
        </div>
      </div>
    ));

  return (
    <div className="center">
      <>
        <div className="SearchBox">
          <input
            type="text"
            placeholder="Search..."
            className="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="FilterButton"
            onClick={() => setShowFilters(!showFilter)}
          >
            filter options
          </button>
        </div>
        <div className="ProductList">{listProducts}</div>
      </>

      <div className={"FilterBox " + filterClass}>
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

      <div className={"NotFound " + neverFound}>
        <img
          className="image"
          src="https://cdn.discordapp.com/attachments/1158383864197157018/1199266019328401479/skull-75-256.png?ex=65c1ea84&is=65af7584&hm=27521eec766011082aea66ce112cda5337ed8cc24ec1ad10d4da1e7727203c6c&"
        ></img>
        <h1>No results found...</h1>
      </div>
    </div>
  );
};

export default ProductSearch;
