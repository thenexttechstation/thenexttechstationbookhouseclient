import React, { useState } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import { addCategory } from "../bookhouseadmin/Bookhouseadminapi";
import BookHouseMenu from "../bookhousecore/BookHouseMenu";
import { Grid, Segment, Button, Message } from "semantic-ui-react";

const CreateCategory = () => {
  const [categoryname, setCategoryName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { bookhouseuser, signedtoken } = isAuthenticated();

  const handleChange = event => {
    setError("");
    setSuccess(false);
    setCategoryName(event.target.value);
  };
  const displayErrorMessage = () => {
    if (error) {
      return <h3 className="text-danger"> Category Name should be unique</h3>;
    }
  };

  const displaySuccessMessage = () => {
    if (success) {
      return <h3 className="text-success"> {categoryname} created!</h3>;
    }
  };

  const clickSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    addCategory(bookhouseuser._id, signedtoken, { categoryname }).then(data => {
      console.log("userid" + bookhouseuser._id);
      console.log("token" + signedtoken);
      console.log("category" + categoryname);

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        setError("");
      }
    });
  };

  const goAdminDashBoard = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );
  const addCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Enter Book Category</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          value={categoryname}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">
        <label>Add Category</label>
      </button>
    </form>
  );

  const addNewCategoryForm = () => (
    <div>
      <BookHouseMenu></BookHouseMenu>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment inverted color="black">
            <div>
              <Message
                icon="announcement"
                header="BOOK HOUSE CATEGORY CREATION"
                content="Create book category"
              />
            </div>

            <form class="form-horizontal" onSubmit={clickSubmit}>
              <div class="form-group">
                <h4>Category Name</h4>
                <div class="col-sm-5">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    value={categoryname}
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <Segment inverted>
                  <Button inverted color="green" size="massive">
                    Create Category
                  </Button>
                </Segment>
              </div>
            </form>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment inverted color="teal">
            <Segment inverted>
              <Button inverted color="blue" size="massive">
                {goAdminDashBoard()}
              </Button>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );

  return (
    <div>
      {displayErrorMessage()}
      {displaySuccessMessage()}
      {addNewCategoryForm()}
    </div>
  );
};

export default CreateCategory;
