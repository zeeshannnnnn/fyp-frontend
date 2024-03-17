import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
const PriceFilter = (props) => {
  const [Value, setValue] = useState("All");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleFilters(event.target.value);
  };
  return (
    <div style={{ paddingLeft: "1rem" }}>
      <h6>
        <strong>
          <i>Prices</i>
        </strong>
      </h6>
      <RadioGroup
        style={{ listStyle: "none" }}
        onChange={handleChange}
        value={Value}
      >
        {props.list &&
          props.list.map((value) => {
            return (
              <FormControlLabel
                key={value._id}
                value={value.name}
                control={
                  <Radio
                    color="primary"
                    style={{ paddingLeft: "1rem" }}
                    size="small"
                  />
                }
                label={value.name}
              />
            );
          })}
      </RadioGroup>
    </div>
  );
};
export default PriceFilter;
