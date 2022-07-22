
import './navbar.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { getAllCategories, getAllBrands, getFilterCategories, getFilterBrands, userLogin, userLogout } from '../../redux/actions'

import GeneralFilter from './GeneralFilter'
import SearchBar from './SearchBar'

import logotoro from '../../logotoro.png'
import Avatar from '@mui/material/Avatar'
import SettingsIcon from '@mui/icons-material/Settings'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))


export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    if (user) dispatch(userLogin(user));

    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch, user]);


  const filterCategory = e => {
    navigate('/filters')
    dispatch(getFilterCategories(e))
  }

  const filterBrand = e => {
    navigate('/filters')
    dispatch(getFilterBrands(e))
  }


  const navigateRoute = (event, route) => {
    event.preventDefault();
    navigate(route);
  };

  const handleClickLogout = (event) => {
    logout();
    dispatch(userLogout());
  };

  return (

    <div style={{ height: '80px' }}>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <img src={logotoro} className="d-inline-block align-top" width="30" height="30" alt="logo" />
              <Link className="nav-link active" aria-current="page" to="/">
                <li className="nav-item">Inicio</li>
              </Link>

              {!isAuthenticated ? (

                ''

              ) : userLog.roleId === 1 ? (
                <Link className="nav-link active" aria-current="page" to="/admin">
                  <li className="nav-item">Panel Admin</li>
                </Link>
              ) : (
                <Link className="nav-link active" aria-current="page" to="/user">
                  <li className="nav-item">Panel Usuario</li>
                </Link>
              )}

              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">
                  Categories
                </div>
                <GeneralFilter categories={categories} funtionFilter={filterCategory} />
              </li>
              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">
                  Brands
                </div>
                <GeneralFilter categories={brands} funtionFilter={filterBrand} />
              </li>
              <li className="nav-item">
                <Link aria-current="page" to="/carshop">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={carrito.length} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </li>
            </ul>

            <SearchBar
              dispatch={dispatch}
              name={nameSearch}
              setName={setNameSearch}
              navigate={navigate}
            />

            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <div className="m-2">
                  <Avatar src={userDetails.avatar_url} />
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle p-1"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <SettingsIcon />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a
                        className="dropdown-item disabled"
                        href=""
                        onClick={(event) => navigateRoute(event, "/ordens")}
                      >
                        {user && user.name}
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href=""
                        onClick={(event) =>
                          navigateRoute(event, "/user/orders")
                        }
                      >
                        Ordenes
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href=""
                        onClick={(event) =>
                          navigateRoute(event, "/user/profile")
                        }
                      >
                        Cuenta
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href=""
                        onClick={(event) => handleClickLogout()}
                      >
                        Desconectar
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-primary p-1 mx-2"
                  onClick={(event) => loginWithRedirect()}
                >
                  Ingresar
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
