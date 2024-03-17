import React, { useState, useContext } from "react";
import productService from "../services/ProductService";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { CartContext } from "../contexts/CartContext";
import Footer from "./Footer";
import AlertBar from "../Alerts/AlertBar";
const DetailProductPage = (props) => {
  var count = 0;
  const { cart, dispatch } = useContext(CartContext);
  const [Product, setProduct] = useState([]);
  const id = props.match.params.id;
  const [values, setValues] = useState({
    errorMessage: "",
    successMessage: "",
    infoMessage: "",
  });

  const { errorMessage, successMessage, infoMessage } = values;

  console.log(cart.quantity);
  React.useEffect(() => {
    productService
      .getSingleProduct(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        setValues({
          ...values,
          errorMessage: error.response.data.errorMessage,
        });
      });
  }, []);

  const addToCart = (pro) => {
    let id = pro._id;
    let title = pro.title;
    let photo = pro.photo;
    let price = pro.price;
    let quantity = 1;
    let data = { id, title, photo, price, quantity };
    if (cart.length >= 1) {
      cart.find((item) => {
        if (item.id === data.id) {
          setValues({
            ...values,
            infoMessage: "Already added to the cart",
          });
          count = count + 1;
        }
      });
      if (count >= 1) {
      } else {
        dispatch({
          type: "ADD_ITEM",
          cart: data,
        });
        setValues({
          ...values,
          successMessage: "Added to your Cart",
        });
      }
    } else {
      dispatch({
        type: "ADD_ITEM",
        cart: data,
      });
      setValues({
        ...values,
        successMessage: "Added to your Cart",
      });
    }
  };
  return (
    <div>
      <Grid container spacing={0}>
        {infoMessage && (
          <AlertBar type="info" message={infoMessage} autoClose={4000} />
        )}
        {errorMessage && (
          <AlertBar type="error" message={errorMessage} autoClose={4000} />
        )}
        {successMessage && (
          <AlertBar type="success" message={successMessage} autoClose={4000} />
        )}
        {errorMessage ? (
          <div style={{ paddingTop: "6rem", paddingLeft: "6rem" }}>
            <h1>Error:</h1>
            <p>{errorMessage}</p>
          </div>
        ) : (
          <Grid container>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs={1} md={1}></Grid>
                <Grid item xs={10} md={10}>
                  <img
                    className="img-fluid"
                    src={Product.photo}
                    style={{
                      marginTop: "5rem",
                    }}
                  />
                </Grid>
                <Grid item xs={1} md={1}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs={2} md={1}></Grid>
                <Grid item xs={8} md={10}>
                  <div style={{ marginTop: "5.3rem" }}>
                    <h2 className="text-center">{Product.title}</h2>
                    <h5>Description</h5>
                    <p className="text-left">{Product.body}</p>

                    <h5>Price</h5>
                    <p className="text-left">{`Rs/-${Product.price}`}</p>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        addToCart(Product);
                      }}
                    >
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                      Add to cart
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={2} md={1}></Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Footer />
    </div>
  );
};

export default DetailProductPage;
