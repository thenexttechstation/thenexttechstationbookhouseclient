import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import BookHouseImageCart from "./BookHouseImageCart";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { green } from "@material-ui/core/colors";
import { addItem, updateCart, removeProductFromCart } from "./Cart";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Grid, Segment } from "semantic-ui-react";
import { Button, Icon, Message } from "semantic-ui-react";

const BookCardCart = ({
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
  const [state, setState] = React.useState({
    outofstock: false,
    instock: true
  });
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      button: {
        margin: theme.spacing(1),
        size: "large"
      },

      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    }
  }));
  const classes = useStyles();
  const longText = `
  This Book is currently Out of stock.Please write to thenexttechstation@gmail.com for further enquires
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
        <Button
          color="black"
          size="massive"
          onClick={() => {
            removeProductFromCart(bookhouseproduct._id);
            setRun(!run);
          }}
        >
          Delete Book from Cart
        </Button>
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
          <div className="input-group ">
            <div className="input-group-prepend">
              <button
                type="button"
                disabled
                class="btn btn-danger btn-lg btn-block"
              >
                Quantity
              </button>
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
      <div className={classes.root}>
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
      <Grid columns="equal" divided padded inverted>
        <Grid.Row color="black" textAlign="center">
          <Grid.Column>
            <Segment color="yellow" inverted>
              {showStock(bookhouseproduct.quantity)}

              <br></br>
              {showRemoveButton(showRemoveProductButton)}

              {shouldRedirect(redirect)}
              <BookHouseImageCart item={bookhouseproduct} url="product" />
              <br></br>
              <h3>{bookhouseproduct.bookname}</h3>

              <h3>
                {bookhouseproduct.bookhousecategory &&
                  bookhouseproduct.bookhousecategory.categoryname}
              </h3>

              <h3>{bookhouseproduct.author}</h3>
              <h3>Price: Rs {bookhouseproduct.price}</h3>

              {showViewButton(showViewProductButton)}
              {showAddToCartButton(viewAddToCartButton)}

              {showCartUpdate(cartUpdate)}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default BookCardCart;
