import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./Bookhouseadminapi";

const BookHouseManageProducts = () => {
  const [bookhouseproducts, setBookHouseProducts] = useState([]);

  const { bookhouseuser, signedtoken } = isAuthenticated();

  const loadProducts = () => {
    console.log("inside loadProducts");
    getProducts().then(data => {
      console.log("inside loadProducts");

      if (data.error) {
        console.log(data.error);
      } else {
        setBookHouseProducts(data);
      }
    });
  };

  const destroy = productId => {
    deleteProduct(productId, bookhouseuser._id, signedtoken).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <BookHouseLayout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">
            Total {bookhouseproducts.length} products
          </h2>
          <hr />
          <ul className="list-group">
            {bookhouseproducts.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.bookname}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <button
                  onClick={() => destroy(p._id)}
                  class="btn btn-primary btn-lg"
                >
                  <label>Delete</label>
                </button>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </BookHouseLayout>
  );
};

export default BookHouseManageProducts;
