import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProductCarrito } from "../../../redux/actions";
import { Link } from "react-router-dom";
import FormAmount from "./FormAmount";

import "./CardShop.scss";
import SelecAmount from "./SelecAmount";

export default function CardShop({
  size,
  key_value,
  id,
  nickname,
  price,
  img,
  stock_size,
  rating,
  brand,
  color,
  gender,
  amount,
}) {
  let arrRating = new Array(5).fill(0, 0).map((e, i) => {
    return i < rating ? (e = 1) : e;
  });

  const [heart, setheart] = useState(1);
  const [amountP, setAmountP] = useState(amount);
  let arrStock = new Array(stock_size).fill(0, 0).map((e, i) => i + 1);
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteProductCarrito(key_value));
  }
  const Heart = () => {
    if (heart) {
      setheart(0);
    } else {
      setheart(1);
    }
  };

  return (
    <>
      <div className="cardShop">
        <div className="image">
          <Link to={`/productDetails/` + id}>
            <img src={img} alt={nickname} />
          </Link>
          <div className="ratings">
            {arrRating &&
              arrRating?.map((s, i) => (
                <i
                  key={i}
                  className={`fa ${s === 1 ? "fa-star" : "fa-star grey"} `}
                ></i>
              ))}
          </div>
        </div>
        <div className="d1">
          <div className="title">
            {/* <Link to={`/productDetails/` + id}> */}
            <h5>{nickname}</h5>
            {/* </Link> */}
          </div>
          <div className="detailItem">
            <div className="itemKey">Talla:</div>
            <div className="itemValue">{size}</div>
          </div>
          <div className="detailItem">
            <div className="itemKey">Cantidad:</div>
            <div className="itemValue">
              {/* <FormAmount
              amountP={amount}
              key_value={key_value}
              dispatch={dispatch}
            /> */}
              <SelecAmount
                key_value={key_value}
                amountP={amountP}
                stock_size={stock_size}
                setAmountP={setAmountP}
                arrStock={arrStock}
                dispatch={dispatch}
              />
            </div>
          </div>

          <div className="actions">
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={() => handleDelete()}
            >
              <label onClick={() => handleDelete()}>Eliminar</label>
            </i>

            <i onClick={Heart} className={`${heart ? "far" : "fa"} fa-heart`}>
              <label>Favoritos</label>
            </i>
          </div>
        </div>
        <div className="d1">
          <div className="detailItem">
            <div className="itemKey">Color:</div>
            <div className="itemValue">{color.name}</div>
          </div>
          <div className="detailItem">
            <div className="itemKey">Genero:</div>
            <div className="itemValue">{gender.name}</div>
          </div>
          <div className="detailItem">
            <div className="itemKey">Marca:</div>
            <div className="itemValue">{brand.name}</div>
          </div>
        </div>
        <div className="prices">
          <div className="block">
            <div className="name">Precio Unitario:</div>

            <div className="value">$./{price}</div>
          </div>
          <hr />
          <div className="block">
            <div className="name">Precio:</div>

            <div className="total-value">$./{price * amountP}</div>
          </div>
        </div>
      </div>
      <hr style={{ margin: "0", height: "1px", color: "black" }} />
    </>
  );
}
