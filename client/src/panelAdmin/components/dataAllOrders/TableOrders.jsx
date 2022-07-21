import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./datatable.scss";
import "./data.scss";

import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import ChangeState from "./ChangeState";

function Row({
  ordenId,
  amount_total,
  price_total,
  state,
  createdAt,
  user,
  details,
  products,
}) {
  const stateOptions = [
    { state: "Approved", title: "En proceso" },
    { state: "Pending", title: "En camino" },
    { state: "Finished", title: "Entregada" },
    { state: "Rejected", title: "Cancelada" },
  ];
  const [open, setOpen] = useState(false);
  const [stateO, setStateO] = useState(
    stateOptions.find((e) => e.title === state).state
  );
  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {`#${ordenId}`}
        </TableCell>
        <TableCell component="th" scope="row">
          {`${user.name} ${user.lastname}`}
        </TableCell>
        <TableCell component="th" scope="row">
          <img className="cellImg" src={user.avatar_url} alt="img/" />
          {user.email}
        </TableCell>
        <TableCell>
          <>
            <FormControlLabel
              value="top"
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheck}
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                />
              }
              label={<span style={{ fontSize: "12px" }}>Editar</span>}
              labelPlacement="top"
              size="small"
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18, padding: "0px" } }}
            />
            {checked ? (
              <ChangeState
                stateO={stateO}
                setStateO={setStateO}
                stateOptions={stateOptions}
                ordenId={ordenId}
              />
            ) : (
              <span className={`${stateO}`}>
                {stateOptions.find((e) => e.state === stateO).title}
              </span>
            )}
          </>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History:{" "}
                {`${createdAt.slice(0, -14)} - ${createdAt.slice(-13, 19)}`}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Img</TableCell>
                    <TableCell align="right">Color</TableCell>
                    <TableCell align="right">Talla</TableCell>
                    <TableCell align="right">Producto (Unidad)</TableCell>
                    <TableCell align="right">Precio (Unidad)</TableCell>
                    <TableCell align="right">Pricio Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((orden) => {
                    const product = products.find(
                      (value) => value.id === orden.productID
                    );
                    return (
                      <TableRow key="historyRow.date">
                        <TableCell component="th" scope="row">
                          {product.nickname}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <img
                            className="cellImg"
                            src={product.img}
                            alt="img/shoes"
                          />
                        </TableCell>
                        <TableCell align="right">{product.colorId}</TableCell>
                        <TableCell align="right">{orden.size}</TableCell>
                        <TableCell align="right">{orden.amount}</TableCell>
                        <TableCell align="right">{`$${orden.priceUnit}`}</TableCell>
                        <TableCell align="right">{`$${orden.priceTotal}`}</TableCell>
                        <TableCell align="right"></TableCell>
                        <Link
                          to={`/productDetails/${product.id}`}
                          className="btn btn-primary m-auto px-3"
                        >
                          View
                        </Link>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function CollapsibleTable({ allOrders }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell># de Orden</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell> Estado de Compra </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders ? (
            allOrders.map((e) => (
              <Row
                ordenId={e.id}
                amount_total={e.amount_total}
                price_total={e.price_total}
                state={e.state}
                createdAt={e.createdAt}
                details={e.details}
                user={e.user}
                products={e.products}
              />
            ))
          ) : (
            <div>No tiene Usuario Disponibles</div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
