import React from "react";
//import "../styles.css";

const Carousal = ({
  pagetitle = "Title",
  pagedescription = "Description",
  className,
  children
}) => (
  <div id="MagicCarousel" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner" role="listbox">
      <div className="carousel-item">
        <img className="d-block w-100" src="images/1.jpg" alt="First"></img>
        <div className="carousel-caption">
          <h3>Hello</h3>
          <p>First slide</p>
        </div>
      </div>

      <div className="carousel-item">
        <img className="d-block w-100" src="images/1.jpg" alt="First"></img>
        <div className="carousel-caption">
          <h3>Hello</h3>
          <p>First slide</p>
        </div>
      </div>

      <div className="carousel-item">
        <img className="d-block w-100" src="images/1.jpg" alt="First"></img>
        <div className="carousel-caption">
          <h3>Hello</h3>
          <p>First slide</p>
        </div>
      </div>

      <div className="carousel-item">
        <img className="d-block w-100" src="images/1.jpg" alt="First"></img>
        <div className="carousel-caption">
          <h3>Hello</h3>
          <p>First slide</p>
        </div>
      </div>
    </div>
  </div>
);

export default Carousal;
