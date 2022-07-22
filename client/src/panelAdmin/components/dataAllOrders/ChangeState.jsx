import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateOrden } from "../../../redux/actions";

function ChangeState({ stateO, setStateO, stateOptions, ordenId }) {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setStateO(event.target.value);
    let t = stateOptions.find((e) => e.state === event.target.value).title;
    console.log(t);
    dispatch(updateOrden({ state: t }, ordenId));
  };
  return (
    <FormControl
      sx={{ width: "140px", padding: "1px", margin: "0px" }}
      fullWidth
      size="small"
    >
      <InputLabel id="change-state" sx={{ fontSize: "14px" }} size="small">
        Cambiar Estado
      </InputLabel>
      <Select
        labelId="change-state-label"
        id="change-state"
        value={stateO}
        onChange={(e) => handleChange(e)}
        sx={{ height: "34px" }}
      >
        {stateOptions?.map((o) => {
          return (
            <MenuItem key={o.state} value={o.state}>
              <span className={`${o.state}`}>{o.title}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default ChangeState;
