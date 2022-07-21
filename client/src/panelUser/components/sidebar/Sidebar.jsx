import './sidebar.scss'
import { useEffect } from 'react'
import CommentIcon from '@mui/icons-material/Comment'
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersUser, userLogout } from '../../../redux/actions'
import { useAuth0 } from '@auth0/auth0-react'

// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
// import logotoro from "../../../logotoro.png";
const Sidebar = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0()
  const dispatch = useDispatch()

  const handleClickLogout = () => {
    logout()
    dispatch(userLogout())
  }

  const userDetails = useSelector(state => state.UserLog)

  useEffect(() => {
    dispatch(getAllOrdersUser(userDetails.id))
    //dispatch(userLogin(user))
  }, [dispatch, userDetails])

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/user" style={{ textDecoration: 'none' }}>
          <span className="logo">Usuario</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTAS</p>
          <Link to="/user/orders" style={{ textDecoration: 'none' }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>

          <Link to="/user/reviews" class style={{ textDecoration: 'none' }}>
            <li>
              <CommentIcon className="icon" />
              <span>Reviews</span>
            </li>
          </Link>
          <p className="title">USUARIO</p>
          <Link to="/user/profile" style={{ textDecoration: 'none' }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Perfil</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <li onClick={event => handleClickLogout()}>
              <ExitToAppIcon className="icon" />
              <span>Salir</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
