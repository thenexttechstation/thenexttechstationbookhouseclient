import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { isAuthenticated } from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import {
  listOrders,
  getOrderStatusValues,
  updateOrderStatus
} from "./Bookhouseadminapi";
import moment from "moment";
import { Button, Segment, Card, Image, Icon } from "semantic-ui-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [imagebookname, setImageBookName] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { bookhouseuser, signedtoken } = isAuthenticated();

  const loadOrders = () => {
    listOrders(bookhouseuser._id, signedtoken).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  const loadOrderStatusValues = () => {
    getOrderStatusValues(bookhouseuser._id, signedtoken).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };
  useEffect(() => {
    loadOrders();
    loadOrderStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div>
      <Segment color="teal" inverted>
        <div>
          <div>
            <h4>{key}</h4>
          </div>
        </div>
        <input type="text" value={value} className="form-control" readOnly />
      </Segment>
    </div>
  );

  const showOrderStatus = o => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={e => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(
      bookhouseuser._id,
      signedtoken,
      orderId,
      e.target.value
    ).then(data => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const setimageurl = p => {
    console.log("Bookname" + p.bookname);
    setImageBookName(p.bookname);
  };
  return (
    <BookHouseLayout
      pagetitle="Orders"
      pagedescription={`G'day ${bookhouseuser.username}, you can manage all the orders here`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}

          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <Segment inverted>
                  <Button color="yellow" inverted size="massive">
                    Order ID: {o._id}
                  </Button>
                </Segment>
                {/* <h2 className="mb-5">
                  <span className="bg-primary">Order ID: {o._id}</span>
                </h2> */}

                <ul className="list-group mb-2">
                  <li className="list-group-item"> {showOrderStatus(o)}</li>
                  <li className="list-group-item">
                    <h3>Transaction ID: {o.transaction_id}</h3>
                  </li>
                  <li className="list-group-item">
                    <h3>Amount: Rs{o.amount}</h3>
                  </li>
                  <li className="list-group-item">
                    <h3>Ordered by: {bookhouseuser.username}</h3>
                  </li>
                  <li className="list-group-item">
                    <h3>Email: {bookhouseuser.email}</h3>
                  </li>
                  <li className="list-group-item">
                    <h3>Ordered on: {moment(o.createdAt).fromNow()}</h3>
                  </li>
                  <li className="list-group-item">
                    <h3>Delivery address: {o.address}</h3>
                  </li>
                </ul>
                <Segment>
                  <h3 className="mt-4 mb-4 font-italic">
                    Total products in the order: {o.bookhouseproducts.length}
                  </h3>
                  {o.bookhouseproducts.map((p, pIndex) => (
                    <div
                      className="mb-4"
                      key={pIndex}
                      style={{
                        padding: "20px",
                        border: "1px solid indigo"
                      }}
                    >
                      <Card>
                        hh{p.bookname}
                        <Image src={p.imageurl} wrapped ui={false} />
                        <Card.Content>
                          <Card.Header>{p.bookname}</Card.Header>
                          <Card.Meta>
                            <span className="date">Rs:{p.price}</span>
                          </Card.Meta>
                          <Card.Description>{p._id}</Card.Description>
                        </Card.Content>
                        <Card.Content extra></Card.Content>
                      </Card>
                      {showInput("Product name", p.bookname)}
                      {showInput("Product price", p.price)}
                      {showInput("Product total", p.count)}
                      {showInput("Product Id", p._id)}
                    </div>
                  ))}
                </Segment>
              </div>
            );
          })}
        </div>
      </div>
    </BookHouseLayout>
  );
};

export default Orders;
