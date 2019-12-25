import React from "react";
import BookHouseMenu from "./BookHouseMenu";
import BookHouseFooter from "./BookHouseFooter";

import BookHouseBottomMenu from "./BookHouseBottomMenu";

import "../styles.css";

const BookHouseLayout = ({
  pagetitle = "Title",
  pagedescription = "Description",
  className,
  children
}) => (
  <div>
    <BookHouseMenu />
    <div className="jumbotron">
      <h2>{pagetitle}</h2>
      <p>{pagedescription}</p>
    </div>
    <div className={className}>{children}</div>
    <BookHouseFooter />
  </div>
);

export default BookHouseLayout;
