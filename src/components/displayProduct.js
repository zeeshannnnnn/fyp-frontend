import React, { useState, useContext } from "react";
import { Button, Grid } from "@material-ui/core";
import CheckBoxes from "./HomePageSections.js/CategoryFilters";
import { useHistory } from "react-router-dom";
import PriceFilter from "./HomePageSections.js/PriceFilter";
import Footer from "./Footer";
import { price } from "./HomePageSections.js/FiltersData";
import { CartContext } from "../contexts/CartContext";
import AlertBar from "../Alerts/AlertBar";
import axios from "axios";
const DisplayProd = () => {
  let history = useHistory();
  let count = 0;
  const { cart, dispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [PostSize, setPostSize] = useState(0);

  const [Limit, setLimit] = useState(6);
  const [filter, setFilter] = useState({
    proCategory: [],
    price: [],
  });
  const [values, setValues] = useState({
    errorMessage: "",
    successMessage: "",
    infoMessage: "",
  });
  const { errorMessage, successMessage, infoMessage } = values;
  const getProducts = (variables) => {
    axios
      .post("products/user", variables)
      .then((response) => {
        if (variables.loadMore)
          setProducts([...products, ...response.data.product]);
        else setProducts(response.data.product);

        setPostSize(response.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(variables);
  }, []);
  const loadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getProducts(variables);
    setSkip(skip);
  };
  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(variables);
    setSkip(0);
  };
  const handlePrice = (value) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key].name === value) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilter = { ...filter };
    newFilter[category] = filters;
    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilter["price"] = priceValues;
    }
    showFilteredResults(newFilter);
    setFilter(newFilter);
  };

  const addToCart = (pro) => {
    let id = pro._id;
    let title = pro.title;
    let photo = pro.photo;
    let price = pro.price;
    let quantity = 1;
    let data = { id, title, photo, price, quantity };
    console.log(data);
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
    <section className="cakes" id="cakes_section">
      {infoMessage && (
        <AlertBar type="info" message={infoMessage} autoClose={4000} />
      )}
      {errorMessage && (
        <AlertBar type="error" message={errorMessage} autoClose={4000} />
      )}
      {successMessage && (
        <AlertBar type="success" message={successMessage} autoClose={4000} />
      )}
      <div className="cakes_section_title">
        <h2>Our Products</h2>
      </div>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2}>
          <Grid container spacing={1}>
            <p style={{ paddingTop: "3rem" }}></p>
            <Grid item xs={12}>
              <CheckBoxes
                handleFilters={(filters) =>
                  handleFilters(filters, "proCategory")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <PriceFilter
                list={price}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10}>
          {products.length === 0 ? (
            <div className="text-center">No products yet...</div>
          ) : (
            <div className="cakes-center">
              {products.map((product, index) => {
                return (
                  <article className="cake" key={index}>
                    <div className="cake_img_container">
                      <img
                        src={product.photo}
                        alt="cake"
                        className="img-fluid cake-img"
                      />
                      <button
                        className="cake_bag_btn"
                        data-id="1"
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                        ></i>
                        Add to cart
                      </button>

                      <button
                        className="cake_expand_btn"
                        onClick={(e) => {
                          history.push("/home/item/itemDetail/" + product._id);
                        }}
                      >
                        <i className="fa fa-expand" aria-hidden="true"></i>
                      </button>
                    </div>

                    <h3 className="title_h">{product.title}</h3>

                    <h4>{`Rs/-${product.price}`}</h4>
                  </article>
                );
              })}
            </div>
          )}

          {PostSize >= Limit && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}
            >
              <Button variant="contained" color="secondary" onClick={loadMore}>
                Load More
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
      <Footer />
    </section>
  );
};

export default DisplayProd;
