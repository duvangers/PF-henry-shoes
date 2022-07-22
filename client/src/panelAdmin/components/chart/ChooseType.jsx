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
      <FormControl fullWidth size="small" sx={{ width: 220 }}>
        <InputLabel id="select-label" sx={{ fontSize: "14px" }} size="small">
          Tipo
        </InputLabel>
        <Select
          labelId="label"
          id="select"
          value={type}
          onChange={handleChange}
          label="Age"
          sx={{ height: "28px" }}
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
