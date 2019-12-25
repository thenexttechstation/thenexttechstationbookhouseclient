import React, { useState, useEffect } from "react";
import BookHouseLayout from "./BookhouseLayout";
import { emptyCart } from "./Cart";
import ReactDOM from "react-dom";
import RazorPay from "./RazorPay";
import { QRCode } from "react-qr-svg";
import BookHouseAddressForm from "./BookHouseAddressForm";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createBookhouseOrder
} from "./BookHouseAPICore";
import BookCard from "./BookCard";
import {
  isAuthenticated,
  isSocialAuthenticated
} from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
import { Form, Message, Button, Segment, Input } from "semantic-ui-react";

const BookHouseCheckout = ({ bookhouseproducts }) => {
  const { bookhouseuser, signedtoken } = isAuthenticated();
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });

  let deliveryAddress = data.address;
  const bookhouseuserId =
    isAuthenticated() && isAuthenticated().bookhouseuser._id;
  const token = isAuthenticated() && isAuthenticated().signedtoken;

  const getToken = (bookhouseuserId, token) => {
    console.log("bookhouseuserid" + bookhouseuserId);
    console.log("token" + token);

    getBraintreeClientToken(bookhouseuserId, token).then(data => {
      console.log("Inside getBraintreeClientToken");
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        console.log("success" + data.clientToken);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(bookhouseuserId, token);
  }, []);
  const getTotal = () => {
    return bookhouseproducts.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() || isSocialAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <div>
        <Link to="/login">
          <Segment inverted>
            <Button inverted color="green" size="massive">
              Authenticate to Book House
            </Button>
          </Segment>{" "}
        </Link>
      </div>
    );
  };
  const handledeliveryAddress = event => {
    setData({ ...data, address: event.target.value });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {bookhouseproducts.length}-jjj
      {data.clientToken !== null && bookhouseproducts.length > 0 ? (
        <div>
          <div className="gorm-group mb-3">
            <BookHouseAddressForm />
            <Form>
              <Form.Field>
                <h3>Delivery Address</h3>
                <input
                  onChange={handledeliveryAddress}
                  value={data.address}
                  placeholder="First Name"
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input placeholder="Last Name" />
              </Form.Field>
            </Form>

            <label className="text-muted">Delivery address:</label>
            <textarea
              onChange={handledeliveryAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <div class="registration">
            <form>
              <label>Email</label>

              <input type="text" />
              <p class="error">
                <span>This email exists already in the database</span>
              </p>

              <label>Password</label>
              <input type="text" />
              <p class="error">
                <span>At least 8 characters</span>
              </p>

              <label>Password [repeat]</label>
              <input type="text" />
              <p class="error">
                <span>Some text here</span>
              </p>

              <label>Year of Birth</label>
              <input type="text" />
              <p class="error">
                <span>Some text here</span>
              </p>

              <label>Country</label>
              <select name="country">
                <option>Country 1</option>
                <option>Country 2</option>
              </select>

              <div class="register_button">
                <span>
                  <a href="#">REGISTER</a>
                </span>
              </div>
            </form>
          </div>
          <br></br>
          <div>
            <button
              onClick={makePayment}
              className="btn btn-success btn-lg btn-block"
            >
              Make Payment
            </button>
          </div>
          <RazorPay
            bookhouseuser={bookhouseuser}
            bookhouseproducts={bookhouseproducts}
            address={data.address}
          />
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 256 }}
            value="some text"
          />
        </div>
      ) : null}
    </div>
  );

  const makePayment = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(bookhouseproducts)
        };

        processPayment(bookhouseuserId, token, paymentData)
          .then(response => {
            // console.log(response

            const createOrderData = {
              bookhouseproducts: bookhouseproducts,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
              bookhouseuser: bookhouseuser
            };

            createBookhouseOrder(bookhouseuserId, token, createOrderData)
              .then(response => {
                emptyCart(() => {
                  console.log("payment success and empty cart");
                  setData({
                    loading: false,
                    success: true
                  });
                });
              })
              .catch(error => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch(error => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch(error => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };
  const showError = error => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      <Message
        icon="user secret"
        header="Login or Register to avail the features"
        content="Visit the registration/Login Page"
      />
    </div>
  );

  const showSuccess = success => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Payment successfull
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}

      {showCheckout()}
    </div>
  );
};

export default BookHouseCheckout;
