import React, { useState } from "react";
import categoryService from "../services/CategoryService";
import isEmpty from "validator/lib/isEmpty";
import AlertBar from "../Alerts/AlertBar";
const AdminDashboard = (props) => {
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [disable, setDisable] = useState(true);
  const [values, setValues] = useState({
    errorMessage: "",
    successMessage: "",
    infoMessage: "",
  });
  const { errorMessage, successMessage, infoMessage } = values;
  const handleCategoryChange = (evt) => {
    setCategory(evt.target.value);
  };
  const categoryImage = async (e) => {
    const files = e.target.files[0];
    setValues({
      ...values,
      infoMessage: "Please wait while loading Image...",
    });
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "Bakery-MERN STACK");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/fariha31/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setPhoto(file.secure_url);
    setDisable(false);
  };
  const handleCategorySubmit = (evt) => {
    evt.preventDefault();
    if (isEmpty(category)) {
      setValues({
        ...values,
        errorMessage: "Category required",
        infoMessage: "",
      });
    } else {
      categoryService
        .addCategory({ category, photo })
        .then((data) => {
          setValues({
            ...values,
            errorMessage: false,
            successMessage: data.successMessage,
          });
          setCategory("");
          setPhoto("");
        })
        .catch((error) => {
          setValues({
            ...values,
            errorMessage: error.response.data.errorMessage,
          });
        });
    }
  };
  const showHeader = () => (
    <div className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>
              <i className="fa fa-home" aria-hidden="true"></i> Dashboard
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
  const showActionAddBtns = () => (
    <div className="bg-light my-2">
      <div className="container">
        <h3>Insert Records</h3>
        <div className="row pb-3">
          <div className="col-md-4 my-1">
            <button
              className="btn btn-outline-info btn-block"
              data-toggle="modal"
              data-target="#addCategoryModal"
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add Category
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button
              className="btn btn-outline-danger btn-block"
              onClick={(e) => {
                props.history.push("/admin/dashboard/uploadProduct");
              }}
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const showActionViewBtns = () => (
    <div className="bg-light my-2">
      <div className="container">
        <h3>View Records</h3>
        <div className="row pb-3">
          <div className="col-md-4 my-1">
            <button
              className="btn btn-outline-info btn-block"
              onClick={(e) => {
                props.history.push("/admin/dashboard/DisplayCategory");
              }}
            >
              <i className="fa fa-plus" aria-hidden="true"></i> View Category
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button
              className="btn btn-outline-danger btn-block"
              onClick={(e) => {
                props.history.push("/admin/dashboard/DisplayProduct");
              }}
            >
              <i className="fa fa-plus" aria-hidden="true"></i> View Product
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button
              className="btn btn-outline-warning btn-block"
              onClick={(e) => {
                props.history.push("/admin/dashboard/viewOrder");
              }}
            >
              <i class="fa fa-money" aria-hidden="true"></i> View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const showCategoryMdl = () => (
    <div id="addCategoryModal" className="modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            {infoMessage && (
              <AlertBar type="info" message={infoMessage} autoClose={6000} />
            )}
            {errorMessage && (
              <AlertBar type="error" message={errorMessage} autoClose={6000} />
            )}
            {successMessage && (
              <AlertBar
                type="success"
                message={successMessage}
                autoClose={6000}
              />
            )}
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Add Category</h5>
              <button className="close" data-dismiss="modal">
                <span>
                  <i className="fa fa-times"></i>
                </span>
              </button>
            </div>
            <div className="modal-body my-2">
              <label className="text-secondary">Category</label>
              <input
                type="text"
                className="form-control"
                value={category}
                name="category"
                placeholder="Type Category"
                onChange={handleCategoryChange}
              />
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                onChange={categoryImage}
                style={{ paddingTop: "0.6rem", paddingBottom: "0.6rem" }}
              />
              <img
                style={{ maxWidth: 150, height: "auto" }}
                src={photo}
                alt="image"
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-info" disabled={disable}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {showHeader()}
      {showActionAddBtns()}
      {showCategoryMdl()}
      {showActionViewBtns()}
    </div>
  );
};

export default AdminDashboard;
