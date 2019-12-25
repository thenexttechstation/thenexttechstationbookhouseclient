import React from "react";
import { Link } from "react-router-dom";
import BookHouseImageBookShop from "./BookHouseImageBookShop";
import moment from "moment";

const BookCardBookShop = ({
  bookhouseproduct,
  showViewProductButton = true
}) => {
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${bookhouseproduct._id}`} className="mr-2">
          <button className="btn btn-primary btn-lg btn-block">
            View Product
          </button>
        </Link>
      )
    );
  };
  const showAddToCartButton = () => {
    return (
      <button type="button" className="btn btn-warning btn-lg btn-block">
        Add to card
      </button>
    );
  };
  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h4>{bookhouseproduct.bookname}</h4>
        </div>
        <div className="card-body">
          <BookHouseImageBookShop item={bookhouseproduct} url="product" />
          <p className="lead mt-2">
            {bookhouseproduct.bookdescription.substring(0, 100)}
          </p>
          <p className="black-10">${bookhouseproduct.price}</p>
          <p className="black-9">
            Category:{" "}
            {bookhouseproduct.bookhousecategory &&
              bookhouseproduct.bookhousecategory.categoryname}
          </p>
          <p className="black-8">
            Added on {moment(bookhouseproduct.createdAt).fromNow()}
          </p>
          <p className="black-10">${bookhouseproduct.author}</p>
          <p>${bookhouseproduct.price}</p>
          <p>{bookhouseproduct.author}</p>
          {showStock(bookhouseproduct.quantity)}
          <br />
          {showViewButton(showViewProductButton)}

          {showAddToCartButton()}
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default BookCardBookShop;
