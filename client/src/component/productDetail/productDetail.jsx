import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getAllDetails,
  CleanStateDetail,
  addCarrito,
} from "../../redux/actions";
import Reviews from "./Comentarios/comentarios"
import Loading from "../loading/loading.jsx";
// import Footer from "../footer/footer";
import FormReview from "./FormReview";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button, Collapse, List } from "@mui/material";

import "./Reviews.scss";
export default function ProductDetail() {
  const dispatch = useDispatch(),
    { id } = useParams();
  useEffect(() => {
    dispatch(getAllDetails(id));
    dispatch(CleanStateDetail());
  }, [dispatch, id]);

  const details = useSelector((state) => state.ShoesDetails),
    userId = useSelector((state) => state.UserLog.id);
  // console.log(details);

  const [addbag, setaddbag] = useState(1),
    [heart, setheart] = useState(1),
    [talle, setTalle] = useState(""),
    [añadido, setAñadido] = useState(false),
    [userRating, setUserRating] = useState(5),
    [display, setDisplay] = useState(false);
  const handleDisplay = (e) => {
    e.preventDefault();
    setDisplay(!display);
  };
  const AddCar = () => {
    if (addbag < 10) {
      setaddbag(addbag + 1);
    }
  };
  const DecBag = () => {
    if (addbag >= 1) {
      setaddbag(addbag - 1);
    }
  };
  const Heart = () => {
    if (heart) {
      setheart(0);
    } else {
      setheart(1);
    }
  };
  let arrRating = new Array(5).fill(0, 0).map((e, i) => {
    return i < details.rating ? (e = 1) : e;
  });

  const AddCarro = (e) => {
    e.preventDefault();

    dispatch(
      addCarrito({
        ...details,
        size_range: talle,
      })
    );
    setAñadido(true);
    setTalle("");
    setTimeout(() => {
      setAñadido(false);
    }, 3000);
  };
  const onChane = (e) => {
    e.preventDefault();
    setTalle(e.target.value);
  };

  return (
    <div>
      {Object.values(details).length > 0 ? (
        <div>
          <div className="col-xxl-10 col-xl-6 col-md-9 col-sm-9 mx-auto p-4">
            <div className="card shadow p-2 p-md-4">
              <div className="card-header border-0 bg-white p-0">
                <div className="post-meta">
                  <div className="media d-flex align-items-center justify-content-between">
                    <div className="post-group">
                      <div className="label-top shadow-sm text-white">
                        {details.brand.name}
                      </div>

                      <div className="col-md-9 abc ">
                        <h1>
                          <u className="display-4">{details.name}</u>
                        </h1>
                      </div>
                      <img
                        className="avatar-sm img-fluid rounded-circle"
                        src={details.img}
                        alt={details.name}
                        // style={{ width: "400px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body py-4 px-0">
                <div className="dropdown">
                  <div
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    TALLES
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {details.size_range.length ? (
                      details.size_range.map((e, i) => {
                        return (
                          <div key={i}>
                            <button
                              className="dropdown-item"
                              id={i}
                              key={i}
                              value={e}
                              onClick={(e) => onChane(e)}
                            >
                              {e.size}
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div>j </div>
                    )}
                  </ul>
                </div>
                {talle === "" ? null : <strong>Talle: {talle}</strong>}
                {/* <li><a className="dropdown-item" href="#">genero</a></li>
            <li><a className="dropdown-item" href="#">precios</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">algo mas</a></li> */}
                <h4 className="text-secondary bg-light">
                  DETALLES DEL PRODUCTO
                </h4>
                <ul className="list-group list-group-light list-group-small">
                  <li className="list-group border-0 text-start ">
                    <strong>
                      DESCRIPCION:{" "}
                      <small className="fst-normal">{details.details}</small>
                    </strong>
                  </li>
                  <li className="list-group border-0 text-start">
                    <strong>
                      DESIGNER:{" "}
                      <small className="fst-normal">{details.designer}</small>
                    </strong>
                  </li>
                  {/* <li className="list-group border-0 text-start"><p className='fw-bold'>COLOR: <small className='fst-normal'>{details.color}</small></p></li> */}
                  <li className="list-group border-0 text-start">
                    <strong>
                      COLOR:{" "}
                      <small className="fst-normal">{details.color.name}</small>
                    </strong>
                  </li>
                  <li className="list-group border-0 text-start">
                    <strong>
                      RELEASED:{" "}
                      <small className="fst-normal">{details.released}</small>
                    </strong>
                  </li>
                  <li className="list-group border-0 text-start">
                    <strong>
                      CATEGORIE:{" "}
                      <small className="fst-normal">
                        {details.categories.map((value) => value.name).join("")}
                      </small>
                    </strong>
                  </li>
                  <li className="list-group border-0 text-start">
                    <strong>
                      GENDER:{" "}
                      <small className="fst-normal">
                        {details.gender.name}
                      </small>
                    </strong>
                  </li>
                </ul>
              </div>
              {/* </div> */}
              <div className="card-footer bg-white pb-0 px-0">
                <div className="d-flex flex-wrap flex-lg-nowrap align-items-center justify-content-between">
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
                      <h6 className="text-muted ml-1">{details.rating}/5</h6>
                    </div>
                    {/* Heart */}
                    <small className="float-end ">
                      <i
                        onClick={Heart}
                        className={`${heart ? "far" : "fa"} fa-heart`}
                      ></i>
                    </small>

                    <button
                      className="btn btn-warning bold-btn"
                      onClick={(e) => AddCarro(e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-cart"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>{" "}
                      add to cart
                    </button>
                  </div>
                  <span className="float-start badge rounded-pill bg-success">
                    {details.price}$
                  </span>
                </div>
              </div>
            </div>
            {!!añadido === false ? (
              <p> </p>
            ) : (
              <div className="alert alert-dark" role="alert">
                Se añadió el producto a carrito
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <Reviews id={id} />
      <div className="container-fluid title-reviews">
        <h1>.</h1>
        {/* <Button variant="outlined" startIcon={<ExpandLess />}>
          <p> Cancelar Reseña</p>
        </Button> */}
        {display ? (
          // <div className="option" onClick={(e) => handleDisplay(e)}>
          //   <p>Cancelar Reseña</p>
          //   <ExpandLess className="display" />
          // </div>
          <Button
            className="button"
            variant="outlined"
            onClick={(e) => handleDisplay(e)}
            startIcon={<ExpandLess className="display" />}
          >
            Cancelar Reseña
          </Button>
        ) : (
          // <div className="option" onClick={(e) => handleDisplay(e)}>
          //   <p>Añadir Reseña</p>
          //   <ExpandMore className="display" />
          // </div>
          <Button
            className="button"
            variant="outlined"
            onClick={(e) => handleDisplay(e)}
            startIcon={<ExpandMore className="display" />}
          >
            Añadir Reseña
          </Button>
        )}
      </div>
      <Collapse
        in={display}
        timeout="auto"
        sx={{ backgroundColor: "white" }}
        unmountOnExit
      >
        <List component="div" disablePadding>
          <FormReview
            userRating={userRating}
            setUserRating={setUserRating}
            userId={userId}
            productId={Number(id)}
            dispatch={dispatch}
          />
        </List>
      </Collapse>
    </div>
  );
}
