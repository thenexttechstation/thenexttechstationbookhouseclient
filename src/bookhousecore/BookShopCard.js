import React from "react";
import { Link } from "react-router-dom";
import BookhouseImage from "./BookHouseImage";
import moment from "moment";
import { Grid, Segment } from "semantic-ui-react";
import { Button, Icon, Message } from "semantic-ui-react";
const BookShopCard = ({ bookhouseproduct, showViewProductButton = true }) => {
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
      <Message color="white" icon>
        <Icon name="book" loading />
        <Message.Content>
          <Message.Header>{bookhouseproduct.bookname}</Message.Header>
          In stock
        </Message.Content>
      </Message>
    ) : (
      <Message
        icon="announcement"
        header="Sorry someone is reading this book right now"
        content="Book is out of stock."
      />
    );
  };
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>{bookhouseproduct.bookname}</h3>
        </div>
        {showStock(bookhouseproduct.quantity)}
        <div className="card-body">
          <BookhouseImage item={bookhouseproduct} url="product" />
          <p className="lead mt-2">
            {bookhouseproduct.bookdescription.substring(0, 100)}
          </p>
          <h3 className="black-10">Price :Rs {bookhouseproduct.price}</h3>
          <h3 className="black-9">
            Category:{" "}
            {bookhouseproduct.bookhousecategory &&
              bookhouseproduct.bookhousecategory.categoryname}
          </h3>
          <h3 className="black-8">
            Added on {moment(bookhouseproduct.createdAt).fromNow()}
          </h3>
          <h3 className="black-10">Author: {bookhouseproduct.author}</h3>

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

export default BookShopCard;
