import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { changeAmount } from "../../../redux/actions";

function SelecAmount({
  key_value,
  stock_size,
  amountP,
  setAmountP,
  arrStock,
  dispatch,
}) {
  const handleChangeAmount = (event) => {
    // console.log({ key_value, amount: event.target.value });
    event.preventDefault();
    setAmountP(event.target.value);
    dispatch(changeAmount({ key_value, amount: event.target.value }));
  };
  // console.log(stock_size);
  return (
    <>
      <FormControl
        sx={{ width: 80 }}
        //  disabled
      >
        <InputLabel id="demo-simple-select-disabled-label">Cambiar</InputLabel>
        <Select
          labelId="select-amount"
          id="demo-simple-select-disabledp"
          value={amountP}
          label={"Cantidad"}
          onChange={(e) => handleChangeAmount(e)}
          disabled={stock_size ? false : true}
          sx={{ height: 28 }}
        >
          {arrStock.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
        {/* <FormHelperText style={{ color: stock_size ? "gray" : "red" }}>
          stock: {stock_size}
        </FormHelperText> */}
      </FormControl>
    </>
  );
}

export default SelecAmount;
