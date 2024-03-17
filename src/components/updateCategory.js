import React, { useState } from "react";
import categoryService from "../services/CategoryService";
import isEmpty from "validator/lib/isEmpty";
import AlertBar from "../Alerts/AlertBar";
const UpdateCategory = (props) => {
  const id = props.match.params.id;
  const [categories, setCategories] = useState("");
  const [photo, setPhoto] = useState("");
  const [disable, setDisable] = useState(false);
  const [values, setValues] = useState({
    errorMessage: "",
    successMessage: "",
    infoMessage: "",
  });
  const { errorMessage, successMessage, infoMessage } = values;
  React.useEffect(() => {
    categoryService.getSingleCategory(id).then((data) => {
      setCategories(data.category);
      setPhoto(data.photo);
    });
  }, []);
  const handleCategoryChange = (evt) => {
    setCategories(evt.target.value);
  };
  const categoryImage = async (e) => {
    const files = e.target.files[0];
    setDisable(true);
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
        method: "PUT",
        body: data,
      }
    );
    const file = await res.json();
    setPhoto(file.secure_url);
    setDisable(false);
  };
  const handleCategoryUpdate = (evt) => {
    evt.preventDefault();
    if (isEmpty(categories)) {
      setValues({
        ...values,
        errorMessage: "Category required",
        infoMessage: "",
      });
    } else {
      categoryService
        .updateCategory(id, { category: categories, photo })
        .then((data) => {
          setValues({
            ...values,
            errorMessage: false,
            successMessage: data.successMessage,
          });
          setCategories("");
          setPhoto("");
          // props.history.push("/admin/dashboard/DisplayCategory");
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
    <div className="container  py-5">
      <div className="card pt-7 ">
        <div className="card-header bg-info text-white p-3">
          <strong> Update Category </strong>
        </div>
        <div className="card-body">
          <form onSubmit={handleCategoryUpdate}>
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

            <label className="text-secondary">Category Title</label>
            <input
              type="text"
              className="form-control"
              value={categories}
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
            <img style={{ maxWidth: 150, height: "auto" }} src={photo} />

            <div className="card-footer text-right">
              <button
                className="btn btn-secondary mr-2"
                onClick={(e) => {
                  props.history.push("/admin/dashboard/DisplayCategory");
                }}
              >
                Close
              </button>
              <button type="submit" className="btn btn-info" disabled={disable}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateCategory;
