import Swal from "sweetalert2";
import { Toast } from "../../component/alerts";
import { GET_PRODUCTS_FROM_STORAGE, DELETE_CARRITO } from "../action-types";

// Obtener el estado del localstorage
export const getCarritoFromStorage = () => {
  return (dispatch) => {
    var local = JSON.parse(localStorage.getItem("username"));
    //   Si no existe lo crea con un array vacío
    if (!local) {
      localStorage.setItem("username", JSON.stringify({ carrito: [] }));
      local = JSON.parse(localStorage.getItem("username"));
    }
    return dispatch({
      type: GET_PRODUCTS_FROM_STORAGE,
      payload: local.carrito,
    });
  };
};
export const deleteCarrito = () => {
  return (dispatch) => {
    var local = JSON.parse(localStorage.getItem("username"));
    //   Si no existe lo crea con un array vacío
    if (!local.carrito.length) {
      Swal.fire({
        title: "Su carrito está vacío",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Vaciar Carrito?",
        text: "Se eliminarán todos los productos del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar carrito",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("username", JSON.stringify({ carrito: [] }));
          local = JSON.parse(localStorage.getItem("username"));
          console.log("en promesa", local.carrito);
          Swal.fire(
            "Operación Exitosa",
            "Su carrito se vació exitosamente",
            "success"
          );
        }
        return dispatch({
          type: DELETE_CARRITO,
          payload: local.carrito,
        });
      });
    }
    local = JSON.parse(localStorage.getItem("username"));
    return dispatch({
      type: DELETE_CARRITO,
      payload: local.carrito,
    });
  };
};

export const addToLocalStorage = (payload) => {
  var local = JSON.parse(localStorage.getItem("username"));
  //   Si no existe lo crea con un array vacío
  if (!local) {
    localStorage.setItem("username", JSON.stringify({ carrito: [] }));
    local = JSON.parse(localStorage.getItem("username"));
  }
  let existProduct = local.carrito?.filter(
    (p) => p.key_value === `${payload.id}${payload.size}`
  );

  if (!existProduct.length) {
    local.carrito.push(payload);
    var carritoJson = JSON.stringify(local); // serialise as string

    localStorage.setItem("username", carritoJson); // save string
    Toast.fire({
      icon: "success",
      title: "Producto añadido exitosamente",
    });
  } else {
    Toast.fire({
      icon: "warning",
      title: "El producto ya ha sido añadido",
    });
  }
  return local.carrito;
};
export const deleteFromLocalStorage = (payload) => {
  var local = JSON.parse(localStorage.getItem("username")); //Objeto
  //   console.log("Local Carrito:", local.carrito);
  local.carrito = local.carrito?.filter((p) => p.key_value !== payload);
  var carritoJson = JSON.stringify(local); // serialise as string
  localStorage.setItem("username", carritoJson); // save string
  return local.carrito;
};
export const changeAmountFromLocalStorage = (payload) => {
  var local = JSON.parse(localStorage.getItem("username")); //Objeto
  //   console.log("Local Carrito:", local.carrito);
  local.carrito = local.carrito?.map((p) => {
    if (p.key_value === payload.key_value) p.amount = payload.amount;
    return p;
  });
  var carritoJson = JSON.stringify(local); // serialise as string
  localStorage.setItem("username", carritoJson); // save string
  return local.carrito;
};

//  <li
//                 className="nav-item"
//                 onClick={() => {
//                   localStorage.removeItem("username");
//                   console.log(
//                     "eliminado: ",
//                     JSON.parse(localStorage.getItem("username"))
//                   );
//                 }}
//               >
//                 <div className="nav-item">Borrar Storage-User</div>
//               </li>
//               <li
//                 className="nav-item"
//                 onClick={() =>
//                   console.log(JSON.parse(localStorage.getItem("username")))
//                 }
//               >
//                 <div className="nav-item">Mostrar Storage-User</div>
//               </li>
