import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function ChooseType({ type, setType, options }) {
  const handleChange = (event) => {
    setType(event.target.value);
  };
  // console.log(type);

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Elegir Gráfica
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={handleChange}
          label="Age"
        >
          {options?.map((o, i) => {
            return (
              <MenuItem key={i} value={i}>
                {o.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default ChooseType;
