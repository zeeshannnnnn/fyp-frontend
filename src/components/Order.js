import React, { useState, useEffect, useContext } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { makeStyles } from "@material-ui/core/styles";
import AlertBar from "../Alerts/AlertBar";
import { useHistory } from "react-router-dom";
import orderService from "../services/OrderService";
import { TextField, Button, Grid } from "@material-ui/core";
import { CartContext } from "../contexts/CartContext";
const useStyles = makeStyles((theme) => ({
  heading: {
    fontStyle: "cursive",
    color: "secondary",
    padding: "1rem",
  },
  textfield: {
    marginTop: theme.spacing(2),
  },
  Submitbtn: {
    marginTop: "0.6rem",
  },
}));
const Order = () => {
  let classes = useStyles();
  let history = useHistory();
  const { cart } = useContext(CartContext);
  const [Email, setEmail] = React.useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Address, setAddress] = useState("");
  const [Country, setCountry] = useState("");
  const [productsOrdered, setproductsOrdered] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [values, setValues] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const { errorMessage, successMessage } = values;
  let totalPrice1 = 0;
  useEffect(() => {
    for (var i = 0; i < cart.length; i++) {
      productsOrdered[i] = cart[i].title;
      totalPrice1 = totalPrice1 + cart[i].quantity * cart[i].price;
    }
    setproductsOrdered(productsOrdered);
    console.log(productsOrdered);
    setTotalPrice(totalPrice1);
  }, []);
  const placeOrderHandler = (event) => {
    event.preventDefault();
    if (
      isEmpty(Fname) ||
      isEmpty(Lname) ||
      isEmpty(Email) ||
      isEmpty(Address) ||
      isEmpty(Country)
    ) {
      setValues({ ...values, errorMessage: "All fields are required" });
    } else if (!isEmail(Email)) {
      setValues({ ...values, errorMessage: "Invalid Email" });
    } else {
      orderService
        .addItem({
          Fname,
          Lname,
          Email,
          Address,
          Country,
          productsOrdered,
          totalPrice,
        })
        .then((data) => {
          setValues({
            ...values,
            errorMessage: false,
            successMessage: data.successMessage,
          });
          setFname("");
          setLname("");
          setEmail("");
          setAddress("");
          setCountry("");
          localStorage.removeItem("cart");
          history.push("/home/Items");
        })
        .catch((error) => {
          setValues({
            ...values,
            errorMessage: error.response.data.errorMessage,
          });
        });
    }
  };
  return (
    <div>
      {errorMessage && (
        <AlertBar type="error" message={errorMessage} autoClose={5000} />
      )}
      {successMessage && (
        <AlertBar type="success" message={successMessage} autoClose={5000} />
      )}
      <Grid container style={{ marginTop: "0.5rem" }}>
        <Grid item xm={5} md={4}></Grid>
        <Grid item xm={2} md={4}>
          <h3 style={{ padding: "0.6rem" }}>Place Order</h3>
        </Grid>
        <Grid item xm={5} md={4}></Grid>
      </Grid>
      <div>
        <Grid container>
          <Grid item xs={1} md={4}></Grid>
          <Grid item xs={10} md={4}>
            <form style={{ paddingTop: "1rem" }}>
              <div className="form-group">
                <TextField
                  className={classes.textfield}
                  label="Email"
                  value={Email}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValues({
                      ...values,
                      errorMessage: "",
                      successMessage: "",
                      infoMessage: "",
                    });
                  }}
                />
                <TextField
                  className={classes.textfield}
                  label="First Name"
                  value={Fname}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setFname(e.target.value);
                    setValues({
                      ...values,
                      errorMessage: "",
                      successMessage: "",
                      infoMessage: "",
                    });
                  }}
                />
                <TextField
                  className={classes.textfield}
                  label="Last Name"
                  value={Lname}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setLname(e.target.value);
                    setValues({
                      ...values,
                      errorMessage: "",
                      successMessage: "",
                      infoMessage: "",
                    });
                  }}
                />

                <TextField
                  className={classes.textfield}
                  label="Address"
                  value={Address}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setValues({
                      ...values,
                      errorMessage: "",
                      successMessage: "",
                      infoMessage: "",
                    });
                  }}
                />
                <TextField
                  className={classes.textfield}
                  label="Country"
                  value={Country}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setValues({
                      ...values,
                      errorMessage: "",
                      successMessage: "",
                      infoMessage: "",
                    });
                  }}
                />
                <Button
                  className={classes.Submitbtn}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </div>
            </form>
          </Grid>
          <Grid item xs={1} md={4}></Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Order;
