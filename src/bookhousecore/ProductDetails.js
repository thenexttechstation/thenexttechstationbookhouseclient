import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import {
  getProducts,
  fetchSingleBook,
  fetchRelatedProduct
} from "./BookHouseAPICore";
import BookCard from "./BookCard";
import BookShopCard from "./BookCard";

import Carousal from "../bookhousecore/Carousal";

const ProductDetails = props => {
  const [bookhouseproduct, setbookhouseProduct] = useState({});
  const [relatedbookhouseproduct, setrelatedbookhouseProduct] = useState([]);

  const [error, setError] = useState(false);

  const fetchSingleProduct = bookhouseproductId => {
    fetchSingleBook(bookhouseproductId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setbookhouseProduct(data);
        //load related product
        fetchRelatedProduct(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setrelatedbookhouseProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const bookhouseproductId = props.match.params.bookhouseproductId;
    fetchSingleProduct(bookhouseproductId);
  }, [props]);
  return (
    <BookHouseLayout
      pagetitle={bookhouseproduct && bookhouseproduct.bookname}
      pagedescription={
        bookhouseproduct &&
        bookhouseproduct.bookdescription &&
        bookhouseproduct.bookdescription.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {bookhouseproduct && bookhouseproduct.bookdescription && (
            <BookShopCard
              bookhouseproduct={bookhouseproduct}
              showViewProductButton={false}
            />
          )}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedbookhouseproduct.map((bookhouseproduct, i) => (
            <div className="mb-3">
              <BookCard key={i} bookhouseproduct={bookhouseproduct} />
            </div>
          ))}
        </div>
      </div>
    </BookHouseLayout>
  );
};

export default ProductDetails;
