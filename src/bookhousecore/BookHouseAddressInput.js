import React, { Component } from "react";
import BookHouseAddressItem from "./BookHouseAddressItem";

class BookHouseAddressInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.onChange(evt);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <BookHouseAddressItem
            label="Street"
            id="street"
            value={this.props.street}
            onChange={this.handleChange}
            placeholder=""
          />
          <BookHouseAddressItem
            label="City"
            id="city"
            value={this.props.city}
            onChange={this.handleChange}
            placeholder=""
          />
          <BookHouseAddressItem
            label="State"
            id="state"
            value={this.props.state}
            onChange={this.handleChange}
            placeholder=""
          />
          <BookHouseAddressItem
            label="Postal Code"
            id="postalCode"
            value={this.props.postalCode}
            onChange={this.handleChange}
            placeholder=""
          />
          <BookHouseAddressItem
            label="Country"
            id="country"
            value={this.props.country}
            onChange={this.handleChange}
            placeholder=""
          />
        </div>
      </div>
    );
  }
}

export default BookHouseAddressInput;
