import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearBuffer from "../Alerts/ProgressBar";
import categoryService from "../services/CategoryService";
import AlertBar from "../Alerts/AlertBar";
import Select from "react-select";
import {
  TextField,
  Grid,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import productService from "../services/ProductService";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
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

const UpdateProduct = (props) => {
  let classes = useStyles();
  const id = props.match.params.id;
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState("");
  const [proCategory, setproCategory] = useState("");
  const [productCat, setProductCat] = React.useState([]);
  const productsCat = [];
  const [disable, setDisable] = useState(false);
  const [values, setValues] = useState({
    errorMessage: "",
    successMessage: "",
    infoMessage: "",
    loading: false,
  });
  const { errorMessage, successMessage, loading, infoMessage } = values;

  const getOnlyCategory = () => {
    categoryService
      .getCategories()
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          productsCat.push({
            value: i,
            label: data[i].category,
          });
        }
        setProductCat(productsCat);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(getOnlyCategory, []);

  const prodImage = async (e) => {
    const files = e.target.files[0];
    setValues({
      ...values,
      infoMessage: "Wait Image is loading....",
    });
    setDisable(true);
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "Bakery-MERN STACK");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/fariha31/image/upload",
      {
        method: "PUT",
        body: data,
      }
    );
    const file = await res.json();
    setPhoto(file.secure_url);
    setValues({ ...values, infoMessage: "Image loaded..." });
    setDisable(false);
  };
  React.useEffect(() => {
    productService.getSingleProduct(id).then((data) => {
      setTitle(data.title);
      setPrice(data.price);
      setBody(data.body);
      setPhoto(data.photo);
      setproCategory(data.proCategory);
    });
  }, []);
  const UpdateProd = () => {
    if (equals(photo, "")) {
      setValues({
        ...values,
        errorMessage: "Image not selected",
        infoMessage: "",
      });
    } else if (isEmpty(title) || isEmpty(body) || isNaN(price)) {
      setValues({
        ...values,
        errorMessage: "All Fields are required",
        infoMessage: "",
      });
    } else {
      setValues({ ...values, loading: true });
      productService
        .updateProduct(id, { title, body, price, photo, proCategory })
        .then((data) => {
          setValues({
            ...values,
            errorMessage: false,
            successMessage: data.successMessage,
            loading: false,
          });
          props.history.push("/admin/dashboard/DisplayProduct");
        })
        .catch((error) => {
          setValues({
            ...values,
            loading: false,
            errorMessage: error.response.data.errorMessage,
          });
        });
    }
  };
  const UpdateProductHeader = () => (
    <Grid container style={{ marginTop: "0.5rem" }}>
      <Grid item xm={5} md={4}></Grid>
      <Grid item xm={2} md={4}>
        <h3 style={{ padding: "0.6rem" }}>Update Product</h3>
      </Grid>
      <Grid item xm={5} md={4}></Grid>
    </Grid>
  );
  const UpdatingProducts = () => (
    <div>
      <Grid container>
        <Grid item xs={1} md={4}></Grid>
        <Grid item xs={10} md={4}>
          <form style={{ paddingTop: "1rem" }}>
            <div className="form-group">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} order={{ sm: 2 }}>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    onChange={prodImage}
                    style={{ paddingTop: "0.6rem" }}
                  />
                  <Select
                    style={{ width: 220, padding: "0.4rem" }}
                    placeholder="Select Category"
                    value={productCat.find((obj) => obj.label === proCategory)}
                    className={classes.textfield}
                    options={productCat}
                    onChange={(e) => {
                      setproCategory(e.label);

                      setValues({
                        ...values,
                        errorMessage: "",
                        successMessage: "",
                        infoMessage: "",
                        loading: false,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} order={{ sm: 2 }}>
                  <img
                    style={{
                      maxWidth: 150,
                      height: "auto",
                      marginLeft: "0.4rem",
                    }}
                    src={photo}
                    alt=" "
                  />
                </Grid>
              </Grid>

              <TextField
                id="jj"
                className={classes.textfield}
                label="Title"
                value={title}
                variant="outlined"
                placeholder="Title of Product"
                fullWidth
                onChange={(e) => {
                  setTitle(e.target.value);
                  setValues({
                    ...values,
                    errorMessage: "",
                    successMessage: "",
                    infoMessage: "",
                    loading: false,
                  });
                }}
              />
              <TextField
                className={classes.textfield}
                label="Description"
                value={body}
                multiline
                placeholder="Description of Product"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setBody(e.target.value);
                  setValues({
                    ...values,
                    errorMessage: "",
                    successMessage: "",
                    infoMessage: "",
                    loading: false,
                  });
                }}
              />
              <FormControl
                variant="outlined"
                className={classes.textfield}
                fullWidth
                noValidate
              >
                <InputLabel htmlFor="outlined-adornment-price">
                  Price
                </InputLabel>
                <OutlinedInput
                  label="Price"
                  placeholder="Price of Product i.e. 100"
                  value={price}
                  variant="outlined"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">Rs/-</InputAdornment>
                  }
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setValues({
                      ...values,
                      errorMessage: "",
                      successMessage: "",
                      infoMessage: "",
                      loading: false,
                    });
                  }}
                />
              </FormControl>
              <Button
                className={classes.Submitbtn}
                variant="contained"
                color="secondary"
                fullWidth
                disabled={disable}
                onClick={UpdateProd}
              >
                Update Product
              </Button>
            </div>
          </form>
        </Grid>
        <Grid item xs={1} md={4}></Grid>
      </Grid>
    </div>
  );
  return (
    <div>
      {loading && <LinearBuffer />}
      {infoMessage && (
        <AlertBar type="info" message={infoMessage} autoClose={8000} />
      )}
      {errorMessage && (
        <AlertBar type="error" message={errorMessage} autoClose={6000} />
      )}
      {successMessage && (
        <AlertBar type="success" message={successMessage} autoClose={6000} />
      )}
      {UpdateProductHeader()}
      {UpdatingProducts()}
    </div>
  );
};

export default UpdateProduct;
