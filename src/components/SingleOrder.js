import React from "react";
import { withRouter } from "react-router";
import { Typography, Grid } from "@material-ui/core";
import orderService from "../services/OrderService";
const SingleOrder = (props) => {
  const { orders, onDelete } = props;
  return (
    <Grid
      item
      sm={12}
      md={4}
      style={{ paddingLeft: "2rem", paddingTop: "1rem" }}
    >
      <Typography variant="body2" color="textSecondary" component="p">
        <strong>Name:</strong> {orders.Fname} {orders.Lname}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <strong>Email:</strong> {orders.Email}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <strong>Address:</strong> {orders.Address}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <strong>Country:</strong> {orders.Country}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <strong>Ordered Products:</strong>
        {orders.productsOrdered + ", "}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <strong>Total:</strong>
        {orders.totalPrice}
      </Typography>

      <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => {
          orderService
            .deleteItem(orders._id)
            .then((data) => {
              onDelete();
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Remove
      </button>
      <hr />
    </Grid>
  );
};
export default withRouter(SingleOrder);
