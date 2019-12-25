import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import BookHouseImageHome from "./BookHouseImageHome";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { green } from "@material-ui/core/colors";
import { addItem, updateCart, removeProductFromCart } from "./Cart";
import { Message, Icon } from "semantic-ui-react";
import { Rating } from "semantic-ui-react";
import { Button, Segment } from "semantic-ui-react";

const BookCardHome = ({
  bookhouseproduct,
  showViewProductButton = true,
  viewAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {
  const action = (
    <Button color="primary" size="small">
      Know More
    </Button>
  );
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
          <Segment inverted>
            <Button inverted color="blue" size="massive">
              View More Book Info
            </Button>
          </Segment>
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
        <Segment inverted>
          <Button inverted color="green" size="massive" onClick={addToCart}>
            Add to Bookhouse cart
          </Button>
        </Segment>
      )
    );
  };
  const disableAddToCartButton = viewAddToCartButton => {
    return (
      !viewAddToCartButton && (
        <Segment inverted>
          <Button
            disabled
            inverted
            color="green"
            size="massive"
            onClick={addToCart}
          >
            Book Out Of Stock
          </Button>
        </Segment>
      )
    );
  };

  const showStock = quantity => {
    if (quantity > 0) {
      viewAddToCartButton = true;
    } else {
      viewAddToCartButton = false;
    }
    return quantity > 0 ? (
      <div>
        {/* <Chip
          icon={<FaceIcon />}
          label="Book in Stock"
          onDelete={handleDelete}
          color="primary"
          deleteIcon={<DoneIcon />}
        /> */}
        <Segment inverted>
          <Button inverted color="teal" size="massive" disabled>
            Book is In Stock
          </Button>
        </Segment>
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
        {/* <Tooltip title={longText}>
          <Button className={classes.button}>Book is Out of Stock</Button>
        </Tooltip> */}
        <Segment inverted>
          <Button inverted color="red" size="massive" disabled>
            Book Out of Stock
          </Button>
        </Segment>
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
          <Rating icon="star" size="massive" defaultRating={3} maxRating={5} />
          <h4>{bookhouseproduct.bookname}</h4>
        </div>
        <div className="card-body">
          <p className="black-8">
            {showStock(bookhouseproduct.quantity)}
            <h3> Added on {moment(bookhouseproduct.createdAt).fromNow()}</h3>
          </p>
          {shouldRedirect(redirect)}
          <BookHouseImageHome item={bookhouseproduct} url="product" />
          <p className="lead mt-2">
            {bookhouseproduct.bookdescription.substring(0, 100)}
          </p>
          <p className="black-9">
            <h3>Category: </h3>

            {bookhouseproduct.bookhousecategory &&
              bookhouseproduct.bookhousecategory.categoryname}
          </p>

          <p className="black-10">
            <h3>Author:</h3>
            {bookhouseproduct.author}
          </p>
          <h3>Rs {bookhouseproduct.price}</h3>

          <br />

          <br />

          <br></br>
          {showViewButton(showViewProductButton)}

          {showAddToCartButton(viewAddToCartButton)}
          {disableAddToCartButton(viewAddToCartButton)}
          {showRemoveButton(showRemoveProductButton)}

          {showCartUpdate(cartUpdate)}
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default BookCardHome;
