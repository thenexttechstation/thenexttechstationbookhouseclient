import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import { getBookPurchaseHistory } from "./Userapi";
import moment from "moment";
import { Button, Icon, Message, Segment, Image, Card } from "semantic-ui-react";

const BookhouseUserDashboard = () => {
  const [history, setHistory] = useState([]);
  const token = isAuthenticated().signedtoken;
  const {
    bookhouseuser: { _id, username, email, userrole }
  } = isAuthenticated();

  const init = (bookhouseuserid, token) => {
    console.log("inside init" + bookhouseuserid);
    console.log("inside token" + token);

    getBookPurchaseHistory(bookhouseuserid, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);
  const bookhouseuserlinks = () => {
    return (
      <div className="card">
        <Segment inverted>
          <Button inverted color="green" size="massive">
            Customer Links
          </Button>
        </Segment>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              <Segment inverted>
                <Button color="yellow" inverted size="massive">
                  My Cart
                </Button>
              </Segment>{" "}
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              <Segment inverted>
                <Button color="teal" inverted size="massive">
                  Update Profile
                </Button>
              </Segment>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userinfo = () => {
    return (
      <div className="card mb-5">
        <Segment inverted>
          <Button inverted color="blue" size="massive">
            Book House User Information
          </Button>
        </Segment>
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

  const purchaseHistory = () => {
    return (
      <div className="card">
        <h3 className="card-header"> Book House Purchase</h3>
        <ul className="list-group">
          <li className="list-group-item">Books</li>
        </ul>
      </div>
    );
  };
  const purchaseBookHistory = history => {
    return (
      <div className="card mb-5">
        <Segment inverted>
          <Button inverted color="green" size="massive">
            Purchase History
          </Button>
        </Segment>{" "}
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.bookhouseproducts.map((p, i) => {
                    return (
                      <div key={i}>
                        <Segment inverted>
                          <Button inverted color="blue" size="massive">
                            Order Transaction Id :{h._id}
                          </Button>
                        </Segment>
                        <Card>
                          <Card.Content header="Order Transaction" />
                          <Card.Content extra>
                            <Icon name="payment" />
                            Payment Id:{h.transaction_id}
                          </Card.Content>
                          <Card.Content extra>
                            <Icon name="money" />
                            Order Amount:{h.amount}
                          </Card.Content>
                          <Card.Content extra>
                            <Icon name="wait" />
                            Order Status:{h.status}
                          </Card.Content>
                        </Card>
                        <Segment inverted>
                          <Button inverted color="red" size="massive">
                            Product Details
                          </Button>
                        </Segment>

                        <Card>
                          <Image src={p.imageurl} wrapped ui={false} />
                          <Card.Content>
                            <Card.Header>
                              <h3>{p.bookname}</h3>
                            </Card.Header>
                            <Card.Meta>
                              <br></br>
                              <h5>
                                Purchased date: {moment(h.createdAt).fromNow()}
                              </h5>
                              <h5>Quantity : {p.count}</h5>
                            </Card.Meta>
                            <Card.Description>
                              <h5>Author:{p.author}</h5>
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <Icon name="money" />
                            <h5>Product price: Rs {p.price}</h5>
                          </Card.Content>
                        </Card>
                        {/* {JSON.stringify(p)}
                        <Image src={p.imageurl} wrapped ui={false} />
                        <h3>Product name: {p.bookname}</h3>
                        <h3>Product price: Rs {p.price}</h3>
                        <h3>Purchased date: {moment(h.createdAt).fromNow()}</h3> */}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <BookHouseLayout
      pagetitle="Book House User Dashboard"
      pagedescription={`The Book House Welcomes you,${username}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{bookhouseuserlinks()}</div>
        <div className="col-9">
          {userinfo()} {purchaseBookHistory(history)}
        </div>
      </div>
    </BookHouseLayout>
  );
};

export default BookhouseUserDashboard;
