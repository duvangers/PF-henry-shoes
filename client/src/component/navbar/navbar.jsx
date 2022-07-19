import './navbar.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { getAllCategories, getAllBrands, getFilterCategories, getFilterBrands } from '../../redux/actions'
import { LoginButton } from '../login/login'
import { LogoutButton } from '../login/logout'

import GeneralFilter from './GeneralFilter'
import SearchBar from './SearchBar'

import logotoro from '../../logotoro.png'
import Avatar from '@mui/material/Avatar'
import { deepPurple } from '@mui/material/colors'

export default function Navbar() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllBrands())
    dispatch(getAllCategories())
  }, [dispatch])

  const categories = useSelector(state => state.Categories)
  const brands = useSelector(state => state.Brands)
  const userLog = useSelector(state => state.UserLog)
  const [nameSearch, setNameSearch] = useState('')
  const carrito = useSelector(state => state.Carrito)
  const userDetails = useSelector(state => state.UserLog)
  const navigate = useNavigate()

  const filterCategory = e => {
    navigate('/filters')
    dispatch(getFilterCategories(e))
  }

  const filterBrand = e => {
    navigate('/filters')
    dispatch(getFilterBrands(e))
  }

  const { isAuthenticated } = useAuth0()

  const avatar_url = userDetails.avatar_url && userDetails.avatar_url
  const name = userDetails.name ? userDetails.name.slice(0, 1) : ''

  return (
    <div style={{ height: '80px' }}>
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <h5 className="text-white h4">Collapsed content</h5>
          <span className="text-muted">Toggleable via the navbar brand.</span>
        </div>
      </div>
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
                <li className="nav-item">AAAAAAAAAAAAAAAAAAAAAAAAAAA</li>
              </Link>
              {!userLog.name ? (
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
                <Link className="nav-link" aria-current="page" to="/carshop">
                  {carrito.length === 0 ? (
                    <i className="fa fa-shopping-cart fa-lg " aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-shopping-cart fa-lg text-danger" aria-hidden="true">
                      {carrito.length}
                    </i>
                  )}
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  {/* <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/infoperfil"
                  >
                    Perfil
                  </Link> */}
                  <div className="items">
                    <div className="item">{userDetails.name}</div>
                    <div className="item">
                      <img src={userDetails.avatar_url} alt="" className="avatar" />
                    </div>
                  </div>{' '}
                  <li className="nav-item">
                    <LogoutButton style={{ border: '1px solid gray' }}></LogoutButton>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <LoginButton></LoginButton>
                  </li>
                </>
              )}
            </ul>

            <SearchBar dispatch={dispatch} name={nameSearch} setName={setNameSearch} navigate={navigate} />
          </div>
        </div>
      </nav>
    </div>
  )
}
