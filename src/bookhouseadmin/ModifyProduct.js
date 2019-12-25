import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link, Redirect } from "react-router-dom";
import {
  getProduct,
  getcategories,
  updateProduct
} from "../bookhouseadmin/Bookhouseadminapi";
import { Grid, Segment, Button, Message } from "semantic-ui-react";

const ModifyProduct = ({ match }) => {
  const [values, setValues] = useState({
    bookname: "",
    bookdescription: "",
    price: "",
    bookhousecategories: [],
    bookhousecategory: "",
    deliverable: "",
    quantity: "",
    image: "",
    imageurl: "",
    loading: false,
    error: false,
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    author: ""
  });

  const { bookhouseuser, signedtoken } = isAuthenticated();
  const {
    bookname,
    bookdescription,
    price,
    bookhousecategories,
    bookhousecategory,
    deliverable,
    imageurl,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
    author
  } = values;

  const init = bookhouseproductId => {
    console.log("inside modify" + "bookhouseProductId");
    getProduct(bookhouseproductId).then(data => {
      console.log(JSON.stringify(data));
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          bookname: data.bookname,
          bookdescription: data.bookdescription,
          price: data.price,
          bookhousecategory: data.bookhousecategory._id,
          deliverable: data.deliverable,
          quantity: data.quantity,
          imageurl: data.imageurl,
          author: data.author,
          formData: new FormData()
        });
        // load categories
        initCategories();
      }
    });
  };

  // load categories and set form data
  const initCategories = () => {
    getcategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          bookhousecategories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    console.log("Match" + JSON.stringify(match.params));
    init(match.params.bookhouseproductId);
  }, []);

  const handleChange = name => event => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(
      match.params.bookhouseproductId,
      bookhouseuser._id,
      signedtoken,
      formData
    ).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          bookname: "",
          bookdescription: "",
          image: "",
          price: "",
          imageurl: "",
          quantity: "",
          loading: false,
          error: false,
          author: "",
          redirectToProfile: true,
          createdProduct: data.name
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("image")}
            type="file"
            name="image"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("bookname")}
          type="text"
          className="form-control"
          value={bookname}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("bookdescription")}
          className="form-control"
          value={bookdescription}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Image url</label>
        <textarea
          onChange={handleChange("imageurl")}
          className="form-control"
          value={imageurl}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Author</label>
        <input
          onChange={handleChange("author")}
          type="text"
          className="form-control"
          value={author}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>

        <select
          onChange={handleChange("bookhousecategory")}
          className="form-control"
        >
          <option>Please select</option>
          {bookhousecategories &&
            bookhousecategories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.categoryname}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("deliverable")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Update Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is updated!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <BookHouseLayout
      pagetitle="Add a new product"
      pagedescription={`G'day ${bookhouseuser.username}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </BookHouseLayout>
  );
};

export default ModifyProduct;
