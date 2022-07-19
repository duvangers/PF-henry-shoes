import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCarrito } from "../../redux/actions";
import "./Card.css";
import ReservationButton from "./Reservation";
import ChooseSize from "./ChooseSize";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { List } from "@mui/material";
export default function Card({
  id,
  name,
  // nickname,
  price,
  img,
  stock_total,
  size_range,
  rating,
  brand,
  color,
  gender,
}) {
  const dispatch = useDispatch();
  const [heart, setheart] = useState(1);
  const [reserve, setReserve] = useState(false);
  //Esto tiene que ver con el carrito
  const [display, setDisplay] = useState(false);
  const [size, setSize] = useState(size_range[0].size);
  const [stock_size, setStock_size] = useState(
    size_range[0].stock ? size_range[0].stock : ""
  );
  const [amountProduct, setAmountProduct] = useState(1);

  const current_stock_size = size_range?.find((o) => o.size === size).stock;
  let arrStock = new Array(current_stock_size).fill(0, 0).map((e, i) => i + 1);
  // console.log(nickname, stock_size);
  // console.log(
  //   `CardProduct: total: ${stock_total} producto talla ${size} stock: ${stock_size}, puede?: ${
  //     stock_total && stock_size
  //   }`
  // );
  // console.log(`amount: ${amountProduct}, stock ${stock_size} en ${size}`);

  const handleDisplay = (e) => {
    e.preventDefault();
    setDisplay(!display);
  };
  const AddCar = () => {
    dispatch(
      addCarrito({
        key_value: `${id}${size}`,
        id,
        nickname: name.split("'")[1],
        price,
        img,
        // stock: stock_size,
        rating,
        brand,
        color,
        gender,
        size,
        amount: amountProduct,
        stock_size,
      })
    );
  };
  const Heart = () => {
    if (heart) {
      setheart(0);
    } else {
      setheart(1);
    }
  };
  let arrRating = new Array(5).fill(0, 0).map((e, i) => {
    return i < rating ? (e = 1) : e;
  });

  return (
    <>
      <div
        className="container-fluid bg-trasparent my-4 p-3"
        style={{ position: "relative" }}
      >
        {/* <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3"> */}
        <div className="col hp">
          <div className="card h-100 shadow-sm">
            <Link to={`/productDetails/` + id}>
              <img src={img} className="card-img-top" alt="product.title" />
            </Link>
            <div
              className={`label-top-${
                stock_total ? "stock" : "noStock"
              } shadow-sm text-white`}
            >
              Sin Stock
            </div>

            <div className="label-top shadow-sm text-white">{brand.name}</div>

            <div className="card-body">
              <div className="clearfix mb-3">
                <span className="float-start badge rounded-pill bg-success">
                  {price}$
                </span>

                <span className="float-end">
                  <Link
                    to={`/productDetails/` + id}
                    className="small text-muted text-uppercase aff-link"
                  >
                    See Details
                  </Link>
                </span>
              </div>
              <h5 className="card-title">{name}</h5>
              <div className="gender">
                <h6>Gender:</h6>
                <span>{gender.name}</span>
              </div>
              <div className="gender">
                <h6>Talla:</h6>
                {display ? (
                  <ExpandLess
                    onClick={(e) => handleDisplay(e)}
                    className="display"
                  />
                ) : (
                  <ExpandMore
                    onClick={(e) => handleDisplay(e)}
                    className="display"
                  />
                )}
              </div>

              <Collapse in={display} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ChooseSize
                    size_range={size_range}
                    size={size}
                    setSize={setSize}
                    amountProduct={amountProduct}
                    setAmountProduct={setAmountProduct}
                    stock_size={current_stock_size}
                    setStock_size={setStock_size}
                    arrStock={arrStock}
                  />
                </List>
              </Collapse>
              <div className="d-grid gap-2 my-4">
                {stock_total && current_stock_size ? (
                  <button className="btn btn-warning bold-btn" onClick={AddCar}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    add to cart
                  </button>
                ) : (
                  <ReservationButton
                    reserve={reserve}
                    setReserve={setReserve}
                    stock_total={stock_total}
                    size={size}
                  />
                )}
              </div>

              <div className="card-end d-flex justify-content-between">
                {/* Rating */}
                <div className="d-flex flex-row user-ratings">
                  <div className="ratings">
                    {arrRating &&
                      arrRating?.map((s, i) => (
                        <i
                          key={i}
                          className={`fa ${
                            s === 1 ? "fa-star" : "fa-star grey"
                          } `}
                        ></i>
                      ))}
                  </div>
                  <h6 className="text-muted ml-1">{rating}/5</h6>
                </div>
                {/* Heart */}
                <small className="float-end ">
                  <i
                    onClick={Heart}
                    className={`${heart ? "far" : "fa"} fa-heart`}
                  ></i>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
