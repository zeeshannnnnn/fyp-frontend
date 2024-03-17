import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
const CartDetails = (props) => {
  const { dispatch } = useContext(CartContext);
  const { cartItem } = props;
  let history = useHistory();
  const [qty, setQty] = useState(cartItem.quantity);

  const incQty = (id) => {
    var basket = JSON.parse(localStorage.getItem("cart"));
    basket.find((item) => {
      if (item.id == id) {
        item.quantity = item.quantity + 1;
        setQty(item.quantity);
        history.push("/Cart/Items");
      }
    });
    localStorage.setItem("cart", JSON.stringify(basket));
  };

  const decQty = (id) => {
    var basket = JSON.parse(localStorage.getItem("cart"));
    basket.find((item) => {
      if (item.id == id) {
        if (item.quantity === 1) dispatch({ type: "DELETE_ITEM", id: item.id });
        else {
          item.quantity = item.quantity - 1;
          setQty(item.quantity);
          localStorage.setItem("cart", JSON.stringify(basket));
          history.push("/Cart/Items");
        }
      }
    });
  };

  return (
    <Grid item>
      <Grid container>
        <Grid
          item
          md={3}
          style={{ paddingTop: "0.3rem", paddingBottom: "0.3rem" }}
        >
          <img className="img-fluid" src={cartItem.photo} />
        </Grid>
        <Grid item md={9} style={{ paddingLeft: "2rem", paddingTop: "1rem" }}>
          <h3>{cartItem.title}</h3>
          <h6>Price: {cartItem.price}</h6>
          <div>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => decQty(cartItem.id)}
            >
              <RemoveIcon />
            </IconButton>
            <span>{qty}</span>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => incQty(cartItem.id)}
            >
              <AddIcon />
            </IconButton>
          </div>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => dispatch({ type: "DELETE_ITEM", id: cartItem.id })}
          >
            Remove
          </button>
        </Grid>
      </Grid>
      <hr />
    </Grid>
  );
};
export default CartDetails;
