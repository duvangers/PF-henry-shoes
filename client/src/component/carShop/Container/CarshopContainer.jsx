import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

import { createOrden, createOrderMP, getAllShoes } from "../../../redux/actions";

import Total from "../Total/Total";
import ProductsContainer from "../Products/Products";
import {
  deleteCarrito,
  getCarritoFromStorage,
} from "../../../redux/reducer/getLocalstorage";

import "./CarshopContainer.scss";

export default function CarShopContainer() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [metodoPago, setMetodoPago] = useState("efectivo")

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarritoFromStorage());
  }, [dispatch]);

  let carProducts = useSelector((state) => state.Carrito);
  const userDetails = useSelector((store) => store.UserLog);
  const linkMP = useSelector((store) => store.OrderMP);

  const totalProducts = carProducts
    .map((product) => product.amount)
    .reduce((prev, curr) => prev + curr, 0);
  const totalPrice = carProducts
    .map((product) => product.price * product.amount)
    .reduce((prev, curr) => prev + curr, 0);

  useEffect(() => {
    dispatch(getAllShoes());
  }, [dispatch]);

  const handleBuy = () => {
    if (!isAuthenticated) return loginWithRedirect();

    if (!carProducts.length) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tu carrito está vacío!",
        footer: '<a href="/filters">Ir a la tienda</a>',
      });
    }

    const details = carProducts.map((obj) => {
      return {
        productID: obj.id,
        size: obj.size,
        amount: obj.amount,
        priceUnit: obj.price,
        priceTotal: obj.price * obj.amount,
      };
    });

    const orden = {
      details,
      price_total: totalPrice,
      amount_total: totalProducts,
      metodopago: metodoPago
    };

    dispatch(createOrden(orden, userDetails.id));
  };

  const handlepago = function(e){
    setMetodoPago(e.target.value)
  }

  useEffect(() => {
    dispatch(createOrderMP(ordenMP))
  }, [metodoPago, carProducts])
  const ordenMP = {
    price_total: totalPrice,
    email: userDetails.email
  }

  return (
    <div className="carshop container-fluid">
      <div className="top">
        <h1>CAR SHOP</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <ProductsContainer carProducts={carProducts} />
        </div>
        <div className="right">
          <h3>METODO DE PAGO</h3>
          <ul>
            <li><input type="radio" name="metodopago" id="1" onChange={handlepago} value="meracadopago" />mercadopago</li>
            <li><input type="radio" name="metodopago" id="2" onChange={handlepago} value="efectivo"/>efectivo</li>
          </ul>
          
          
        </div>
        <div className="d-flex flex-column right">
          <Total totalProducts={totalProducts} totalPrice={totalPrice} />
          <div>
            <button
              type="button"
              className="mx-auto p-3 px-5 btn btn-danger"
              onClick={() => dispatch(deleteCarrito())}
            >
              VACIAR
            </button>
            {metodoPago === "efectivo"? <button
              type="button"
              className="mx-auto p-3 px-5 btn btn-success"
              onClick={() => handleBuy()}
            >
              GENERAR ORDEN
            </button>:
            <a href={linkMP}><button
            type="button"
            className="mx-auto p-3 px-5 btn btn-success"
          >
            IR A MERCADOPAGO
          </button></a>
            }
            
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            ></div>
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
