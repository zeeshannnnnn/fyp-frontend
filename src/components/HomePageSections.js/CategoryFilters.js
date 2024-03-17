import React from "react";
import categoryService from "../../services/CategoryService";
import Checkbox from "@material-ui/core/Checkbox";
const CheckBoxes = (props) => {
  const productsCat = [];
  const [checked, setChecked] = React.useState([]);
  const [productCat, setProductCat] = React.useState([]);
  const getOnlyCategory = () => {
    categoryService
      .getCategories()
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          productsCat.push({
            id: i,
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
  const handleCheck = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };
  return (
    <div style={{ paddingLeft: "1rem" }}>
      <h6>
        <strong>
          <i>Categories</i>
        </strong>
      </h6>
      <ul style={{ listStyle: "none" }}>
        {productCat.map((categ, index) => {
          return (
            <li key={index}>
              <Checkbox
                color="primary"
                size="medium"
                onChange={() => handleCheck(categ.label)}
                checked={checked.indexOf(categ.label) === -1 ? false : true}
              />
              {categ.label}
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default CheckBoxes;
