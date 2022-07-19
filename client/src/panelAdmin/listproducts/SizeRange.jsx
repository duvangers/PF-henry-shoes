import React from "react";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SizeRange({ size_range }) {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <FormControl sx={{ width: "120px", padding: "2px" }} fullWidth size="small">
      <InputLabel
        id="demo-simple-select-label"
        sx={{ fontSize: "14px" }}
        size="small"
      >
        Talla
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
        sx={{ height: "26px" }}
      >
        {size_range &&
          size_range?.map((s) => (
            <MenuItem value={s.size}>
              {s.size} {"  -"} {s.stock}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default SizeRange;
