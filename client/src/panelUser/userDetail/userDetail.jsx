import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { getAllOrdersUser, updateUserDetails, getLogin } from '../../redux/actions'

import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'

import './single.scss'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SavingsIcon from '@mui/icons-material/Savings'
import MailIcon from '@mui/icons-material/Mail'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import HomeIcon from '@mui/icons-material/Home'
import PublicIcon from '@mui/icons-material/Public'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

const UserDetail = () => {
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.UserLog)

  const [details, setDetails] = useState({
    avatar_url: userDetails.avatar_url || '',
    phone: userDetails.phone || '',
    adress: userDetails.adress || '',
    country: userDetails.country || '',
  })

  useEffect(() => {
    dispatch(getAllOrdersUser(userDetails.id))
  }, [dispatch, userDetails])

  const { isAuthenticated, loginWithRedirect, user } = useAuth0()

  const handleChangeDetails = event => {
    setDetails({
      ...details,
      phone: event.target.name === 'details_phone' ? event.target.value : details.phone,
      adress: event.target.name === 'details_adress' ? event.target.value : details.adress,
      country: event.target.name === 'details_coutnry' ? event.target.value : details.country,
    })
  }

  const handleUpdateDetails = event => {
    if (!isAuthenticated) return loginWithRedirect()

    dispatch(updateUserDetails(details, userDetails.id))
    dispatch(getLogin(user))
  }

  const handleChangeAvatar = async event => {
    const file = event.target.files[0]
    const parse = await file.text()

    setDetails({
      ...details,
      avatar_url: parse,
    })
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="d-flex flex-row modal-content m-2">
          <div className="d-flex flex-column w-25 m-3 align-items-center">
            <label className="h2 mb-4">{`${userDetails.name} ${userDetails.lastname}`}</label>
            <img className="w-100 rounded-circle mb-3" src={userDetails.avatar_url} alt={`${userDetails.name} ${userDetails.lastname}`} />
            <div className="d-flex m-5">
              <Button variant="contained" component="label">
                Upload
                <input hidden accept="image/*" type="file" onChange={handleChangeAvatar} />
              </Button>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleChangeAvatar} />
                <PhotoCamera />
              </IconButton>
            </div>
          </div>
          <div className="modal-content m-2">
            <label className="h4 m-3 text-start">Información del usuario:</label>
            <div className="d-flex m-2">
              <div className="modal-content w-50 p-1 mx-3">
                <div className="d-flex flex-row">
                  <MailIcon />
                  <label for="disabledTextInput" class="form-label text-start mx-1">
                    Email:
                  </label>
                </div>
                <input type="text" id="disabledTextInput" class="form-control" placeholder={userDetails.email} disabled />
              </div>
              <div className="modal-content w-25 p-1 mx-3">
                <div className="d-flex flex-row">
                  <AccountCircleIcon />
                  <label for="disabledTextInput" class="form-label text-start mx-1">
                    Usuario:
                  </label>
                </div>
                <input type="text" id="disabledTextInput" class="form-control" placeholder={userDetails.username} disabled />
              </div>
            </div>
            <div className="d-flex m-2">
              <div className="modal-content w-25 p-1 mx-3">
                <div className="d-flex flex-row">
                  <ContactPhoneIcon />
                  <label for="disabledTextInput" class="form-label text-start mx-1">
                    Celular:
                  </label>
                </div>
                <input name="details_phone" type="text" id="disabledTextInput" class="form-control" placeholder={userDetails.phone} onChange={handleChangeDetails} />
              </div>
              <div className="modal-content w-25 p-1 mx-3">
                <div className="d-flex flex-row">
                  <HomeIcon />
                  <label for="disabledTextInput" class="form-label text-start mx-1">
                    Dirección:
                  </label>
                </div>
                <input name="details_adress" type="text" id="disabledTextInput" class="form-control" placeholder={userDetails.adress} onChange={handleChangeDetails} />
              </div>
              <div className="modal-content w-25 p-1 mx-3">
                <div className="d-flex flex-row">
                  <PublicIcon />
                  <label for="disabledTextInput" class="form-label text-start mx-1">
                    País:
                  </label>
                </div>
                <input name="details_country" type="text" id="disabledTextInput" class="form-control" placeholder={userDetails.country} onChange={handleChangeDetails} />
              </div>
            </div>
            <Button size="large" variant="contained" sx={{ margin: 1 }} onClick={handleUpdateDetails}>
              Guardar cambios
            </Button>
            <label className="h4 m-3 text-start">Información de la compra:</label>
            <div className="modal-content w-auto m-2">
              <div>
                <div className="m-1">
                  <AttachMoneyIcon />
                  <label className="mx-1">Método de pago: Paypal</label>
                </div>
                <div className="m-1">
                  <LocalShippingIcon />
                  <label className="mx-1">Método de envío: Henry Courier</label>
                </div>
              </div>
              <div className="m-1">
                <SavingsIcon />
                <label className="mx-1">Descuentos: No</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  /*return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="modal-content">
          <div className="d-flex flex-column">
            <h2>Perfil</h2>
            <img className="rounded-5" src={userDetails.avatar_url} alt="img" />
            <input />
          </div>
          <div className="top">
            <h1>Mi Perfil</h1>
            <div className="link">Editar</div>
          </div>
          <div className="bottom">
            <div className="left">
              <div className="item">
                <h1 className="itemTitle">
                  {OrdersUser.name} {OrdersUser.lastname}
                </h1>
                <img src={userDetails.avatar_url} alt="img" className="itemImg" />
              </div>
            </div>
            <div className="right">
              {<Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />}
              <div className="details">
                <h1 className="title">Información Personal</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{userDetails.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Celular:</span>
                  <span className="itemValue">{userDetails.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Dirección:</span>
                  <span className="itemValue">{userDetails.adress}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">País:</span>
                  <span className="itemValue">{userDetails.country}</span>
                </div>
              </div>
              <div className="details">
                <h1 className="title">Información De Compra</h1>
                <div className="detailItem">
                  <span className="itemKey">Pago:</span>
                  <span className="itemValue">PayPal</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Entrega en:</span>
                  <span className="itemValue">{userDetails.adress}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Envío:</span>
                  <span className="itemValue">Henry Courier</span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">País:</span>
                  <span className="itemValue">USA</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ciudad:</span>
                  <span className="itemValue">Narnia</span>
                </div>}
              </div>
            </div>
          </div>
        </div>
        {<div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List/>
        </div>}
      </div>
    </div>
  )*/
}
export default UserDetail
