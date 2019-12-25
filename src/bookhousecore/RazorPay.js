import React, { Component } from "react";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
const { bookhouseuser, signedtoken } = isAuthenticated();

class RazorPay extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false, payment_amount: 0, amount: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.paymentHandler = this.paymentHandler.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.bookhouseproducts = props.bookhouseproducts;
    this.amount = this.getTotal();
    this.bookhouseuser = props.bookhouseuser;
    this.address = props.address;
  }

  getTotal = () => {
    return this.bookhouseproducts.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);
  }
  handleChange() {
    this.setState({
      checked: !this.state.checked
    });
  }
  changeAmount(e) {
    this.setState({ amount: e.target.value });
  }
  paymentHandler(e) {
    e.preventDefault();
    let options = {
      key: "rzp_test_tdMZwtqB1aBggd",
      amount: this.amount * 100, // 2000 paise = INR 20, amount in paisa
      name: "Book House",
      description: "Payment for the Books",
      image: "/your_logo.png",
      external: {
        wallets: [
          "amazonpay",
          "olamoney",
          "phonepe",
          "airtelmoney",
          "jiomoney",
          "mobikwik"
        ]
      },
      handler: function(response) {
        alert(JSON.stringify(response));
      },
      prefill: {
        name: "test",
        email: "test"
      },
      notes: {
        address: this.address
      },
      theme: {
        color: "#2484D7"
      }
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
  }

  render() {
    return (
      <div className="bg">
        <h2 className="heading">Razor Pay Payment</h2>

        <div className="payments-form">
          <p>
            <label htmlFor="pay_amount" className="pay_amount">
              Amount to be paid
            </label>

            {JSON.stringify(this.bookhouseuser)}
          </p>
          <p>
            <button
              onClick={this.paymentHandler}
              className="btn btn-primary btn-lg btn-block"
            >
              Razor Pay Payment
            </button>
          </p>
        </div>
      </div>
    );
  }
}
export default RazorPay;
