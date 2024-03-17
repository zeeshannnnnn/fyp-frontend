import React from "react";
import categoryService from "../services/CategoryService";
import { withRouter } from "react-router";
const SingleCategory = (props) => {
  const { category, onDelete, history } = props;
  return (
    <tr>
      <td className="text-center">{category.category}</td>
      <td className="text-center">
        <img
          style={{ maxWidth: "80px", height: "auto" }}
          src={category.photo}
          alt="image"
        />
      </td>
      <td className="text-center">
        <button
          className="btn btn-warning badge-pill mx-2 p-2 text-white"
          style={{ maxWidth: "80px" }}
          onClick={(e) => {
            history.push("/admin/dashboard/updateCategory/" + category._id);
          }}
        >
          <i class="fa fa-pencil" aria-hidden="true"></i> Edit
        </button>
        <button
          className="btn btn-danger badge-pill p-2"
          style={{ maxWidth: "80px" }}
          onClick={(e) => {
            categoryService
              .deleteCategory(category._id)
              .then((data) => {
                onDelete();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <i class="fa fa-trash" aria-hidden="true"></i> Delete
        </button>
      </td>
    </tr>
  );
};

export default withRouter(SingleCategory);
