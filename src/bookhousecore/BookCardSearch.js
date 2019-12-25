import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import BookHouseImageSearch from "./BookHouseImageSearch";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { green } from "@material-ui/core/colors";
import { addItem, updateCart, removeProductFromCart } from "./Cart";
import { Button, Icon, Message } from "semantic-ui-react";

const BookCardSearch = ({
  bookhouseproduct,
  showViewProductButton = true,
  viewAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(bookhouseproduct.count);

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",

      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    }
  }));
  const classes = useStyles();
  const longText = `
  Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
  Praesent non nunc mollis, fermentum neque at, semper arcu.
  Nullam eget est sed sem iaculis gravida eget vitae justo.
  `;
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

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeProductFromCart(bookhouseproduct._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const handleChange = bookhouseproductId => event => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateCart(bookhouseproductId, event.target.value);
    }
  };

  const showCartUpdate = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(bookhouseproduct._id)}
            />
          </div>
        </div>
      )
    );
  };
  const handleDelete = () => {
    alert(
      "The book " +
        bookhouseproduct.bookname +
        " is available" +
        " and Quantity is: " +
        bookhouseproduct.quantity
    );
  };

  const addToCart = () => {
    console.log("inside addtocart");
    addItem(bookhouseproduct, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCartButton = viewAddToCartButton => {
    return (
      viewAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-warning btn-lg btn-block"
        >
          Add to card1
        </button>
      )
    );
  };
  const showStock = quantity => {
    return quantity > 0 ? (
      <div>
        <Message color="white" icon>
          <Icon name="book" loading />
          <Message.Content>
            <Message.Header>{bookhouseproduct.bookname}</Message.Header>
            In stock
          </Message.Content>
        </Message>
      </div>
    ) : (
      <div>
        <Message
          icon="announcement"
          header="Sorry someone is reading this book right now"
          content="Book is out of stock."
        />
      </div>
    );
  };
  return (
    <div>
      <div className="card">
        <div className="card-header name">
          <h4>{bookhouseproduct.bookname}</h4>
        </div>
        <div className="card-body">
          {showStock(bookhouseproduct.quantity)}
          {shouldRedirect(redirect)}

          <BookHouseImageSearch item={bookhouseproduct} url="product" />
          <h3>Author: {bookhouseproduct.author}</h3>
          {/* <h3>Category: </h3>
          {bookhouseproduct.bookhousecategory &&
            bookhouseproduct.bookhousecategory.categoryname} */}
          <p className="lead mt-2">
            {bookhouseproduct.bookdescription.substring(0, 100)}
          </p>

          <h3> Added on {moment(bookhouseproduct.createdAt).fromNow()}</h3>

          <h3>Rs {bookhouseproduct.price}</h3>

          <br />

          <br />
          {showViewButton(showViewProductButton)}

          {showAddToCartButton(viewAddToCartButton)}
          {showRemoveButton(showRemoveProductButton)}

          {showCartUpdate(cartUpdate)}
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default BookCardSearch;
