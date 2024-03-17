import React from "react";
import SingleCategory from "./SingleCategory";
import categoryService from "../services/CategoryService";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  heading: {
    textAlign: "center",
    padding: "1rem",
  },
}));

const DisplayCategory = (props) => {
  const [category, setCategory] = React.useState([]);

  const classes = useStyles();
  const getData = () => {
    categoryService
      .getCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(getData, []);

  const handleNewCategory = () => {
    props.history.push("/admin/dashboard");
  };
  return (
    <div style={{ padding: 20 }}>
      <h1 className={classes.heading}>Categories</h1>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addBtn}
        onClick={handleNewCategory}
      >
        <AddIcon />
      </Fab>
      {category.length === 0 ? (
        <p className={classes.heading}>No category exists</p>
      ) : (
        <div className="container">
          <table className="table table-light table-hover table-bordered ">
            <thead className="bg-info text-white">
              <tr>
                <th className="text-center">Title</th>
                <th className="text-center">Image</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {category.map((category, index) => (
                <SingleCategory
                  key={index}
                  category={category}
                  onDelete={getData}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplayCategory;
