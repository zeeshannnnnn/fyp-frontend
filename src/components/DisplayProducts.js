import React from "react";
import SingleProduct from "./SingleProduct";
import { Grid } from "@material-ui/core";
import productService from "../services/ProductService";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const DisplayProducts = (props) => {
  const [products, setProducts] = React.useState([]);
  const classes = useStyles();
  const getData = () => {
    productService
      .getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(getData, []);
  const handleNewProduct = () => {
    props.history.push("/admin/dashboard/uploadProduct");
  };
  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addBtn}
        onClick={handleNewProduct}
      >
        <AddIcon />
      </Fab>
      {products.length === 0 ? (
        <div>There are no products</div>
      ) : (
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <SingleProduct key={index} product={product} onDelete={getData} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default DisplayProducts;
