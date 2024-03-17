import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import orderService from "../services/OrderService";
import SingleOrder from "./SingleOrder";
const ViewOrder = () => {
  const [orders, setOrders] = useState([""]);

  const getData = () => {
    orderService
      .getItem()
      .then((data) => setOrders(data))
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(getData, []);
  return orders.length !== 0 ? (
    <div style={{ padding: "3rem" }}>
      <h2 className="text-center" style={{ padding: "0.7rem" }}>
        Orders
      </h2>
      <Grid container style={{ marginTop: "0.5rem" }}>
        {orders.map((orderItem, index) => {
          return (
            <SingleOrder key={index} orders={orderItem} onDelete={getData} />
          );
        })}
      </Grid>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <h2>No Order is placed</h2>
    </div>
  );
};
export default ViewOrder;
