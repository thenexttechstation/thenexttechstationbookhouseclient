import React from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";

const AdministratorDashboard = () => {
  const {
    bookhouseuser: { _id, username, email, userrole }
  } = isAuthenticated();

  const bookhouseadminlinks = () => {
    return (
      <div className="card">
        <h3 className="card-header">Admin Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/category/create">
              <Segment inverted>
                <Button color="yellow" inverted size="massive">
                  Create Category
                </Button>
              </Segment>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/product/create">
              <Segment inverted>
                <Button color="red" inverted size="massive">
                  Create Books
                </Button>
              </Segment>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              <Segment inverted>
                <Button color="green" inverted size="massive">
                  View Orders
                </Button>
              </Segment>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/manageproducts">
              <Segment inverted>
                <Button color="olive" inverted size="massive">
                  Manage Products
                </Button>
              </Segment>{" "}
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const admininfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Book House User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <h3>User Name: {username}</h3>
          </li>
          <li className="list-group-item">
            <h3>Email: {email}</h3>
          </li>
          <li className="list-group-item">
            <h3>Role : {userrole === 1 ? "Admin" : "Customer"}</h3>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <BookHouseLayout
      pagetitle="Book House Admin Dashboard"
      pagedescription={`The Book House Welcomes you,${username}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{bookhouseadminlinks()}</div>
        <div className="col-9">{admininfo()}</div>
      </div>
    </BookHouseLayout>
  );
};

export default AdministratorDashboard;
