import React, { Component } from "react";
import BookHouseAddressItem from "./BookHouseAddressItem";

class BookHouseAddressSuggest extends Component {
  render() {
    return (
      <BookHouseAddressItem
        label="Address"
        value={this.props.query}
        placeholder="start typing"
      />
    );
  }
}

export default BookHouseAddressSuggest;
