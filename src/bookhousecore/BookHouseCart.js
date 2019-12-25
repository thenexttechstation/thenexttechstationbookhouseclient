import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookHouseLayout from "./BookhouseLayout";
import { getCart } from "./Cart";
import BookCardCart from "./BookCardCart";
import BookHouseCheckout from "./BookHouseCheckout";
import { Button, Card, Image } from "semantic-ui-react";

const BookHouseCart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((bookhouseproduct, i) => (
          <BookCardCart
            key={i}
            bookhouseproduct={bookhouseproduct}
            viewAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <div>
      <h2>
        Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
      </h2>
      <Image
        src="https://bookhouse.s3.amazonaws.com/tc6.jpg"
        size="medium"
        rounded
      />
    </div>
  );

  return (
    <BookHouseLayout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Checkout</h2>
          <hr></hr>
          <BookHouseCheckout bookhouseproducts={items}></BookHouseCheckout>
        </div>
      </div>
    </BookHouseLayout>
  );
};

export default BookHouseCart;
