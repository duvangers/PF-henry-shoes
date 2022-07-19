import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ChooseSize({
  size_range,
  size,
  setSize,
  amountProduct,
  setAmountProduct,
  setStock_size,
  stock_size,
  arrStock,
}) {
  const sizes = size_range.map((o) => o.size);
  // console.log(`la talla actual es ${size}`);
  // const current_stock_size = size_range?.find((o) => o.size === size).stock;
  // console.log(`hay ${stock_size} para la talla ${size}`);

  // let arrStock = new Array(stock_size).fill(0, 0).map((e, i) => i + 1);
  const handleChangeSize = (event) => {
    event.preventDefault();
    setSize(event.target.value);
  };
  const handleChangeAmount = (event) => {
    event.preventDefault();
    setStock_size(stock_size ? stock_size : "");
    setAmountProduct(event.target.value ? event.target.value : "");
  };
  // console.log(`Quiero ${amountProduct} zapatillas de la talla ${size}`);
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 40, minHeight: 16 }}>
        <InputLabel id="demo-simple-select-disabled-label">Talla</InputLabel>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabled"
          value={size}
          label="Talla"
          onChange={(e) => handleChangeSize(e)}
        >
          {sizes.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Número</FormHelperText>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 40, minHeight: 16 }}
        //  disabled
      >
        <InputLabel id="demo-simple-select-disabled-label">Cantidad</InputLabel>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabledp"
          value={amountProduct}
          label={"Cantidad"}
          onChange={(e) => handleChangeAmount(e)}
          disabled={stock_size ? false : true}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {arrStock.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText style={{ color: stock_size ? "gray" : "red" }}>
          stock: {stock_size}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
