import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { getProducts } from "./BookHouseAPICore";
import BookCardHome from "./BookCardHome";
import Carousal from "../bookhousecore/Carousal";
import SearchBookHouse from "./SearchBookHouse";
import Carousel from "react-bootstrap/Carousel";
import { Grid, Image, Label, Segment } from "semantic-ui-react";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  const loadProductsByPurchase = () => {
    getProducts("mostPurchased").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsRecent = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByPurchase();
    loadProductsRecent();
  }, []);

  return (
    <BookHouseLayout
      pagetitle="Book House"
      pagedescription="The Next Tech Station Innovation"
      className="container-fluid"
    >
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="400"
            height="500"
            src="https://bookhouse.s3.amazonaws.com/22.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2>Book House</h2>
            <h4>
              If there's a book that you want to read, but it hasn't been
              written yet, then you must write it.-― Toni Morrison
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="400"
            height="500"
            src="https://bookhouse.s3.amazonaws.com/21.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h2>Book House</h2>
            <h4>
              If you only read the books that everyone else is reading, you can
              only think what everyone else is thinking -― Haruki Murakami
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="400"
            height="500"
            src="https://bookhouse.s3.amazonaws.com/23.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h2>Book House</h2>
            <h4>
              ′Classic′ - a book which people praise and don't read.-Mark Twain.
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="400"
            height="500"
            src="https://bookhouse.s3.amazonaws.com/book.jpeg"
            alt="Fourth slide"
          />

          <Carousel.Caption>
            <h2>Book House</h2>
            <h4>Good books don't give up all their secrets at once.</h4>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            width="400"
            height="500"
            src="https://bookhouse.s3.amazonaws.com/book2.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h2>Book House</h2>
            <h4>
              The worst thing about new books is that they keep us from reading
              the old ones.
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((bookhouseproduct, i) => (
          <div key={i} className="col-4 mb-3">
            <BookCardHome key={i} bookhouseproduct={bookhouseproduct} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((bookhouseproduct, i) => (
          <div key={i} className="col-4 mb-3">
            <BookCardHome bookhouseproduct={bookhouseproduct} />
          </div>
        ))}
      </div>
      <br></br>
      <h2 className="mb-4">Editor's Pick</h2>

      <Grid columns={2}>
        <Grid.Column>
          <Segment color="teal" inverted craised>
            <Label as="a" color="red" ribbon>
              Yantram
            </Label>
            <span>Malayatoor</span>

            <Image src="https://bookhouse.s3.amazonaws.com/bookimage/yantram.jpg" />
            <h5 className="mb-4">
              ഭരണത്തിന്റെ അത്യുന്നതങ്ങളിലെ അറിയപ്പെടാത്ത മുഖങ്ങളും സംഭവങ്ങളുമാണ്
              യന്ത്രത്തിലൂടെ അനാവരണം ചെയ്യുന്നത്. ഐ എ എസുകാരന്‍ കൂടിയായ
              മലയാറ്റൂര്‍ ഭരണമണ്ഡലത്തെപ്പറ്റി എഴുതുമ്പോള്‍ അത് അങ്ങേയറ്റം
              കൃത്യവും വസ്‌തുനിഷ്‌ഠവുമാകുന്നു. മലയാറ്റൂരിന്റെ ശ്രദ്ധേയമായ
              നോവലിന്റെ ഏഴാം പതിപ്പ്.
            </h5>

            <Label as="a" color="blue" ribbon>
              Community
            </Label>
            <span>User Reviews</span>

            <Image src="https://bookhouse.s3.amazonaws.com/bookimage/mafia.jpg" />
            <h5 className="mb-4">
              ഭരണത്തിന്റെ അത്യുന്നതങ്ങളിലെ അറിയപ്പെടാത്ത മുഖങ്ങളും സംഭവങ്ങളുമാണ്
              യന്ത്രത്തിലൂടെ അനാവരണം ചെയ്യുന്നത്. ഐ എ എസുകാരന്‍ കൂടിയായ
              മലയാറ്റൂര്‍ ഭരണമണ്ഡലത്തെപ്പറ്റി എഴുതുമ്പോള്‍ അത് അങ്ങേയറ്റം
              കൃത്യവും വസ്‌തുനിഷ്‌ഠവുമാകുന്നു. മലയാറ്റൂരിന്റെ ശ്രദ്ധേയമായ
              നോവലിന്റെ ഏഴാം പതിപ്പ്.
            </h5>
          </Segment>
        </Grid.Column>

        <Grid.Column>
          <Segment inverted color="blue">
            <Label as="a" color="orange" ribbon="right">
              Specs
            </Label>
            <Image src="https://bookhouse.s3.amazonaws.com/books/60.jpg" />
            <h5 className="mb-4">
              It’s the first day of March, and it has been a great year for Ravi
              Shastry, a regional head at an international bank. Promotions and
              increments seem within reach, life is good, and the month of March
              should be very merry. Until trouble in Imperial Bank, Brazil,
              snowballs into an international crisis, and the Indian bank also
              has to lay off one-fifth of its staff. And battlelines are drawn,
              conspiracies are hatched as everyone struggles to make sure their
              name is not on the laidoff list. Meanwhile, Ravi’s wife is having
              her own professional and personal crisis, and Ravi must protect
              his team, his family, and himself—all of which is not helped by
              mysterious tweets from @ImperialInsider, who seems to know
              everything that is happening. This crackling page-turner (set over
              a period of 31 days) reveals the ruthlessly cut-throat world of
              the banking industry, but also its humour, quirks and strange
              camaraderie.
            </h5>

            <Label as="a" color="teal" ribbon="right">
              Kasakinte ithihasam
            </Label>
            <Image src="https://bookhouse.s3.amazonaws.com/books/32.jpg" />
            <h5 className="mb-4">
              ഭരണത്തിന്റെ അത്യുന്നതങ്ങളിലെ അറിയപ്പെടാത്ത മുഖങ്ങളും സംഭവങ്ങളുമാണ്
              യന്ത്രത്തിലൂടെ അനാവരണം ചെയ്യുന്നത്. ഐ എ എസുകാരന്‍ കൂടിയായ
              മലയാറ്റൂര്‍ ഭരണമണ്ഡലത്തെപ്പറ്റി എഴുതുമ്പോള്‍ അത് അങ്ങേയറ്റം
              കൃത്യവും വസ്‌തുനിഷ്‌ഠവുമാകുന്നു. മലയാറ്റൂരിന്റെ ശ്രദ്ധേയമായ
              നോവലിന്റെ ഏഴാം പതിപ്പ്.
            </h5>
          </Segment>
        </Grid.Column>
      </Grid>
    </BookHouseLayout>
  );
};

export default Home;
